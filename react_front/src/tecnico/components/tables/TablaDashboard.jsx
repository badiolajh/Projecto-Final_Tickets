import React from "react";
import styles from "./TablaDashboard.module.css";

const TablaDashboard = ({ titulo, filas }) => {
  return (
    <div className={styles.dashboardTable}>
      <h3 className={styles.title}>{titulo}</h3>
      <div className={styles.content}>
        {filas.map((fila, idx) => (
          <div key={idx} className={styles.row}>
            <span className={styles.name}>{fila.nombre}</span>
            <span className={styles.type}>Tipo: {fila.tipo}</span>
            <button className={styles.viewButton}>Ver</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablaDashboard;
