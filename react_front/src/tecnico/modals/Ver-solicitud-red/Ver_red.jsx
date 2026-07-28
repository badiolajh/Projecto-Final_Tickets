import { IoCheckmark } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "./Ver_red.css";

const Solicitud_Red = ({ isOpen, onClose}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <div className="section-title-superior">Solicitud de red</div>

        <div className="section-title">Datos Personales</div>
        <div className='tarjeta-cuerpo-formulario'>
          <div className="form-row"><label>Nombre:</label> <input type="text" placeholder="Jose Andres Santiago" /></div>
          <div className="form-row"><label>Correo:</label> <input type="email" placeholder="Santi123@gmail.com" /></div>
          <div className="form-row"><label>Area:</label> <input type="text" placeholder="Recursos Humanos" /></div>
          <div className="form-row"><label>Puesto:</label> <input type="text" placeholder="Jefe de departamento" /></div>
          <div className="form-row"><label>Num.ext:</label> <input type="text" placeholder="0342" /></div>
          <div className="form-row"><label>MAC:</label> <input type="text" placeholder="00:1A:2B:3C:4D:5E" /></div>
          <div className="form-row"><label>Num inventario:</label></div>
          <div className="form-row-num-inv"><input type="text" placeholder="2781809101" /></div>

        </div>


        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}><IoClose /> Cerrar</button>
          <button className="btn-registrar"  onClick={onClose}> <IoCheckmark /> Solicitar</button>
        </div>
      </div>
    </div>
  );
};

export default Solicitud_Red;
