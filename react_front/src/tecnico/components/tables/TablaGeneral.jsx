import React from "react";
import styles from "./TablaGeneral.module.css";
import ActionButton from "../common/ActionButton";

const TablaGeneral = ({ encabezados, filas, acciones }) => {
  return (
    <div className={styles.tableContainer}>
      {/* Encabezado separado en un div */}
      <div className={styles.headerWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {encabezados.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Contenido de la tabla */}
      <div className={styles.bodyWrapper}>
        <table className={styles.table}>
          <tbody>
            {filas.map((ticket, idx) => (
              <tr key={idx}>
                <td>{ticket.empleado?.nombre_completo || 'Desconocido'}</td>
                <td>{ticket.categoria?.nombre_tipo || 'General'}</td>
                <td>{new Date(ticket.fecha_creacion).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actions}>
                    {acciones.map((accion, i) => (
                      <ActionButton
                        key={i}
                        tipo={accion.tipo}
                        onClick={() => accion.onClick(ticket)} // ✅ ahora pasa el objeto completo
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con paginación y selector */}
      <div className={styles.footer}>
        <div className={styles.pagination}>
          <button>{"<"}</button>
          <span className={styles.pageActive}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>10</span>
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
