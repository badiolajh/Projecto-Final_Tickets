import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import './Componentes/SlideBar/SlideBar.css';
import './Componentes/NavBar/NavBar.css';
import './Componentes/Administrador_componentes/Usuarios-Frame/Usuarios_F.css';

import Principal from "./Administrador/Principal/Principal";
import Login from "./Login/Login";
import Registro from "./Registro/Registro";

import TecnicoLayout from './tecnico/pages/TecnicoLayout'
import EmpleadoLayout from './empleado/pages/EmpleadoLayout'


  function App() {

    const [vistaActual, setVistaActual] = useState('login');
    //Guarda informacion del usuario autentificado
    const [usuario, setUsuario] = useState(null);
    // Recibe el objeto usuario que manda el Login (desde la respuesta de Laravel)
    const manejarInicioSesion = (datosUsuario) => {
        // Leemos directamente el id_rol que ya te manda tu API actual
        const idRol = datosUsuario.id_rol;

        if (idRol === 1) {
          setUsuario(datosUsuario);
          setVistaActual('principal'); // Vista de Administrador
        } else if (idRol === 2) {
          setUsuario(datosUsuario);
          setVistaActual('tecnico');   // Vista de Técnico
        } else if (idRol === 3) {
          setUsuario(datosUsuario);
          setVistaActual('empleado');  // Vista de Empleado
        } else {
          localStorage.removeItem("token");
          throw new Error("Tu cuenta no tiene un rol válido asignado.");
        }
      };

    const manejarCerrarSesion = () => {
        localStorage.removeItem("token");
        setUsuario(null);
        setVistaActual('login');
      };


    return (
      <div className="app-layout">
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />

            {/* Vista de Login */}
            {vistaActual === 'login' && (
              <Login
                alIniciarSesion={manejarInicioSesion}
                alIrARegistro={() => setVistaActual('registro')}
              />
            )}

            {/* Vista de Registro */}
            {vistaActual === 'registro' && (
              <Registro
                alVolverAlLogin={() => setVistaActual('login')}
              />
            )}

            {/* Vista Principal (Administrador) */}
            {vistaActual === 'principal' && (
              <Principal usuario={usuario} onLogout={manejarCerrarSesion} />
            )}

            {/* Vista de Técnico */}
            {vistaActual === 'tecnico' && (
              <TecnicoLayout usuario={usuario} onLogout={manejarCerrarSesion} />
            )}

            {/* Vista de Empleado */}
            {vistaActual === 'empleado' && (
              <EmpleadoLayout usuario={usuario} onLogout={manejarCerrarSesion} />
            )}
          </div>
        );
      }
export default App;
