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
import TecnicoLayout from './tecnico/pages/TecnicoLayout';
import EmpleadoLayout from './empleado/pages/EmpleadoLayout';

function App() {
  const [vistaActual, setVistaActual] = useState("login");
  const [user, setUser] = useState(null);

  const manejarLogin = (userData) => {
    setUser(userData);
    setVistaActual("layout");
  };

  const manejarLogout = () => {
    setUser(null);
    setVistaActual("login");
  };

  return (
    <div className="app-layout">
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      {/* Vista de Login */}
      {vistaActual === "login" && (
        <Login
          alIniciarSesion={manejarLogin}
          alIrARegistro={() => setVistaActual("registro")}
        />
      )}

      {/* Vista de Registro */}
      {vistaActual === "registro" && (
        <Registro alVolverAlLogin={() => setVistaActual("login")} />
      )}

      {/* Vista según rol */}
      {vistaActual === "layout" && user && (
        <>
          {user.rol === "admin" && (
            <Principal onLogout={manejarLogout} />
          )}
          {user.rol === "tecnico" && (
            <TecnicoLayout onLogout={manejarLogout} />
          )}
          {user.rol === "empleado" && (
            <EmpleadoLayout onLogout={manejarLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
