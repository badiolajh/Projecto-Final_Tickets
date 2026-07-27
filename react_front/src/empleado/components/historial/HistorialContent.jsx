import React, { useState } from "react";
import TablaGeneral from "../tables/TablaGeneral";
import SearchBar from "../common/SearchBar";
import FilterEstado from "../common/FilterEstado";
import styles from "./HistorialContent.module.css";

const HistorialContent = ({ acciones }) => {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("todos");

  const encabezados = ["Empleado", "Tipo", "Fecha", "Acciones"];
  const filas = [
    ["Abril", "Sistemas", "04/07/26"],
    ["Maria", "Hardware", "28/06/26"],
    ["Julian", "Redes", "13/07/26"],
    ["Cristal", "Hardware", "30/06/26"],
  ];

  return (
    <div className={styles.historial}>
      <h2 className={styles.title}>Estos son tus tickets finalizados!</h2>

      <div className={styles.controls}>
        <SearchBar onChange={setSearch} />
        <FilterEstado value={estado} onChange={setEstado} />
      </div>

      <TablaGeneral encabezados={encabezados} filas={filas} acciones={acciones} />
    </div>
  );
};

export default HistorialContent;
