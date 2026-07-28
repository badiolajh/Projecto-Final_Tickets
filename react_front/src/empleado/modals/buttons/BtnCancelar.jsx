import React from "react";
import styles from "./BtnCancelar.module.css";

const BtnCancelar = ({ onClick }) => {
  return (
    <button 
      className={`${styles.button} ${styles.cancelar}`} 
      onClick={onClick}
    >
      ✗ Cancelar
    </button>
  );
};

export default BtnCancelar;
