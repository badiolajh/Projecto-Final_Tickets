import React from 'react';
import styles from './TablaDashboard.module.css';
import verIcon from '../../icons/i_ver_dashboard.png';

const TablaDashboard = ({ titulo, filas, onVer }) => {
    return (
        <div className={styles.dashboardTable}>
            <h3 className={styles.title}>{titulo}</h3>
            <div className={styles.content}>
                {filas.map((fila, idx) => (
                    <div key={idx} className={styles.row}>
                        <span className={styles.name}>{fila.nombre}</span>
                        <span className={styles.type}>Tipo: {fila.tipo}</span>
                        <button
                            className={styles.viewButton}
                            onClick={() => onVer(fila)}
                        >
                            <img src={verIcon} alt="Ver" className={styles.viewIcon} />
                            Ver
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TablaDashboard;
