import React from "react";
import styles from "./Header.module.css";
import logoIcon from "../icons/i_logo.png";
import mensajeIcon from "../icons/i_mensaje.png";
import perfilIcon from "../icons/i_perfil.png";

const Header = ({ user, onMenuToggle, isMenuOpen, onProfileClick }) => {
  return (
    <header className={styles.header}>
        {/* Botón de menú (visible en mobile) */}
        <div
          className={`${styles.menu} ${isMenuOpen ? styles.menuToggle : ""}`}
          onClick={onMenuToggle}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src={logoIcon} alt="Logo" className={styles.logoIcon} />
      </div>

      {/* Buscador (solo visible en desktop) */}
      <div className={styles.searchContainer}>
        <span className={styles.searchLabel}>Buscar</span>
        <input type="text" placeholder="Buscar..." className={styles.search} />
      </div>

      {/* Perfil y acciones */}
      <div className={styles.profile}>
        
        {/* Icono de mensajes */}
        <button className={styles.iconButton}>
          <img src={mensajeIcon} alt="Mensajes" className={styles.iconMessage} />
        </button>

        {/* Nombre (solo desktop) */}
        <span className={styles.username}>{user?.nombre || "Técnico"}</span>

        {/* Avatar como botón */}
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
