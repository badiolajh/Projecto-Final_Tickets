import React from "react";
import styles from "./ActionButton.module.css";
import iconVer from "../../icons/i_ver_general.png";
import iconFinalizar from "../../icons/i_finalizar.png";
import iconDiagnostico from "../../icons/i_diagnostico.png";
import iconNuevo from "../../icons/i_mas.png";

const ActionButton = ({ tipo, onClick }) => {
  let label = "";
  let className = "";
  let icon = null;

  switch (tipo) {
    case "ver":
      label = "Ver";
      className = styles.ver;
      icon = iconVer;
      break;
    case "finalizar":
      label = "Finalizar";
      className = styles.finalizar;
      icon = iconFinalizar;
      break;
    case "diagnostico":
      label = "Diagnóstico";
      className = styles.diagnostico;
      icon = iconDiagnostico;
      break;
    case "nuevo":
      label = "Nueva Solicitud de Red";
      className = styles.nuevo;
      icon = iconNuevo;
      break;
    default:
      label = "Acción";
      className = styles.default;
  }

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {icon && <img src={icon} alt={label} className={styles.icon} />}
      {label}
    </button>
  );
};

export default ActionButton;
