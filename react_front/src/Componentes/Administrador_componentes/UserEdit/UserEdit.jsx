import { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import './UserEdit.css';

const UserEdit = ({ isOpen, onClose, usuarioId, onUsuarioActualizado }) => {
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [idArea, setIdArea] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [idRol, setIdRol] = useState("3");
  const [extensionTelefono, setExtensionTelefono] = useState("");

  const [areas, setAreas] = useState([]);
  const [camposInvalidos, setCamposInvalidos] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    const cargarDatosIniciales = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

        const resAreas = await axios.get(`${apiUrl}/areas`);
        const listaAreas = resAreas.data.data ? resAreas.data.data : resAreas.data;
        setAreas(Array.isArray(listaAreas) ? listaAreas : []);

        if (usuarioId) {
          const resUsuario = await axios.get(`${apiUrl}/usuarios/${usuarioId}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const u = resUsuario.data.usuario || resUsuario.data;
          setNombre(u.nombre_completo || "");
          setPuesto(u.puesto || "");
          setIdArea(u.id_area || "");
          setCorreo(u.correo_electronico || "");
          setContrasena("");
          setIdRol(String(u.id_rol || "3"));
          setExtensionTelefono(u.extension_telefono || "");
        }
      } catch (error) {
        console.error("Error al cargar los datos de edición:", error);
      }
    };

    cargarDatosIniciales();
    setCamposInvalidos({});
    setContrasena("");
    setMostrarContrasena(false);
  }, [isOpen, usuarioId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errores = {
      nombre: !nombre.trim(),
      puesto: !puesto.trim(),
      idArea: !idArea,
      correo: !correo.trim(),
      idRol: !idRol
    };

    setCamposInvalidos(errores);

    if (Object.values(errores).some(Boolean)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Los datos en rojo están incompletos',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

      const datosActualizados = {
        nombre_completo: nombre.trim(),
        puesto: puesto.trim(),
        id_area: parseInt(idArea),
        correo_electronico: correo.trim(),
        id_rol: parseInt(idRol),
        extension_telefono: extensionTelefono.trim() || null,
      };

      if (contrasena && contrasena.trim() !== "") {
        datosActualizados.contrasena_hash = contrasena.trim();
      }

      await axios.put(`${apiUrl}/usuarios/${usuarioId}`, datosActualizados, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Usuario actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
      });

      if (onUsuarioActualizado) onUsuarioActualizado();
      onClose();
    } catch (error) {
      console.error("Error al actualizar usuario:", error.response?.data || error.message);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || "No se pudo actualizar el usuario.",
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  const estiloError = (esInvalido) => ({
    border: esInvalido ? "2px solid #d9534f" : undefined
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="section-title-superior">Editar Usuario</div>

        <form onSubmit={handleSubmit}>
          <div className="section-title">Datos Personales</div>
          <div className="tarjeta-cuerpo-formulario">
            <div className="form-row">
              <label>Nombre:</label>
              <input
                type="text"
                placeholder="Ej. Andres Roblez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={estiloError(camposInvalidos.nombre)}
              />
            </div>
            <div className="form-row">
              <label>Puesto:</label>
              <input
                type="text"
                placeholder="Ej. Desarrollador"
                value={puesto}
                onChange={(e) => setPuesto(e.target.value)}
                style={estiloError(camposInvalidos.puesto)}
              />
            </div>
            <div className="form-row">
              <label>Area:</label>
              <select
                value={idArea}
                onChange={(e) => setIdArea(e.target.value)}
                style={{ ...estiloError(camposInvalidos.idArea), color: idArea ? "#fff" : "#757575", backgroundColor: "#1f1f1f" }}
              >
                <option value="" disabled hidden style={{ color: "#757575", backgroundColor: "#1f1f1f" }}>
                  Selecciona un Área
                </option>
                {Array.isArray(areas) && areas.map((area) => (
                  <option key={area.id_area || area.id} value={area.id_area || area.id} style={{ color: "#fff", backgroundColor: "#1f1f1f" }}>
                    {area.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>Correo:</label>
              <input
                type="email"
                placeholder="Ejemplo@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                style={estiloError(camposInvalidos.correo)}
              />
            </div>

            <div className="form-row">
              <label>Contraseña:</label>
              <div style={{ position: "relative", width: "68%" }}>
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  placeholder="********"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  style={{ width: "100%", paddingRight: "40px"}}
                />
                <span
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  {mostrarContrasena ? <FaEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>

            <div className="form-row">
              <label>Rol:</label>
              <select
                value={idRol}
                onChange={(e) => setIdRol(e.target.value)}
                style={{ ...estiloError(camposInvalidos.idRol), color: "#fff", backgroundColor: "#1f1f1f" }}
              >
                <option value="3" style={{ color: "#fff", backgroundColor: "#1f1f1f" }}>Empleado</option>
                <option value="1" style={{ color: "#fff", backgroundColor: "#1f1f1f" }}>Administrador</option>
                <option value="2" style={{ color: "#fff", backgroundColor: "#1f1f1f" }}>Tecnico</option>
              </select>
            </div>
          </div>

          <div className="section-title">Datos del Empleado Opcionales</div>
          <div className="tarjeta-cuerpo-formulario">
            <div className="form-row">
              <label>Num.ext:</label>
              <input
                type="text"
                placeholder="951 673 52 12"
                value={extensionTelefono}
                onChange={(e) => setExtensionTelefono(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Foto de perfil:<button type="button" className="btn-editar-form"><IoCloudUploadOutline /> Subir</button></label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}><ImCancelCircle /> Cancelar</button>
            <button type="submit" className="btn-registrar"> <IoCheckmark /> Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
