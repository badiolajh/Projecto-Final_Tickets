import React from "react";
import styles from "./ModalVerPerfil.module.css";


const ModalVerPerfil = ({ info, onClick }) => {

  return (
    // Contenedor del modal
    <div className={styles.modal}>
        {/* No hay cabecera */}
        
        {/* Cuerpo */}
        <div className={styles.cuerpo}>
            
        </div>
        {/* Acciones, contenedor de los botones, */}
        <div className={styles.modal}>
            {/* Definir los botones de cancelar y guardar */}
        </div> 
    </div>
  );
};

export default ModalVerPerfil;
