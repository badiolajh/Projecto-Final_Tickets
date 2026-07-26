import React from "react";
import TablaGeneral from "../tables/TablaGeneral";
import styles from "./IncidenciasContent.module.css";

const IncidenciasContent = () => {
  const encabezados = ["Empleado", "Tipo", "Fecha", "Acciones"];
  const filas = [
    ["Andres", "Sistemas", "26/07/26", "Ver | Finalizar"],
    ["Adrian", "Hardware", "25/07/26", "Ver | Finalizar"],
    ["Jorge", "Redes", "18/07/26", "Ver | Finalizar"],
  ];

  return (
    <div className={styles.incidencias}>
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

export default IncidenciasContent;
