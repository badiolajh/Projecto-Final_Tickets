import React, { useState } from "react";
import styles from "./CrearTicketContent.module.css";

const CrearTicketContent = ({ onValidChange }) => {
  const [tipo, setTipo] = useState("Hardware");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const validate = (text) => {
    if (!text || text.trim().length < 50) {
      setError("La descripción debe tener al menos 50 caracteres.");
      onValidChange(false, { tipo, descripcion: text });
    } else {
      setError("");
      onValidChange(true, { tipo, descripcion: text });
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setDescripcion(text);
    validate(text);
  };

  return (
    <div className={styles.crearTicket}>
      <h3>Completa el formulario</h3>

      <label>Tipo:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option>Hardware</option>
        <option>Sistemas</option>
        <option>Redes</option>
      </select>

      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={handleChange}
        placeholder="Describe detalladamente el problema..."
        className={error ? styles.errorInput : ""}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default CrearTicketContent;
