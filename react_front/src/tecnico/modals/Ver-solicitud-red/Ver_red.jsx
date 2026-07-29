import { IoCheckmark, IoClose } from "react-icons/io5";
import "./Ver_red.css";

const Solicitud_Red = ({ isOpen, onClose, mode = "nuevo", info }) => {
  if (!isOpen) return null;

  const isViewMode = mode === "ver";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="section-title-superior">Solicitud de red</div>

        <div className="section-title">Datos Personales</div>
        <div className="tarjeta-cuerpo-formulario">
          <div className="form-row">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Jose Andres Santiago"
              defaultValue={info?.nombre}
              disabled={isViewMode}
            />
          </div>
          <div className="form-row">
            <label>Correo:</label>
            <input
              type="email"
              placeholder="Santi123@gmail.com"
              defaultValue={info?.correo}
              disabled={isViewMode}
            />
          </div>
          <div className="form-row">
            <label>Area:</label>
            <input
              type="text"
              placeholder="Recursos Humanos"
              defaultValue={info?.area}
              disabled={isViewMode}
            />
          </div>
          <div className="form-row">
            <label>Puesto:</label>
            <input
              type="text"
              placeholder="Jefe de departamento"
              defaultValue={info?.puesto}
              disabled={isViewMode}
            />
          </div>
          <div className="form-row">
            <label>Num.ext:</label>
            <input
              type="text"
              placeholder="0342"
              defaultValue={info?.extension}
              disabled={isViewMode}
            />
          </div>
          <div className="form-row">
            <label>MAC:</label>
            <input
              type="text"
              placeholder="00:1A:2B:3C:4D:5E"
              defaultValue={info?.mac}
              disabled={isViewMode}
            />
          </div>
          <div className="form-row">
            <label>Num inventario:</label>
          </div>
          <div className="form-row-num-inv">
            <input
              type="text"
              placeholder="2781809101"
              defaultValue={info?.inventario}
              disabled={isViewMode}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            <IoClose /> Cerrar
          </button>
          {!isViewMode && (
            <button className="btn-registrar" onClick={onClose}>
              <IoCheckmark /> Solicitar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Solicitud_Red;
