import React from "react";
import styles from "./BtnCerrar.module.css";

const BtnCerrar = ({ onClick }) => (
  <button className={`${styles.button} ${styles.cerrar}`} onClick={onClick}>
    ✗ Cerrar
  </button>
);

export default BtnCerrar;
