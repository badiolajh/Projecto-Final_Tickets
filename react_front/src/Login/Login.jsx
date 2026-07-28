import "./Login.css";



const Login = ({ alIniciarSesion, alIrARegistro }) => {

  // Provisional para pasar a la ventana de administrador
  const manejarSubmit = (e) => {
      e.preventDefault();
      alIniciarSesion();
    };

    return (
      <div className="contenedor-principal">
            <div className="tarjeta-formulario">
              <h2 className="titulo-formulario">Inicia sesion</h2>

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
                    Olvidaste la contraseña?
                  </a>
                </div>

                <div className="contenedor_boton">
                  <button type="submit" className="boton-enviar" onClick={alIniciarSesion}>
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
}
export default Login;
