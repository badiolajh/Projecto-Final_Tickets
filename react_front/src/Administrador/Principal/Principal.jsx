import { Routes, Route, Navigate } from "react-router-dom";

import '../../Componentes/SlideBar/SlideBar.css';
import '../../Componentes/NavBar/NavBar.css';
import '../../Componentes/Administrador_componentes/Usuarios-Frame/Usuarios_F.css';
import '../../Componentes/Administrador_componentes/Incidencias-Frame/Incidencias_F.css'
import './Principal.css';

import SlideBar from '../../Componentes/SlideBar/SlideBar.jsx';
import NavBar from '../../Componentes/NavBar/NavBar.jsx';
import Usuarios_F from '../../Componentes/Administrador_componentes/Usuarios-Frame/Usuarios_F.jsx';
import DashBoardAdmin from "../../Componentes/Administrador_componentes/DashBoardAdmin/DashBoardAdmin.jsx";
import Incidencias_Frame from "../../Componentes/Administrador_componentes/Incidencias-Frame/Incidencias_F.jsx";
import Historial_Frame from "../../Componentes/Administrador_componentes/Historial-Frame/Historial_F.jsx";
import Redes_Frame from "../../Componentes/Administrador_componentes/Redes-Frame/Redes_F.jsx";

function Principal({onLogout}) {
  // if (!user) return <Navigate to="/" replace />;

  return (
    <div className="app-layout">
          <NavBar  />{/*  user={user}*/}

          <div className="content-area">
            <SlideBar onLogout={onLogout}  /> {/* onLogout={onLogout}*/}

            <main className="main-content">
              <Routes>
                {/* La ruta base debe apuntar a usuarios explícitamente */}
                <Route index element={<Navigate to="/dashboard" replace />} />

                <Route path="/dashboard" element={<DashBoardAdmin/>} />
                <Route path="/usuarios" element={<Usuarios_F/>} />     {/* user={user}*/}
            <Route path="/incidencias" element={<Incidencias_Frame />} />
                <Route path="/historial" element={<Historial_Frame/>} />
                <Route path="/redes" element={<Redes_Frame/>} />

                {/* Ruta para manejar errores o rutas inexistentes */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
  );
}
export default Principal;
