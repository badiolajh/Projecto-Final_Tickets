import { IoCheckmark } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";

import "./Registro.css";

const Registro = ({ alVolverAlLogin }) => {

  // Función para manejar el botón de "Regisdtro"
    const manejarRegistro = (e) => {
      e.preventDefault();
      alVolverAlLogin();
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

        <form className="formulario" >
          <div className="grupo-input">
            <input
              type="text"
              placeholder="Nombre Completo"
              className="campo-texto"
            />
          </div>
          <div className="grupo-input">
            <input
              type="text"
              placeholder="Puesto"
              className="campo-texto"
            />
          </div>
          <div className="grupo-input">
            <input
              type="text"
              placeholder="Area"
              className="campo-texto"
            />
          </div>
          <div className="grupo-input">
            <input
              type="email"
              placeholder="Correo Electronico"
              className="campo-texto"
            />
          </div>

          <div className="grupo-input">
            <input
              type="password"
              placeholder="Contraseña"
              className="campo-texto"
            />
          </div>
          <div className="grupo-input">
            <input
              type="text"
              placeholder="Extención de telefono (Opcional)"
              className="campo-texto"
            />
          </div>

          <div className="contenedor-enlace">
            <label href="#recuperar" className="Foto">
              Foto (opcional):
            </label>
            <button className="btn-editar-foto"><IoCloudUploadOutline /> Subir</button>
          </div>

          <div className="modal-btnregistro">
                      <button
                        className="btn-cancel"
                        type="button"
                        onClick={manejarRegresar}
                      >
                        <IoIosArrowRoundBack /> Regresar
                      </button>

                      <button
                        className="btn-registrar"
                        type="button"
                        onClick={manejarRegistro}
                      >
                        <IoCheckmark /> Registrar
                      </button>
                    </div>


        </form>
      </div>
    </div>
  );
};

export default Registro;
