import React, { useState } from "react";
import TablaGeneral from "../tables/TablaGeneral";
import SearchBar from "../common/SearchBar";
import FilterEstado from "../common/FilterEstado";
import styles from "./IncidenciasContent.module.css";

const IncidenciasContent = () => {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("pendiente");

  const encabezados = ["Empleado", "Tipo", "Fecha", "Acciones"];
  const filas = [
    ["Andres", "Sistemas", "26/07/26", "Ver | Finalizar"],
    ["Adrian", "Hardware", "25/07/26", "Ver | Finalizar"],
    ["Jorge", "Redes", "18/07/26", "Ver | Finalizar"],
  ];

  return (
    <div className={styles.incidencias}>
      <h2 className={styles.title}>Estos son tus tickets activos!</h2>

      {/* Controles superiores */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <label className={styles.label}>Buscar</label>
          <SearchBar placeholder="Buscar..." onChange={setSearch} />
        </div>

        <div className={styles.filterWrapper}>
          <label className={styles.label}>Estado</label>
          <FilterEstado value={estado} onChange={setEstado} />
        </div>
      </div>

      {/* Tabla general */}
      <TablaGeneral encabezados={encabezados} filas={filas} />
    </div>
  );
};

export default IncidenciasContent;
