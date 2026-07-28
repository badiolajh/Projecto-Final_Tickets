import React from "react";
import styles from "./BtnCerrar.module.css";

const BtnCerrar = ({ onClick }) => (
  <button className={styles.cerrar} onClick={onClick}>
    X Cerrar
  </button>
);

export default BtnCerrar;
