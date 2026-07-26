import React from "react";
import styles from "./Header.module.css";
import logoIcon from "../icons/i_logo.png";
import mensajeIcon from "../icons/i_mensaje.png";
import perfilIcon from "../icons/i_perfil.png";

const Header = ({ user, onProfileClick }) => {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src={logoIcon} alt="Logo" className={styles.logoIcon} />
      </div>

      {/* Barra de búsqueda */}
      <div className={styles.searchContainer}>
        <span className={styles.searchLabel}>Buscar</span>
        <input type="text" placeholder="Buscar..." className={styles.search} />
      </div>

      {/* Perfil y acciones */}
      <div className={styles.profile}>
        <button className={styles.iconButton}>
          <img src={mensajeIcon} alt="Mensajes" className={styles.iconMessage} />
        </button>
        <span className={styles.username}>{user?.nombre || "Técnico"}</span>
        <button className={styles.avatarButton} onClick={onProfileClick}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Perfil" className={styles.avatar} />
          ) : (
            <img src={perfilIcon} alt="Perfil por defecto" className={styles.avatar} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
