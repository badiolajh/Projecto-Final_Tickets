import { IoCheckmark } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";
import './UserEdit.css';

const UserEdit = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <div className="section-title-superior">Editar Usuario</div>

        <div className="section-title">Datos Personales</div>
        <div className='tarjeta-cuerpo-formulario'>
          <div className="form-row"><label>Nombre:</label> <input type="text" placeholder="Ej. Andres Roblez" /></div>
          <div className="form-row"><label>Puesto:</label> <input type="text" placeholder="Ej. Andres2047" /></div>
          <div className="form-row"><label>Area:</label> <input type="text" placeholder="Ejemplo@gmail.com" /></div>
          <div className="form-row"><label>Correo:</label> <input type="email" placeholder="Ejemplo@gmail.com" /></div>
          <div className="form-row"><label>Contraseña:</label> <input type="password" /></div>
          <div className="form-row"><label>Rol:</label>
            <select>
              <option value="admin">Empleado</option>
              <option value="user">Administrador</option>
              <option value="admin">Tecnico</option>
              </select>
            </div>
        </div>

        <div className="section-title">Datos del Empleado Opcionales</div>
        <div className='tarjeta-cuerpo-formulario'>
        <div className="form-row"><label>Num.ext:</label> <input type="text" placeholder="951 673 52 12" /></div>
          <div className='form-row'><label>Foto de perfil:<button className="btn-editar-form"><IoCloudUploadOutline /> Subir</button></label></div>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}><ImCancelCircle /> Descartar Cambios</button>
          <button className="btn-registrar"  onClick={onClose}> <IoCheckmark /> Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
