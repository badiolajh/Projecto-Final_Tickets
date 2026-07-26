import React from "react";
import TablaGeneral from "../tables/TablaGeneral";
import styles from "./HistorialContent.module.css";

const HistorialContent = () => {
  const encabezados = ["Empleado", "Tipo", "Fecha", "Acciones"];
  const filas = [
    ["Abril", "Sistemas", "04/07/26", "Ver | Diagnóstico"],
    ["Maria", "Hardware", "28/06/26", "Ver | Diagnóstico"],
  ];

  return (
    <div className={styles.historial}>
      <div className={styles.controls}>
        <input type="text" placeholder="Buscar..." className={styles.search} />
        <select className={styles.filter}>
          <option>Pendiente</option>
          <option>Activo</option>
          <option>Finalizado</option>
        </select>
      </div>
      <TablaGeneral encabezados={encabezados} filas={filas} />
    </div>
  );
};

export default HistorialContent;
