import React from "react";
import styles from "./BtnCancelarDark.module.css";
import iconAceptarDark from "../../icons/i_ver_dashboard.png"

const BtnAceptarLight = ({ onClick }) => {
  let label = "Aceptar";
  let className = "styles.aceptar";
  let icon = iconAceptarDark;

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {icon && <img src={icon} alt={label} className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default BtnAceptarLight;
