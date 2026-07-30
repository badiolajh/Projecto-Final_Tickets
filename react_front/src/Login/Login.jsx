import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = ({ alIniciarSesion, alIrARegistro }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    //Mensajes de validacion
    const correoTrim = correo.trim();
    if (!correoTrim) {
      setError("El correo esta vacio.");
      setCargando(false);
      return;
    }
    const formatoCorreoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreoRegex.test(correoTrim)) {
      setError("Debes ingresar un correo valido");
      setCargando(false);
      return;
    }
    if (!contrasena) {
      setError("La contraseña esta vacia.");
      setCargando(false);
      return;
    }
    if (contrasena.length < 8) {
      setError("La contraseña debe ser minimo de 8 caracteres.");
      setCargando(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          correo_electronico: correoTrim,
          contrasena_hash: contrasena,
        }),
      });

      const data = await response.json();

      // Si la API falla, transformamos el mensaje técnico a uno amigable
      if (!response.ok) {
        // Laravel suele mandar los errores de validación en data.errors o data.message
        if (response.status === 422 || response.status === 401) {
          throw new Error("El correo electrónico o la contraseña son incorrectos.");
        }
        throw new Error(data.message || "Fallo en el sistema, intentalo mas tarde");
      }

      localStorage.setItem("token", data.token);

      //Evaluamos el rol recibido desde App.jsx
      const resultadoRol = alIniciarSesion(data.usuario);

      if (resultadoRol && !resultadoRol.success) {
        throw new Error(resultadoRol.message);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="tarjeta-formulario">
        <h2 className="titulo-formulario">Inicia sesion</h2>

        <p>Prueba de subido</p>

        {error && <p style={{ color: "#d9534f", textAlign: "center",fontSize: "22px", marginBottom: "18px", marginTop:"18px"}}>{error}</p>}

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="grupo-input">
            <input
              type="text"
              placeholder="username@gmail.com"
              className="campo-texto"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

          </div>

          <div className="grupo-input" style={{ position: "relative" }}>
            <input
              type={mostrarContrasena ? "text" : "password"}
              placeholder="contraseña"
              className="campo-texto"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}style={{ paddingRight: "40px" }}
            />
            <span
            onClick={() => setMostrarContrasena(!mostrarContrasena)}
            style={{position: "absolute",right: "15px",top: "50%",transform: "translateY(-50%)",cursor: "pointer",color: "#666",fontSize: "18px",display: "flex",
              alignItems: "center"
            }}
          >
            {mostrarContrasena ? <FaEye /> : <FaRegEyeSlash />}
          </span>
          </div>


          <div className="contenedor-enlace">
            <a href="#recuperar" className="enlace-secundario">
              Olvidaste la contraseña?
            </a>
          </div>

          <div className="contenedor_boton">
            <button type="submit" className="boton-enviar">
              {cargando ? "Cargando..." : "Sign in"}
            </button>
          </div>

          <div className="texto-pie">
            Aun no tienes cuenta?{" "}
            <span
              onClick={alIrARegistro}
              className="enlace-verde"
              style={{ cursor: "pointer" }}
            >
              Registrate
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
