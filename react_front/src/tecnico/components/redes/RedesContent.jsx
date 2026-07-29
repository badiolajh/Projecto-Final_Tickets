import React, { useState } from "react";
import TablaGeneral from "../tables/TablaGeneral";
import SearchBar from "../common/SearchBar";
import FilterEstado from "../common/FilterEstado";
import ActionButton from "../common/ActionButton";
import styles from "./RedesContent.module.css";

const RedesContent = ({ acciones, onNuevaSolicitud }) => {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("todos");

  const encabezados = ["Empleado", "Estado", "Fecha", "Acciones"];
  const filas = [
    ["Jorge", "Pendiente", "20/07/26"],
    ["Julian", "Finalizado", "15/07/26"],
    ["Cristian", "Finalizado", "10/07/26"],
  ];

  return (
    <div className={styles.redes}>
      <h2 className={styles.title}>Tus solicitudes de red!</h2>

      <div className={styles.controls}>
        <SearchBar onChange={setSearch} />
        <FilterEstado value={estado} onChange={setEstado} />
        {/* ✅ Botón ajustado para abrir modal en modo nuevo */}
        <ActionButton
          tipo="nuevo"
          onClick={onNuevaSolicitud}
        />
      </div>

      <TablaGeneral encabezados={encabezados} filas={filas} acciones={acciones} />
    </div>
  );
};

export default RedesContent;
