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


  function App() {

    const [vistaActual, setVistaActual] = useState('login');
    return (

      <div className="app-layout">
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />

            {/* Vista de Login */}
            {vistaActual === 'login' && (
              <Login
                alIniciarSesion={() => setVistaActual('principal')}
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
          </div>
        );
      }
export default App;
