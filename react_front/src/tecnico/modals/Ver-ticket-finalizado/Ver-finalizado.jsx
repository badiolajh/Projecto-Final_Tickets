import { IoClose } from "react-icons/io5";
import "./Ver-finalizado.css";

const Tick_Finalizado = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="section-title-superior">
          Ticket de <span>{user?.empleado?.nombre_completo || "Invitad@"}</span>
        </div>

        <div className="section-title">Descripción</div>
        <div className="tarjeta-cuerpo-formulario">
          <div className="form-row">
            <label>Área:</label>
            <input
              type="text"
              value={user?.empleado?.area || "No especificada"}
              disabled
            />
          </div>
          <div className="form-row">
            <label>Puesto:</label>
            <input
              type="text"
              value={user?.empleado?.puesto || "No especificado"}
              disabled
            />
          </div>
          <div className="form-row">
            <label>Num.ext:</label>
            <input
              type="text"
              value={user?.empleado?.extension || "N/A"}
              disabled
            />
          </div>

          <div className="form-row"><label>Detalle:</label></div>
          <div className="form-row-columna">
            <textarea
              disabled
              rows="4"
              value={user?.descripcion_empleado || ""}
            />
          </div>
        </div>

        <div className="modal-actions-finalizado">
          <label className="etiqueta-asignar">Asignado a:</label>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            <IoClose /> Cerrar
          </button>
          <div className="asignar-container">
            <input
              type="text"
              className="input-asignado"
              value={user?.tecnico?.nombre_completo || "Sin técnico"}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tick_Finalizado;
