import { IoClose } from "react-icons/io5";
import "./Ver-finalizado.css";

const Tick_Finalizado = ({ isOpen, onClose , user}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="section-title-superior">Ticket de <span>{user ? user.username : "Invitad@"}</span></div>

        <div className="section-title">Descripción</div>
        <div className='tarjeta-cuerpo-formulario'>
          <div className="form-row"><label>Area:</label> <input type="text" placeholder="Recursos Humanos" disabled/></div>
          <div className="form-row"><label>Puesto:</label> <input type="text" placeholder="Jefe de departamento" disabled/></div>
          <div className="form-row"><label>Num.ext:</label> <input type="text" placeholder="0325" disabled/></div>

          <div className="form-row"><label>Detalle:</label></div>
          <div className="form-row-columna">
                      <textarea
                      disabled
                        rows="4"
                        value="Cuento con fallas en mi computadora, es urgente!!!!!"
                      />
                    </div>
        </div>

        <div className="modal-actions-finalizado">
          <label className="etiqueta-asignar">Asignado a:</label>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}><IoClose /> Cerrar</button>
          <div className="asignar-container">
            <input
            type="text"
              className="input-asignado"
              value="Tecnico"
              disabled
            />
          </div>
        </div>
      </div>
    </div>


  );
};

export default Tick_Finalizado;
