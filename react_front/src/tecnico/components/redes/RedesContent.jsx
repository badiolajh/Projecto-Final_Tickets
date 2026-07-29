import React, { useState } from "react";
import TablaGeneral from "../tables/TablaGeneral";
import SearchBar from "../common/SearchBar";
import FilterEstado from "../common/FilterEstado";
import ActionButton from "../common/ActionButton";
import styles from "./RedesContent.module.css";

const RedesContent = ({ acciones }) => {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("todos");

  const encabezados = ["Solicitud", "Tipo", "Fecha", "Acciones"];
  const filas = [
    ["Nueva conexión", "Redes", "20/07/26"],
    ["Cambio de router", "Redes", "15/07/26"],
    ["Instalación switch", "Redes", "10/07/26"],
  ];

  return (
    <div className={styles.redes}>
      <h2 className={styles.title}>Gestión de solicitudes de red</h2>

      <div className={styles.controls}>
        <SearchBar onChange={setSearch} />
        <FilterEstado value={estado} onChange={setEstado} />
        <ActionButton
          tipo="nuevo"
          onClick={() => console.log("Crear nueva solicitud de red")}
        />
      </div>

      <TablaGeneral encabezados={encabezados} filas={filas} acciones={acciones} />
    </div>
  );
};

export default RedesContent;
