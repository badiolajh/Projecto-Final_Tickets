import React from "react";
import styles from "./ActionButton.module.css";

const ActionButton = ({ tipo, onClick }) => {
  let label = "";
  let className = "";

  switch (tipo) {
    case "ver":
      label = "Ver";
      className = styles.ver;
      break;
    case "finalizar":
      label = "Finalizar";
      className = styles.finalizar;
      break;
    case "diagnostico":
      label = "Diagnóstico";
      className = styles.diagnostico;
      break;
    case "nuevo":
      label = "+ Nueva solicitud";
      className = styles.nuevo;
      break;
    default:
      label = "Acción";
      className = styles.default;
  }

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ActionButton;
