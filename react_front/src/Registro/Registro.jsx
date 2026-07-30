import { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

import "./Registro.css";

const Registro = ({ alVolverAlLogin }) => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [puesto, setPuesto] = useState("");
  const [idArea, setIdArea] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [extensionTelefono, setExtensionTelefono] = useState("");

  // Estados para mostrar contraseña
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // Estado para guardar las áreas que vienen de la base de datos/seeder
  const [areas, setAreas] = useState([]);

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Cargar las áreas desde la API al montar el componente usando Axios
  useEffect(() => {
    const obtenerAreas = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/areas`);

        console.log("Datos recibidos de /areas:", response.data);

        const json = response.data;
        const listado = json.data ? json.data : json;
        setAreas(Array.isArray(listado) ? listado : []);
      } catch (err) {
        console.error("No se pudieron cargar las áreas", err);
      }
    };

    obtenerAreas();
  }, []);

  // Función para manejar el envío del registro con Axios
  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    const correoTrim = correo.trim();

    // Validaciones básicas
    if (!nombreCompleto.trim()) {
      setError("Por favor, ingresa tu nombre completo.");
      setCargando(false);
      return;
    }
    if (!puesto.trim()) {
      setError("Por favor, ingresa tu puesto.");
      setCargando(false);
      return;
    }
    if (!idArea) {
      setError("Por favor, selecciona un área.");
      setCargando(false);
      return;
    }
    if (!correoTrim) {
      setError("Por favor, ingresa tu correo electrónico.");
      setCargando(false);
      return;
    }
    const formatoCorreoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreoRegex.test(correoTrim)) {
      setError("Debes ingresar un correo electrónico válido.");
      setCargando(false);
      return;
    }
    if (!contrasena) {
      setError("La contraseña está vacía.");
      setCargando(false);
      return;
    }
    if (contrasena.length < 8) {
      setError("La contraseña debe ser de mínimo 8 caracteres.");
      setCargando(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      // Petición POST usando Axios
      await axios.post(`${API_URL}/register`, {
        nombre_completo: nombreCompleto.trim(),
        puesto: puesto.trim(),
        correo_electronico: correoTrim,
        contrasena_hash: contrasena,
        extension_telefono: extensionTelefono.trim() || null,
        foto_url: "default_photo_id",
        id_rol: 3, // Por defecto Rol Empleado, ya que el administrador debe asignar un rol al usuario
        id_area: parseInt(idArea),
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });

      // Después del registro exitoso, regresamos al login
      alVolverAlLogin();

    } catch (err) {
      // Manejo inteligente de errores con Axios
      if (err.response) {
        setError(err.response.data.message || "Ocurrió un error al registrarse.");
      } else {
        setError(err.message || "Ocurrió un error al registrarse.");
      }
    } finally {
      setCargando(false);
    }
  };

  // Función para manejar el botón de "Regresar"
  const manejarRegresar = (e) => {
    e.preventDefault();
    alVolverAlLogin();
  };

  return (
    <div className="contenedor-principal-registro">
      <div className="tarjeta-formulario">
        <h2 className="titulo-formulario">Registro de Usuario</h2>

        {error && (<p style={{ color: "#d9534f", textAlign: "center", fontSize: "18px", marginBottom: "18px", marginTop: "18px" }}>{error}</p>)}

        <form className="formulario" onSubmit={manejarRegistro}>
          <div className="grupo-input">
            <input
              type="text"
              placeholder="Nombre Completo"
              className="campo-texto"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          </div>
          <div className="grupo-input">
            <input
              type="text"
              placeholder="Puesto"
              className="campo-texto"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
            />
          </div>

          {/* Selector desplegable de área, según la bd */}
          <div className="grupo-input">
            <select
              className="campo-texto"
              value={idArea}
              onChange={(e) => setIdArea(e.target.value)}
              style={{ color: idArea ? "#fff" : "#757575", backgroundColor: "#1f1f1f" }}
            >
              <option value="" disabled hidden style={{ color: "#757575", backgroundColor: "#1f1f1f" }}>
                Selecciona un Área
              </option>
              {Array.isArray(areas) && areas.map((area) => (
                <option
                  key={area.id}
                  value={area.id}
                  style={{ color: "#fff", backgroundColor: "#1f1f1f" }}
                >
                  {area.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="grupo-input">
            <input
              type="email"
              placeholder="Correo Electronico"
              className="campo-texto"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="grupo-input" style={{ position: "relative" }}>
            <input
              type={mostrarContrasena ? "text" : "password"}
              placeholder="Contraseña"
              className="campo-texto"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <span onClick={() => setMostrarContrasena(!mostrarContrasena)}
            style={{position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#666", fontSize: "18px", display: "flex", alignItems: "center"}}>
              {mostrarContrasena ? <FaEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <div className="grupo-input">
            <input
              type="text"
              placeholder="Extención de telefono (Opcional)"
              className="campo-texto"
              value={extensionTelefono}
              onChange={(e) => setExtensionTelefono(e.target.value)}
            />
          </div>

          <div className="contenedor-enlace">
            <label className="Foto">
              Foto (opcional):
            </label>
            <button type="button" className="btn-editar-foto"><IoCloudUploadOutline /> Subir</button>
          </div>

          <div className="modal-btnregistro">
            <button className="btn-cancel" type="button"
              onClick={manejarRegresar}
              disabled={cargando}
            ><IoIosArrowRoundBack /> Regresar</button>

            <button className="btn-registrar" type="submit" disabled={cargando}
            ><IoCheckmark /> {cargando ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
