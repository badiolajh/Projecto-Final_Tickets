import React, { useState } from "react";
import styles from "./ModalVerPerfil.module.css";
import iconSubir from "../icons/i_subir.png";

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
      onSave(formData);
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
            <button className={styles.editPhoto}>
              <img src={iconSubir} alt="Subir" className={styles.iconUpload} />
              Subir foto
            </button>
          </div>

          {/* Campos */}
          <div className={styles.field}>
            <label>Nombre:</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? styles.errorInput : ""}
            />
          </div>
          {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}

          <div className={styles.field}>
            <label>Puesto:</label>
            <input name="puesto" value={formData.puesto} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Área:</label>
            <input name="area" value={formData.area} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Correo:</label>
            <input
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? styles.errorInput : ""}
            />
          </div>
          {errors.correo && <span className={styles.error}>{errors.correo}</span>}

          <div className={styles.field}>
            <label>Contraseña:</label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className={errors.contraseña ? styles.errorInput : ""}
            />
          </div>
          {errors.contraseña && <span className={styles.error}>{errors.contraseña}</span>}

          <div className={styles.field}>
            <label>Extensión:</label>
            <input name="extension" value={formData.extension} onChange={handleChange} />
          </div>
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
