import "./Login.css";

const Login = ({ alIniciarSesion, alIrARegistro }) => {
  const manejarSubmit = (e) => {
    e.preventDefault();

    // Simulación: aquí decides qué rol probar
    const fakeUser = {
      nombre: "Jonathan",
      correo: "jonathan@correo.com",
      rol: "tecnico", // Cambia a "admin" o "empleado" para probar
    };

    alIniciarSesion(fakeUser);
  };

  return (
    <div className="contenedor-principal">
      <div className="tarjeta-formulario">
        <h2 className="titulo-formulario">Inicia sesión</h2>

        <form className="formulario" onSubmit={manejarSubmit}>
          <div className="grupo-input">
            <input
              type="email"
              placeholder="username@gmail.com"
              className="campo-texto"
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
              ¿Olvidaste la contraseña?
            </a>
          </div>

          <div className="contenedor_boton">
            <button type="submit" className="boton-enviar">
              Sign in
            </button>
          </div>

          <div className="texto-pie">
            ¿Aún no tienes cuenta?{" "}
            <span
              onClick={alIrARegistro}
              className="enlace-verde"
              style={{ cursor: "pointer" }}
            >
              Regístrate
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
