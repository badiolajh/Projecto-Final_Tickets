import { IoCheckmark } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";
import './UserModal.css';

const UserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="section-title-superior">Registro de Usuario</div>

        <div className="section-title">Datos Personales</div>
        <div className='tarjeta-cuerpo-formulario'>
          <div className="form-row"><label>Nombre:</label> <input type="text" placeholder="Ej. Andres Roblez" /></div>
          <div className="form-row"><label>Usuario:</label> <input type="text" placeholder="Ej. Andres2047" /></div>
          <div className="form-row"><label>Correo:</label> <input type="email" placeholder="Ejemplo@gmail.com" /></div>
          <div className="form-row"><label>Contraseña:</label> <input type="password" /></div>
          <div className="form-row"><label>Rol:</label>
              <select>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
              </select>
            </div>
        </div>

        <div className="section-title">Datos Opcionales</div>
        <div className='tarjeta-cuerpo-formulario'>
        <div className="form-row"><label>Teléfono:</label> <input type="text" placeholder="951 673 52 12" /></div>
          <div className="form-row"><label>Dirección:</label> <input type="text" placeholder="Av. Reforma 222B" /></div>
          <div className='form-row'><label>Foto de perfil:<button className="btn-editar-form"><IoCloudUploadOutline /> Subir</button></label></div>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}><ImCancelCircle /> Descartar Cambios</button>
          <button className="btn-registrar"  onClick={onClose}> <IoCheckmark /> Registrar</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
