import React, { useState } from "react";
import styles from "./ModalVerPerfil.module.css";

const ModalVerPerfil = ({ info, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: info.nombre || "",
    puesto: info.puesto || "",
    area: info.area || "",
    correo: info.correo || "",
    contraseña: info.contraseña || "",
    extension: info.extension || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.correo) newErrors.correo = "El correo es obligatorio";
    if (!formData.contraseña) newErrors.contraseña = "La contraseña es obligatoria";
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave(formData); // aquí se conecta con la API
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Cuerpo */}
        <div className={styles.body}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}></div>
            <button className={styles.editPhoto}>Subir foto</button>
          </div>

          <label>Nombre:</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? styles.errorInput : ""}
          />
          {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}

          <label>Puesto:</label>
          <input name="puesto" value={formData.puesto} onChange={handleChange} />

          <label>Área:</label>
          <input name="area" value={formData.area} onChange={handleChange} />

          <label>Correo:</label>
          <input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={errors.correo ? styles.errorInput : ""}
          />
          {errors.correo && <span className={styles.error}>{errors.correo}</span>}

          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className={errors.contraseña ? styles.errorInput : ""}
          />
          {errors.contraseña && <span className={styles.error}>{errors.contraseña}</span>}

          <label>Extensión:</label>
          <input name="extension" value={formData.extension} onChange={handleChange} />
        </div>

        {/* Acciones */}
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancelar</button>
          <button className={styles.save} onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerPerfil;
