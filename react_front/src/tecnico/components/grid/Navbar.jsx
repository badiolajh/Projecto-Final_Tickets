import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ onSelect, active, isVisible }) => {
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

      {/* Sección central: Incidencias, Historial, Redes */}
      <div className={styles.middleSection}>
        {["Incidencias", "Historial", "Redes"].map(op => (
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
          onClick={() => onSelect("Cerrar sesión")}
          className={`${styles.button} ${active === "Cerrar sesión" ? styles.active : ""}`}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
