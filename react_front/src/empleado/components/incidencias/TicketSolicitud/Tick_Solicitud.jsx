import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import "./Tick_Solicitud.css";

const Tick_Solicitud = ({ isOpen, onClose, onValidChange, onSubmit }) => {
  const [tipo, setTipo] = useState("Hardware");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validate = (text) => {
    if (!text || text.trim() === "") {
      setError("La descripción no puede estar vacía.");
      if (onValidChange) onValidChange(false, { tipo, descripcion: text });
    } else {
      setError("");
      if (onValidChange) onValidChange(true, { tipo, descripcion: text });
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setDescripcion(text);
    validate(text);
  };

  const handleTipoChange = (e) => {
    const nuevoTipo = e.target.value;
    setTipo(nuevoTipo);
    if (onValidChange) {
      onValidChange(descripcion.trim() !== "", { tipo: nuevoTipo, descripcion });
    }
  };

  const esValido = descripcion.trim() !== "";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="section-title-superior">Solicitar ticket</div>

        <div className="section-title">Completa el formulario</div>

        <div className="tarjeta-cuerpo-formulario">
          <div className="form-row">
            <label>Tipo:</label>
            <select value={tipo} onChange={handleTipoChange}>
              <option value="Hardware">Hardware</option>
              <option value="Sistemas">Sistemas</option>
              <option value="Redes">Redes</option>
            </select>
          </div>

          <div className="form-row-columna">
            <div className="labelWrapper">
              <label className="labelDescripcion">Descripción:</label>
            </div>
            <textarea
              rows="5"
              value={descripcion}
              onChange={handleChange}
              placeholder="Por favor, describa detalladamente cual es el problema que presenta."
              className={error ? "errorInput" : ""}
            />
            {error && <span className="error">{error}</span>}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            <IoClose /> Cancelar
          </button>
          <button
            type="button"
            className="btn-aceptar-form"
            disabled={!esValido}
            onClick={onSubmit}
            style={{ opacity: esValido ? 1 : 0.4, cursor: esValido ? 'pointer' : 'not-allowed' }}
          >
            <FaCheck /> Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tick_Solicitud;
