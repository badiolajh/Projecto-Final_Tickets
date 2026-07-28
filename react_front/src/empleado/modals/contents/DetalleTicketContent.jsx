import React from "react";
import styles from "./DetalleTicketContent.module.css";

const DetalleTicketContent = ({ ticket }) => {
  return (
    <div className={styles.detalle}>
      {/* Título */}
      <h3 className={styles.titulo}>Datos del ticket</h3>

      {/* Cuerpo */}
      <div className={styles.cuerpo}>
        <div className={styles.fieldRow}>
          <label className={styles.label}>Tipo:</label>
          <input type="text" value={ticket.tipo} disabled />
        </div>

        <div className={styles.fieldColumn}>
          <div className={styles.labelWrapper}>
            <label className={styles.labelDescripcion}>Descripción:</label>
          </div>
          <textarea value={ticket.descripcion} disabled />
        </div>

        <div className={styles.fieldRow}>
          <label className={styles.label}>Asignado a:</label>
          <input type="text" value={ticket.asignado} disabled />
        </div>
      </div>
    </div>
  );
};

export default DetalleTicketContent;
