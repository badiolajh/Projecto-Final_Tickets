import { FaEye } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Tick_Pendiente from "../Ver-ticket-pendiente/Ver-pendiente";

function Incidencias_Frame() {
    const [tickets, setTickets] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
    const [busqueda, setBusqueda] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("Todos");

    // Estados para el modal y el ticket seleccionado
    const [verPendiente, setVerPendiente] = useState(false);
    const [ticketSeleccionado, setTicketSeleccionado] = useState(null);

    // Lista de técnicos para asignar
    const [tecnicos, setTecnicos] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const paginaActual = parseInt(searchParams.get("page")) || 1;

    const obtenerTickets = useCallback(async () => {
        try {
            setCargando(true);
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

            const response = await axios.get(`${apiUrl}/tickets`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = response.data;
            setTickets(data.data || data);
        } catch (error) {
            console.error("Hubo un error al cargar los tickets:", error.response?.data || error.message);
        } finally {
            setCargando(false);
        }
    }, []);

    const obtenerTecnicos = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

            const res = await axios.get(`${apiUrl}/usuarios`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const listaUsuarios = res.data.data || res.data.usuario || res.data;
            const listaTecnicos = Array.isArray(listaUsuarios)
                ? listaUsuarios.filter(u => u.rol?.nombre_rol === 'Técnico')
                : [];

            setTecnicos(listaTecnicos);
        } catch (error) {
            console.error("Error al cargar técnicos:", error);
        }
    }, []);

    useEffect(() => {
        obtenerTickets();
        obtenerTecnicos();
    }, [obtenerTickets, obtenerTecnicos]);

    const ticketsFiltrados = tickets.filter((t) => {
        const nombreEmpleado = t.empleado?.nombre_completo || "Desconocido";
        const tipoTicket = t.categoria?.nombre_tipo || t.tipo || "General";

        const coincideBusqueda =
            nombreEmpleado.toLowerCase().includes(busqueda.toLowerCase()) ||
            String(tipoTicket).toLowerCase().includes(busqueda.toLowerCase());

        const coincideTipo =
            filtroTipo === "Todos" || String(tipoTicket).toLowerCase() === filtroTipo.toLowerCase();

        return coincideBusqueda && coincideTipo;
    });

    const totalPaginas = Math.ceil(ticketsFiltrados.length / registrosPorPagina) || 1;

    const cambiarPagina = (nuevaPagina) => {
        setSearchParams({ page: nuevaPagina });
    };

    const indiceUltimo = paginaActual * registrosPorPagina;
    const indicePrimero = indiceUltimo - registrosPorPagina;
    const ticketsPagina = ticketsFiltrados.slice(indicePrimero, indiceUltimo);

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "N/A";
        return fechaStr.split("T")[0].split(" ")[0];
    };

    const handleAsignarTecnico = async (ticket, nuevoTecnicoId) => {
        if (!nuevoTecnicoId) return;

        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

        try {
            await axios.post(
                `${apiUrl}/tickets/${ticket.id_ticket}/asignar`,
                { tecnico_id: Number(nuevoTecnicoId) },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Recargar lista
            obtenerTickets();
        } catch (error) {
            console.error("Error al asignar técnico:", error.response?.data || error.message);
        }
    };

    return (
        <div className="contenedor-Opciones">
            <h1 className="tickets-pendientes">Estos son tus tickets pendientes!</h1>

            <div className="barra-controles-admin">
                <label className="Buscar-admin">
                    Buscar
                    <input
                        type="text"
                        placeholder="Escribe aquí..."
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            cambiarPagina(1);
                        }}
                    />

                    <select
                        className="select-estado"
                        value={filtroTipo}
                        onChange={(e) => {
                            setFiltroTipo(e.target.value);
                            cambiarPagina(1);
                        }}
                    >
                        <option value="Todos">Todos</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Redes">Redes</option>
                    </select>
                </label>
            </div>

            <div className="tarjeta-cabecera">
                <table className="Tabla-Header">
                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th className="acciones">Acciones</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="tarjeta-cuerpo">
                <table className="Tabla-Datos">
                    <tbody>
                        {cargando ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>Cargando tickets...</td>
                            </tr>
                        ) : ticketsPagina.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>No se encontraron tickets.</td>
                            </tr>
                        ) : (
                            ticketsPagina.map((t) => (
                                <tr key={t.id_ticket || t.id}>
                                    <td>{t.empleado?.nombre_completo || "Desconocido"}</td>
                                    <td>{t.categoria?.nombre_tipo || t.tipo || "General"}</td>
                                    <td className="columna-admin">{formatearFecha(t.fecha_creacion || t.created_at)}</td>
                                    <td className="acciones-boton">
                                        <button
                                            className="btn-ver-incid"
                                            onClick={() => {
                                                setTicketSeleccionado(t);
                                                setVerPendiente(true);
                                            }}
                                        >
                                            <FaEye /> Ver
                                        </button>


                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="pie-tabla">
                    <div className="tabla-paginas">
                        <button
                            disabled={paginaActual === 1}
                            onClick={() => cambiarPagina(paginaActual - 1)}
                        >&lt;</button>

                        <span> Pág {paginaActual} de {totalPaginas} </span>

                        <button
                            disabled={paginaActual === totalPaginas}
                            onClick={() => cambiarPagina(paginaActual + 1)}
                        >&gt;</button>
                    </div>

                    <label>Mostrar:
                        <select
                            value={registrosPorPagina}
                            onChange={(e) => {
                                setRegistrosPorPagina(Number(e.target.value));
                                cambiarPagina(1);
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={7}>7</option>
                            <option value={10}>10</option>
                        </select> Registros
                    </label>
                </div>
            </div>

            <Tick_Pendiente
                isOpen={verPendiente}
                onClose={() => {
                    setVerPendiente(false);
                    setTicketSeleccionado(null);
                }}
                ticket={ticketSeleccionado}
                onActualizado={obtenerTickets}
            />
        </div>
    );
}

export default Incidencias_Frame;
