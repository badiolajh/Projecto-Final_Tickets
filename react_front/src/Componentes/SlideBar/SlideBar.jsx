import { Link } from "react-router-dom";

function SlideBar({ onLogout }) {
  return (
    <nav className="slideBar">
          <ul className="textSlideTop">
              <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
          <ul className="textSlideMedio">
            <li><Link to="/usuarios">Usuarios</Link></li>
            <li><Link to="/incidencias">Incidencias</Link></li>
            <li><Link to="/historial">Historial</Link></li>
            <li><Link to="/redes">Redes</Link></li>
          </ul>
          <ul className="textSlideDown">
                  <li>
                    <button className="btn-logout" onClick={onLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
        </nav>
  )
}
export default SlideBar;
