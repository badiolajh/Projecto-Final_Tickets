import React from "react";
import styles from "./FilterEstado.module.css";

const FilterEstado = ({ value, onChange }) => {
  return (
    <select
      className={styles.filter}
      value={value}
      onChange={e => onChange?.(e.target.value)}
    >
      <option value="todos">Estado</option>
      <option value="pendiente">Pendiente</option>
      <option value="activo">Activo</option>
      <option value="finalizado">Finalizado</option>
    </select>
  );
};

export default FilterEstado;
