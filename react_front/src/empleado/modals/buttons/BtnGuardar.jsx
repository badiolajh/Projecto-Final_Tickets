import React from "react";
import styles from "./BtnGuardar.module.css";

// Boton Guardar para el modal de ver perfil
const BtnGuardar = ({ onClick }) => {
  let label = "Cancelar";
  let className = "styles.cancelar";
  let icon = iconAceptarDark;

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {icon && <img src={icon} alt={label} className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default BtnGuardar;
