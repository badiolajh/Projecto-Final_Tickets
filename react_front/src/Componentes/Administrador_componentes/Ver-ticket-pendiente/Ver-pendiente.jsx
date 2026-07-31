import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import "./Ver-pendiente.css";

const Tick_Pendiente = ({ isOpen, onClose, ticket, onActualizado }) => {
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (isOpen && ticket) {
      setTecnicoSeleccionado(ticket.tecnico_id || ticket.tecnico?.id_usuario || "");

      const obtenerTecnicos = async () => {
        try {
          const token = localStorage.getItem("token");
          const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

          const response = await axios.get(`${apiUrl}/usuarios`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // 🔍 Flexibilidad en la estructura de respuesta
          const listaUsuarios = response.data?.usuarios || response.data?.data || response.data || [];

          // 🔍 Depuración temporal (puedes quitarlo después)
          console.log("Usuarios recibidos:", listaUsuarios);
          if (listaUsuarios.length > 0) {
            console.log("Estructura del primer usuario:", JSON.stringify(listaUsuarios[0], null, 2));
          }

          // ✅ FILTRO ROBUSTO
          const soloTecnicos = listaUsuarios.filter(u => {
            // Manejar rol como objeto o como ID directo
            const rol = u.rol || u.rol_id || u.id_rol;
            const rolId = typeof rol === 'object' ? rol?.id : rol;
            const rolNombre = typeof rol === 'object' ? (rol?.nombre_rol || rol?.nombre || rol?.name || '') : '';

            // Verificar por ID (2 = Técnico)
            if (rolId === 2 || rolId === '2') return true;

            // Verificar por nombre del rol
            const nombreNormalizado = rolNombre.toString().toLowerCase().trim();
            if (nombreNormalizado === 'técnico' || nombreNormalizado === 'tecnico') return true;

            return false;
          });

          console.log("Técnicos filtrados:", soloTecnicos);
          setTecnicos(soloTecnicos);

        } catch (error) {
          console.error("Error al cargar técnicos:", error);
        }
      };

      obtenerTecnicos();
    }
  }, [isOpen, ticket]);

  if (!isOpen || !ticket) return null;

  const empleado = ticket.empleado || {};

  const handleGuardarAsignacion = async () => {
      if (!tecnicoSeleccionado) {
        Swal.fire({
          icon: 'warning',
          title: 'Selección vacía',
          text: 'Por favor selecciona un técnico.'
        });
        return;
      }

      try {
        setGuardando(true);
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
        const ticketId = ticket.id_ticket || ticket.id;

        await axios.put(`${apiUrl}/tickets/${ticketId}`, {
          tecnico_id: tecnicoSeleccionado,
          estado_id: 2
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Técnico asignado correctamente',
          showConfirmButton: false,
          timer: 2000
        });

        if (onActualizado) onActualizado();
        onClose();
      } catch (error) {
        // ⬇️ REEMPLAZA TU CATCH ACTUAL CON ESTO ⬇️
        console.error("Error al asignar técnico:", error.response?.data);
        Swal.fire({
          icon: 'error',
          title: 'Error 422',
          text: error.response?.data?.message || 'No se pudo asignar el técnico.'
        });
      } finally {
        setGuardando(false);
      }
    };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="section-title-superior">
          Ticket de <span>{empleado.nombre_completo || "Invitad@"}</span>
        </div>

        <div className="section-title">Descripción</div>
        <div className='tarjeta-cuerpo-formulario'>
          <div className="form-row">
            <label>Área:</label>
            <input type="text" value={empleado.area || "No especificada"} disabled />
          </div>
          <div className="form-row">
            <label>Puesto:</label>
            <input type="text" value={empleado.puesto || "No especificado"} disabled />
          </div>
          <div className="form-row">
            <label>Num. ext:</label>
            <input type="text" value={empleado.extension || "N/A"} disabled />
          </div>

          <div className="form-row"><label>Detalle:</label></div>
          <div className="form-row-columna">
            <textarea
              disabled
              rows="4"
              value={ticket.descripcion_empleado || ""}
            />
          </div>
        </div>

        <div className="modal-actions-etiqueta" style={{ width: '100%' }}>
          <div className="form-row">
            <label className="etiqueta-asignar" >Asignar a técnico:</label>
          </div>
        </div>

        <div className="modal-actions" >

            <div className="asignar-container" style={{ width: '100%'}}>
              <select
                className="select-asignar"
                value={tecnicoSeleccionado}
                onChange={(e) => setTecnicoSeleccionado(e.target.value)}
                disabled={guardando}
              >
                <option value="">Seleccione un técnico</option>
                {tecnicos.map((tec) => (
                  <option key={tec.id_usuario || tec.id} value={tec.id_usuario || tec.id}>
                    {tec.nombre_completo || tec.name}
                  </option>
                ))}
              </select>

          </div>

        </div>

        <div className="modal-actions" style={{ marginTop: '15px', justifyContent: 'flex-end' }}>
          <button className="btn-cancel" onClick={onClose} disabled={guardando}>
            <IoClose /> Cancelar
          </button>
          <button
            className="btn-guardar"
            onClick={handleGuardarAsignacion}
            disabled={guardando}
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            {guardando ? 'Guardando...' : 'Guardar Asignación'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tick_Pendiente;
