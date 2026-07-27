import React from "react";
import styles from "./ModalGeneral.module.css";


const ModalGeneral = ({ info, onClick }) => {

  return (
    // Contenedor del modal general
    <div className={styles.modal}>
        {/* Cabecera */}
        <div className={styles.cabecera}>
            <span className={styles.titulo}>Titulo</span>
        </div>
        {/* Cuerpo */}
        <div className={styles.cuerpo}>
            {/* Contenido dinamico, se insertara el content segun se requiera */}
        </div>
        {/* Acciones, contenedor de los botones*/}
        <div className={styles.modal}>
            {/* Contenido dinamico con los botones */}
        </div> 
    </div>
  );
};

export default ModalGeneral;
