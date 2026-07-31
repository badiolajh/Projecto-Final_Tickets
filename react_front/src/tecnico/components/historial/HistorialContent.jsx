import React, { useState } from "react";
import TablaGeneral from "../tables/TablaGeneral";
import SearchBar from "../common/SearchBar";
import FilterEstado from "../common/FilterEstado";
import styles from "./HistorialContent.module.css";

const HistorialContent = ({ acciones, tickets =[] }) => {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("todos");
  const encabezados = ["Empleado", "Tipo", "Fecha", "Acciones"];

  const filas = tickets.filter(t => t.estado?.nombre_estado === 'Finalizado');

  return (
    <div className={styles.historial}>
      <h2 className={styles.title}>Historial de tickets</h2>

      <div className={styles.controls}>
        <SearchBar onChange={setSearch} />
        <FilterEstado value={estado} onChange={setEstado} />
      </div>

      <TablaGeneral encabezados={encabezados} filas={filas} acciones={acciones} />
    </div>
  );
};

export default HistorialContent;
