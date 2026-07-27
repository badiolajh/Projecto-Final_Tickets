import React from "react";
import styles from "./BtnCancelar.module.css";
import iconAceptarDark from "../../icons/i_ver_dashboard.png"

const BtnCancelar = ({ onClick }) => {
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

export default BtnCancelar;
