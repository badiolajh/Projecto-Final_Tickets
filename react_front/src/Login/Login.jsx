import "./Login.css";


const Login = ({ alIniciarSesion }) => {

  // Provicional para pasar a la ventana de administrador
  const manejarSubmit = (e) => {
      e.preventDefault();

      // Aquí puedes validar usuario y contraseña si lo deseas en el futuro.
      // Como pusiste el botón de sign in, al presionarlo ejecutamos la función:
      alIniciarSesion();
    };

    return (
      <div className="contenedor-principal">
            <div className="tarjeta-formulario">
              <h2 className="titulo-formulario">Inicia sesion</h2>

              <form className="formulario" onSubmit={(e) => e.preventDefault()}>
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
                  Aun no tienes cuenta? <a href="#registro" className="enlace-verde">Registrate</a>
                </div>
              </form>
            </div>
          </div>
    );
}
export default Login;
