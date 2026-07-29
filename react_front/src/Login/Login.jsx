import { useState } from "react";
import "./Login.css";



const Login = ({ alIniciarSesion, alIrARegistro }) => {
  // 1. Creamos un estado local para guardar lo que el usuario escribe en el input
  const [correo, setCorreo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 2. Pasamos el valor actual del input a la función que viene de App.jsx
    alIniciarSesion(correo);
  };

  return (
    <div className="contenedor-principal">
      <div className="tarjeta-formulario">
        <h2 className="titulo-formulario">Inicia sesion</h2>

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="grupo-input">
            <input
              type="text" // Cambiado a 'text' para que te permita escribir "tecnico" sin restricciones de formato email si gustas
              placeholder="username@gmail.com o tecnico"
              className="campo-texto"
              value={correo} // 3. Asociamos el valor al estado
              onChange={(e) => setCorreo(e.target.value)} // 4. Actualizamos el estado al escribir
            />
          </div>

          <div className="grupo-input">
            <input
              type="password"
              placeholder="contraseña"
              className="campo-texto"
            />
          </div>

          <div className="contenedor-enlace">
            <a href="#recuperar" className="enlace-secundario">
              Olvidaste la contraseña?
            </a>
          </div>

          <div className="contenedor_boton">
            {/* Quitamos el onClick de aquí para dejar que el onSubmit del formulario controle la acción */}
            <button type="submit" className="boton-enviar">
              Sign in
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
