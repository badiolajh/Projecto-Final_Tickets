import React from "react";
import TablaGeneral from "../tables/TablaGeneral";
import styles from "./RedesContent.module.css";

const RedesContent = () => {
  const encabezados = ["Solicitud", "Tipo", "Fecha", "Acciones"];
  const filas = [
    ["Nueva conexión", "Redes", "20/07/26", "Ver | Finalizar"],
    ["Cambio de router", "Redes", "15/07/26", "Ver | Finalizar"],
  ];

  return (
    <div className={styles.redes}>
      <div className={styles.controls}>
        <input type="text" placeholder="Buscar..." className={styles.search} />
        <select className={styles.filter}>
          <option>Pendiente</option>
          <option>Activo</option>
          <option>Finalizado</option>
        </select>
        <button className={styles.newRequest}>+ Nueva solicitud de red</button>
      </div>
      <TablaGeneral encabezados={encabezados} filas={filas} />
    </div>
  );
};

export default RedesContent;
