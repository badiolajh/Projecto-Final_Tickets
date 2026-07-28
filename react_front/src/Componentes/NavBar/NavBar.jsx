import { FaRegMessage } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/Logo-Principal.png";


function NavBar({user}) {
  return (
    <nav className='NavBar'>
          <img className="Logo-principal" src={logo} alt='logo del sistema' style={{height: '40px'}} />

          <label className="Buscar">
            Buscar <input type="text" placeholder="Escribe aquí..." />
          </label>

          <button className="Notificaciones"><FaRegMessage /></button>
      <div className="Usuario">{user ? user.username : "Invitado"}  <FaUserCircle className="Foto" /></div>
        </nav>
  )
}
export default NavBar;
