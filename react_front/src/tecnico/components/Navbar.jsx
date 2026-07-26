import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ onSelect, active, isVisible }) => {
  const opciones = ["Dashboard", "Incidencias", "Historial", "Redes", "Cerrar sesión"];

  return (
    <nav className={`${styles.navbar} ${isVisible ? styles.show : styles.hide}`}>
      {opciones.map(op => (
        <button
          key={op}
          onClick={() => onSelect(op)}
          className={`${styles.button} ${active === op ? styles.active : ""}`}
        >
          {op}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
