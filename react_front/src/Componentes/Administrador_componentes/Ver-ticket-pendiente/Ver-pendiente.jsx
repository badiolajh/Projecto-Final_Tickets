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
    if (isOpen) {
      // Si el ticket ya tiene un técnico asignado, lo cargamos por defecto
      setTecnicoSeleccionado(ticket?.tecnico_id || "");

      // Opcional: Cargar lista de técnicos desde la API si manejas roles
      const obtenerTecnicos = async () => {
        try {
          const token = localStorage.getItem("token");
          const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

          const response = await axios.get(`${apiUrl}/usuarios`, { // Ajusta la ruta según tu endpoint de usuarios/técnicos
            headers: { Authorization: `Bearer ${token}` }
          });

          const listaUsuarios = response.data.data || response.data;
          // Filtramos solo los que sean técnicos (puedes adaptar esta condición según tu BD)
          const soloTecnicos = Array.isArray(listaUsuarios)
            ? listaUsuarios.filter(u => u.rol === 'tecnico' || u.rol_id === 2)
            : listaUsuarios;

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

  const handleAsignar = async (e) => {
    const nuevoTecnicoId = e.target.value;
    setTecnicoSeleccionado(nuevoTecnicoId);

    if (!nuevoTecnicoId) return;

    try {
      setGuardando(true);
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
      const ticketId = ticket.id_ticket || ticket.id;

      // Petición a Laravel para actualizar el técnico asignado y cambiar estado a En Proceso (ej. estado_id: 2)
      await axios.put(`${apiUrl}/tickets/${ticketId}`, {
        tecnico_id: nuevoTecnicoId,
        estado_id: 2 // O el ID correspondiente a "En proceso"
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
      console.error("Error al asignar técnico:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo asignar el técnico al ticket.'
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

        <div className="modal-actions-etiqueta">
          <label className="etiqueta-asignar">Asignar a técnico:</label>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}><IoClose /> Cerrar</button>
          <div className="asignar-container">
            <select
              className="select-asignar"
              value={tecnicoSeleccionado}
              onChange={handleAsignar}
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
      </div>
    </div>
  );
};

export default Tick_Pendiente;
