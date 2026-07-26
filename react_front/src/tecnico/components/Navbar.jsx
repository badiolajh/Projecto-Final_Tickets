import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ onSelect }) => {
  const opciones = ["Dashboard", "Incidencias", "Historial", "Redes", "Cerrar sesión"];

  return (
    <nav className={styles.navbar}>
      {opciones.map(op => (
        <button
          key={op}
          onClick={() => onSelect(op)}
          className={styles.button}
        >
          {op}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
