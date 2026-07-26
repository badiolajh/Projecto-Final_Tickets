import React from "react";
import styles from "./Header.module.css";

const Header = ({ user }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SoportITO</div>
      <input type="text" placeholder="Buscar..." className={styles.search} />
      <div className={styles.profile}>
        <button>💬</button>
        <span>{user?.nombre || "Técnico"}</span>
        {user?.avatar ? (
          <img src={user.avatar} alt="Perfil" className={styles.avatar} />
        ) : (
          <div className={styles.avatar}>👤</div>
        )}
      </div>
    </header>
  );
};

export default Header;
