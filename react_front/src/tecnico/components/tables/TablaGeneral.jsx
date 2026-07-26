import React from "react";
import styles from "./TablaGeneral.module.css";

const TablaGeneral = ({ encabezados, filas }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {encabezados.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, idx) => (
            <tr key={idx}>
              {fila.map((dato, i) => (
                <td key={i}>{dato}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <div className={styles.pagination}>
          <button>{"<"}</button>
          <span>1 2 3 ...</span>
          <button>{">"}</button>
        </div>
        <div className={styles.selector}>
          <label>Mostrar:</label>
          <select>
            <option>6 registros</option>
            <option>10 registros</option>
            <option>20 registros</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TablaGeneral;
