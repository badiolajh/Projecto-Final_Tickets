import React from "react";
import styles from "./ModalGeneral.module.css";

const ModalGeneral = ({ titulo, children, acciones, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Cabecera */}
        <div className={styles.cabecera}>
          <span className={styles.titulo}>{titulo}</span>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {/* Cuerpo dinámico */}
        <div className={styles.cuerpo}>
          {children}
        </div>

        {/* Acciones */}
        <div className={styles.acciones}>
          {acciones}
        </div>
      </div>
    </div>
  );
};

export default ModalGeneral;
