import React from "react";
import styles from "./DashboardContent.module.css";
import TablaDashboard from "../tables/TablaDashboard";

const DashboardContent = ({ user }) => {
  // Datos estáticos de ejemplo (luego vendrán del backend)
  const estadisticas = {
    asignados: 23,
    pendientes: 6,
    proceso: 12,
    resueltos: 34,
  };

  const distribucion = {
    redes: "20%",
    sistemas: "30%",
    hardware: "50%",
  };

  const ticketsPendientes = [
    { nombre: "Andres", tipo: "Sistemas" },
    { nombre: "Adrian", tipo: "Hardware" },
    { nombre: "Jorge", tipo: "Redes" },
    { nombre: "Abril", tipo: "Sistemas" },
    { nombre: "Maria", tipo: "Hardware" },
    { nombre: "Maria", tipo: "Hardware" },
  ];

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.welcome}>Bienvenido {user?.nombre || "Técnico"}</h2>

      {/* Sección de estadísticas */}
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <span className={styles.number}>{estadisticas.asignados}</span>
          <span className={styles.label}>Asignados</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.number}>{estadisticas.pendientes}</span>
          <span className={styles.label}>Pendientes</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.number}>{estadisticas.proceso}</span>
          <span className={styles.label}>En proceso</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.number}>{estadisticas.resueltos}</span>
          <span className={styles.label}>Resueltos</span>
        </div>
      </div>

      {/* Sección de distribución */}
      <div className={styles.distribution}>
        <h3>Distribución</h3>
        <p>Redes: {distribucion.redes}</p>
        <p>Sistemas: {distribucion.sistemas}</p>
        <p>Hardware: {distribucion.hardware}</p>
      </div>

      {/* Tabla de tickets pendientes */}
      <TablaDashboard titulo="Tickets asignados pendientes" filas={ticketsPendientes} />
    </div>
  );
};

export default DashboardContent;
