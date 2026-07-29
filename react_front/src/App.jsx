import { useState } from "react";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

import './Componentes/SlideBar/SlideBar.css'
import './Componentes/NavBar/NavBar.css'
import './Componentes/Administrador_componentes/Usuarios-Frame/Usuarios_F.css'
import Principal from "./Administrador/Principal/Principal";
import Login from "./Login/Login";
import Registro from "./Registro/Registro";

import TecnicoLayout from './tecnico/pages/TecnicoLayout'
import EmpleadoLayout from './empleado/pages/EmpleadoLayout'


  function App() {

    const [vistaActual, setVistaActual] = useState('login');

    // Función que decide a dónde redirigir según lo que ingrese el usuario
      const manejarInicioSesion = (emailOUser) => {
        const texto = emailOUser.toLowerCase();

        if (texto.includes('tecnico')) {
          setVistaActual('tecnico');
        } else if (texto.includes('empleado')) {
          setVistaActual('empleado');
        } else {
          // Por defecto (si escribes otra cosa o admin) lo mandamos al panel principal
          setVistaActual('principal');
        }
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
              <Principal onLogout={() => setVistaActual('login')} />
            )}

            {/* Vista de Técnico */}
            {vistaActual === 'tecnico' && (
              <TecnicoLayout onLogout={() => setVistaActual('login')} />
            )}

            {/* Vista de Empleado (Corregida con condición para que no se muestre siempre) */}
            {vistaActual === 'empleado' && (
              <EmpleadoLayout onLogout={() => setVistaActual('login')} />
            )}
          </div>
        );
      }
export default App;
