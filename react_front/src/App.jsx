import { useState } from "react";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

import './Componentes/SlideBar/SlideBar.css'
import './Componentes/NavBar/NavBar.css'
import './Componentes/Administrador_componentes/Usuarios-Frame/Usuarios_F.css'
import Principal from "./Administrador/Principal/Principal";
import Login from "./Login/Login";


  function App() {

    const [estaAutenticado, setEstaAutenticado] = useState(false);

    return (

      <div className="app-layout">
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />

            {/* Si NO está autenticado muestra el Login, si SÍ está autenticado muestra Principal */}
            {!estaAutenticado ? (
              <Login alIniciarSesion={() => setEstaAutenticado(true)} />
            ) : (
              <Principal onLogout={() => setEstaAutenticado(false)}/>
            )}
          </div>

    );
}
export default App;
