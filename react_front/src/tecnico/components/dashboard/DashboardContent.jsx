import React from 'react';
import styles from './DashboardContent.module.css';
import TablaDashboard from '../tables/TablaDashboard';

const DashboardContent = ({ user, acciones }) => {   
    // Datos estáticos de ejemplo
    const estadisticas = {
        asignados: 23,
        pendientes: 6,
        proceso: 12,
        resueltos: 34,
    };

    const distribucion = {
        redes: '20%',
        sistemas: '30%',
        hardware: '50%',
    };

    const ticketsPendientes = [
        { nombre: 'Andres', tipo: 'Sistemas' },
        { nombre: 'Adrian', tipo: 'Hardware' },
        { nombre: 'Jorge', tipo: 'Redes' },
        { nombre: 'Abril', tipo: 'Sistemas' },
        { nombre: 'Maria', tipo: 'Hardware' },
        { nombre: 'Maria', tipo: 'Hardware' },
    ];

    return (
        <div className={styles.dashboard}>
            <h2 className={styles.welcome}>
                Bienvenido {user?.nombre || 'Técnico'}
            </h2>

            {/* Sección de estadísticas */}
            <div className={styles.stats}>
                <div className={styles.statBox}>
                    <span className={styles.number}>{estadisticas.asignados}</span>
                    <span className={styles.label}>Asignados</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.number}>{estadisticas.pendientes}</span>
                    <span className={styles.label}>Pendientes</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.number}>{estadisticas.proceso}</span>
                    <span className={styles.label}>En proceso</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.number}>{estadisticas.resueltos}</span>
                    <span className={styles.label}>Resueltos</span>
                </div>
            </div>

            {/* Sección de distribución + tabla */}
            <div className={styles.row}>
                <div className={styles.distribution}>
                    <h3 className={styles.distTitle}>Distribución</h3>
                    <div className={styles.distRow}>
                        <span className={styles.distLabel}>Redes:</span>
                        <span className={styles.distValue}>{distribucion.redes}</span>
                    </div>
                    <div className={styles.distRow}>
                        <span className={styles.distLabel}>Sistemas:</span>
                        <span className={styles.distValue}>{distribucion.sistemas}</span>
                    </div>
                    <div className={styles.distRow}>
                        <span className={styles.distLabel}>Hardware:</span>
                        <span className={styles.distValue}>{distribucion.hardware}</span>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <TablaDashboard
                        titulo="Tickets asignados pendientes"
                        filas={ticketsPendientes}
                        acciones={acciones}  
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
