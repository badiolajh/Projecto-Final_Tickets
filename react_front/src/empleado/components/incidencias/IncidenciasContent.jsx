import React, { useState, useEffect, useCallback } from 'react';
import TablaGeneral from '../tables/TablaGeneral';
import SearchBar from '../common/SearchBar';
import FilterEstado from '../common/FilterEstado';
import ActionButton from '../common/ActionButton';
import Tick_Solicitud from './TicketSolicitud/Tick_Solicitud';
import api from '../../../api/axios';
import Swal from 'sweetalert2';
import styles from './IncidenciasContent.module.css';

const IncidenciasContent = ({ acciones }) => {
    const [search, setSearch] = useState('');
    const [estado, setEstado] = useState('todos');
    const [tickets, setTickets] = useState([]);
    const [estadosTicket, setEstadosTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estados para el formulario del modal
    const [formValido, setFormValido] = useState(false);
    const [formData, setFormData] = useState({ tipo: 'Hardware', descripcion: '' });
    const [tiposTicketApi, setTiposTicketApi] = useState([]);
    const [guardando, setGuardando] = useState(false);

    // Obtener el ID del usuario logueado de forma segura para la carga inicial de tickets
    const usuarioLogueadoInicial = JSON.parse(localStorage.getItem('usuario'));
    const empleadoIdInicial = usuarioLogueadoInicial?.id_usuario || usuarioLogueadoInicial?.id;

    const cargarDatos = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            // Cargamos tickets, estados y tipos de ticket en paralelo desde Laravel
            const [resTickets, resEstados, resTipos] = await Promise.all([
                api.get('/tickets', { headers }),
                api.get('/estados-ticket', { headers }),
                api.get('/tipos-ticket', { headers })
            ]);

            const todosLosTickets = resTickets.data.data || resTickets.data;
            const listaEstados = resEstados.data.data || resEstados.data;
            const listaTipos = resTipos.data.tipos_ticket || resTipos.data.data || resTipos.data;

            // Filtramos únicamente los tickets creados por el empleado autenticado
            const ticketsDelEmpleado = Array.isArray(todosLosTickets)
                ? todosLosTickets.filter(t => Number(t.empleado_id) === Number(empleadoIdInicial))
                : [];

            setTickets(ticketsDelEmpleado);
            setEstadosTicket(Array.isArray(listaEstados) ? listaEstados : []);
            setTiposTicketApi(Array.isArray(listaTipos) ? listaTipos : []);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            setLoading(false);
        }
    }, [empleadoIdInicial]);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    // Crear un diccionario de ID de estado a Nombre
    const mapaEstados = {};
    estadosTicket.forEach(est => {
        mapaEstados[est.id] = est.nombre;
    });

    // Filtrar por búsqueda (descripción o tipo) y por estado seleccionado
    const ticketsFiltrados = tickets.filter(ticket => {
        const coincideBusqueda =
            ticket.descripcion_empleado?.toLowerCase().includes(search.toLowerCase()) ||
            ticket.nombre_tipo?.toLowerCase().includes(search.toLowerCase());

        const coincideEstado = estado === 'todos' || String(ticket.estado_id) === String(estado);

        return coincideBusqueda && coincideEstado;
    });

    const encabezados = ['Técnico', 'Tipo', 'Estado', 'Fecha', 'Acciones'];

    // Mapeamos los tickets filtrados al formato de filas que espera la tabla
    const filas = ticketsFiltrados.map(ticket => {
        const nombreTecnico = ticket.tecnico && ticket.tecnico.nombre_completo
            ? ticket.tecnico.nombre_completo
            : 'En espera..';

        const tipoTicket = ticket.nombre_tipo || 'General';
        const nombreEstado = mapaEstados[ticket.estado_id] || 'Desconocido';

        let fechaFormateada = 'N/A';
        if (ticket.fecha_creacion) {
            const fechaObj = new Date(ticket.fecha_creacion);
            if (!isNaN(fechaObj)) {
                fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                });
            } else {
                fechaFormateada = ticket.fecha_creacion.split(' ')[0];
            }
        }

        return [
            nombreTecnico,
            tipoTicket,
            nombreEstado,
            fechaFormateada,
            ticket.id_ticket
        ];
    });

    // Función para manejar el guardado con confirmación SweetAlert2 y asegurando el empleado_id
    const handleGuardarTicket = async () => {
        if (!formValido || guardando) return;

        setGuardando(true); // Bloquea el envío inmediatamente

        const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
        const empleadoIdActual = usuarioActual?.id_usuario || usuarioActual?.id;

        if (!empleadoIdActual) {
            Swal.fire({
                icon: 'error',
                title: 'Sesión no válida',
                text: 'No se encontró el ID del empleado en el localStorage.'
            });
            setGuardando(false);
            return;
        }

        const resultadoAlerta = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez creado el ticket, no se podrá modificar.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, crear ticket',
            cancelButtonText: 'Cancelar'
        });

        if (!resultadoAlerta.isConfirmed) {
            setGuardando(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const tipoEncontrado = tiposTicketApi.find(
                t => t.nombre_tipo.toLowerCase() === formData.tipo.toLowerCase()
            );
            const categoriaId = tipoEncontrado ? tipoEncontrado.id_tipo : (tiposTicketApi[0]?.id_tipo || 1);

            const nuevoTicket = {
                descripcion_empleado: formData.descripcion.trim(),
                prioridad: 'Media',
                empleado_id: Number(empleadoIdActual),
                tecnico_id: null,
                categoria_id: Number(categoriaId),
                estado_id: 1 // Pendiente
            };

            await api.post('/tickets', nuevoTicket, {
                headers: { Authorization: `Bearer ${token}` }
            });

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Ticket creado exitosamente',
                showConfirmButton: false,
                timer: 2000
            });

            setIsModalOpen(false);
            cargarDatos();
        } catch (error) {
            console.error("Error al registrar ticket:", error.response?.data || error.message);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response?.data?.message || 'Error al crear el ticket',
                showConfirmButton: false,
                timer: 3000
            });
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className={styles.incidencias}>
            <h2 className={styles.title}>Estos son tus tickets activos!</h2>

            <div className={styles.controls}>
                <div className={styles.controlsLeft}>
                    <SearchBar onChange={setSearch} />
                    <FilterEstado value={estado} onChange={setEstado} />
                </div>
                <ActionButton
                    tipo="nuevo"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}>Cargando tickets...</p>
            ) : (
                <TablaGeneral
                    encabezados={encabezados}
                    filas={filas}
                    acciones={acciones}
                />
            )}

            {/* Modal integrado de Solicitud de Ticket */}
            <Tick_Solicitud
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onValidChange={(isValid, data) => {
                    setFormValido(isValid);
                    setFormData(data);
                }}
                onSubmit={handleGuardarTicket}
            />
        </div>
    );
};

export default IncidenciasContent;
