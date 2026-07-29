import { useState } from "react";
import { Link } from "react-router-dom";

function SlideBar({ onLogout }) {
  // Estado para controlar si el menú hamburguesa está abierto o cerrado en celular
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // Cierra el menú automáticamente al hacer clic en cualquier
  const cerrarMenuMovil = () => {
    setMenuAbierto(false);
  };

  return (
    <>
      {/* Botón de hamburguesa (solo aparecerá en pantallas de celular gracias al CSS) */}
      <button className="btn-hamburguesa" onClick={toggleMenu} aria-label="Abrir menú">
        ☰
      </button>

      {/* Contenedor principal con clase dinámica si está abierto */}
      <nav className={`slideBar ${menuAbierto ? "abierto" : ""}`}>
        <ul className="textSlideTop">
          <li><Link to="/dashboard" onClick={cerrarMenuMovil}>Dashboard</Link></li>
        </ul>

        <ul className="textSlideMedio">
          <li><Link to="/usuarios" onClick={cerrarMenuMovil}>Usuarios</Link></li>
          <li><Link to="/incidencias" onClick={cerrarMenuMovil}>Incidencias</Link></li>
          <li><Link to="/historial" onClick={cerrarMenuMovil}>Historial</Link></li>
          <li><Link to="/redes" onClick={cerrarMenuMovil}>Redes</Link></li>
        </ul>

        <ul className="textSlideDown">
          <li>
            <button className="btn-logout" onClick={() => { cerrarMenuMovil(); onLogout(); }}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SlideBar;
