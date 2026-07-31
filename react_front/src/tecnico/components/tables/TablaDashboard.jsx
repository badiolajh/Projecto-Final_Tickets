import React from 'react';
import styles from './TablaDashboard.module.css';
import verIcon from '../../icons/i_ver_dashboard.png';

const TablaDashboard = ({ titulo, filas, acciones = [] }) => {
    return (
        <div className={styles.dashboardTable}>
            <h3 className={styles.title}>{titulo}</h3>
            <div className={styles.content}>
                {filas.map((ticket, idx) => (
                    <div key={idx} className={styles.row}>
                    <span className={styles.name}>{ticket.empleado?.nombre_completo}</span>
                    <span className={styles.type}>Tipo: {ticket.categoria?.nombre_tipo}</span>
                    <button
                        className={styles.viewButton}
                        onClick={() => {
                        const accionVer = acciones.find(a => a.tipo === 'ver');
                        if (accionVer) accionVer.onClick(ticket); // ✅ pasa el objeto completo
                        }}
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
