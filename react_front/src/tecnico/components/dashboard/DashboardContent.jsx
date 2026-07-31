import React from 'react';
import styles from './DashboardContent.module.css';
import TablaDashboard from '../tables/TablaDashboard';

const DashboardContent = ({ user, acciones, tickets }) => {
    // Ya no necesitamos filtrar por técnico aquí, el hook lo hace
    const estadisticas = {
        asignados: tickets.length,
        pendientes: tickets.filter(
            (t) => t.estado?.nombre_estado === 'Sin asignar'
        ).length,
        proceso: tickets.filter((t) => t.estado?.nombre_estado === 'En proceso')
            .length,
        resueltos: tickets.filter(
            (t) => t.estado?.nombre_estado === 'Finalizado'
        ).length,
    };

    const total = tickets.length || 1;
    const distribucion = {
        redes: `${Math.round((tickets.filter((t) => t.categoria?.nombre_tipo === 'Redes').length / total) * 100)}%`,
        sistemas: `${Math.round((tickets.filter((t) => t.categoria?.nombre_tipo === 'Software').length / total) * 100)}%`,
        hardware: `${Math.round((tickets.filter((t) => t.categoria?.nombre_tipo === 'Hardware').length / total) * 100)}%`,
    };

    // Solo mostramos tickets activos (en proceso)
    const ticketsPendientes = tickets.filter((t) => t.estado?.id === 2);

    return (
        <div className={styles.dashboard}>
            <h2 className={styles.welcome}>
                Bienvenido {user?.nombre || 'Técnico'}
            </h2>

            {/* Estadísticas */}
            <div className={styles.stats}>
                <div className={styles.statBox}>
                    <span className={styles.number}>
                        {estadisticas.asignados}
                    </span>
                    <span className={styles.label}>Asignados</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.number}>
                        {estadisticas.pendientes}
                    </span>
                    <span className={styles.label}>Pendientes</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.number}>
                        {estadisticas.proceso}
                    </span>
                    <span className={styles.label}>En proceso</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.number}>
                        {estadisticas.resueltos}
                    </span>
                    <span className={styles.label}>Resueltos</span>
                </div>
            </div>

            {/* Distribución + tabla */}
            <div className={styles.row}>
                <div className={styles.distribution}>
                    <h3 className={styles.distTitle}>Distribución</h3>
                    <div className={styles.distRow}>
                        <span className={styles.distLabel}>Redes:</span>
                        <span className={styles.distValue}>
                            {distribucion.redes}
                        </span>
                    </div>
                    <div className={styles.distRow}>
                        <span className={styles.distLabel}>Sistemas:</span>
                        <span className={styles.distValue}>
                            {distribucion.sistemas}
                        </span>
                    </div>
                    <div className={styles.distRow}>
                        <span className={styles.distLabel}>Hardware:</span>
                        <span className={styles.distValue}>
                            {distribucion.hardware}
                        </span>
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
