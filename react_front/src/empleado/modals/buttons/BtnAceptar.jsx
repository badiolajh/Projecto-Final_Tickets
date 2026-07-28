import React from "react";
import styles from "./BtnAceptar.module.css";

const BtnAceptar = ({ onClick, disabled }) => {
  return (
    <button 
      className={`${styles.button} ${styles.aceptar}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      ✓ Aceptar
    </button>
  );
};

export default BtnAceptar;
