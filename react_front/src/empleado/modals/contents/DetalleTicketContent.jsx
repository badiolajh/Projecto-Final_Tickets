import React from "react";
import styles from "./DetalleTicketContent.module.css";

const DetalleTicketContent = ({ ticket }) => {
  return (
    <div className={styles.detalle}>
      <h3>Datos del ticket</h3>
      <p><strong>Tipo:</strong> {ticket.tipo}</p>
      <p><strong>Descripción:</strong> {ticket.descripcion}</p>
      <p><strong>Asignado a:</strong> {ticket.asignado}</p>
    </div>
  );
};

export default DetalleTicketContent;
