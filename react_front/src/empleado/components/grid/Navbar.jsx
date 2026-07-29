import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ onSelect, active, isVisible, onLogout }) => {
  return (
    <nav className={`${styles.navbar} ${isVisible ? styles.show : styles.hide}`}>
      {/* Sección superior: Dashboard */}
      <div className={styles.topSection}>
        <button
          onClick={() => onSelect("Dashboard")}
          className={`${styles.button} ${active === "Dashboard" ? styles.active : ""}`}
        >
          Dashboard
        </button>
      </div>

      {/* Sección central: Incidencias, Historial */}
      <div className={styles.middleSection}>
        {["Incidencias", "Historial"].map(op => (
          <button
            key={op}
            onClick={() => onSelect(op)}
            className={`${styles.button} ${active === op ? styles.active : ""}`}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Sección inferior: Cerrar sesión */}
      <div className={styles.bottomSection}>
        <button
          onClick={onLogout}   
          className={styles.button}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
