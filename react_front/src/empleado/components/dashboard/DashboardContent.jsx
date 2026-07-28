import React from 'react';
import styles from './DashboardContent.module.css';
import TablaDashboard from '../tables/TablaDashboard';
import ActionButton from '../common/ActionButton';

const DashboardContent = ({ user, onVerTicket, onSolicitarTicket }) => {
    const estadisticas = {
        solicitados: 23,
        sinAsignar: 3,
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
        { nombre: 'Mario', tipo: 'Hardware' },
    ];

    return (
        <div className={styles.dashboard}>
            {/* Fila superior: Bienvenida + Botón Solicitar Ticket */}
            <div className={styles.topRow}>
                <h2 className={styles.welcome}>
                    Bienvenido {user?.nombre || 'Empleado'}!
                </h2>
                <ActionButton
                    tipo="nuevo"
                    onClick={onSolicitarTicket} 
                />
            </div>

            {/* Sección de estadísticas */}
            <div className={styles.stats}>
                <div className={styles.statBox}>
                    <span className={styles.number}>{estadisticas.solicitados}</span>
                    <span className={styles.label}>Solicitados</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.number}>{estadisticas.sinAsignar}</span>
                    <span className={styles.label}>Sin asignar</span>
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

            {/* Sección de distribución + tabla en la misma fila */}
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
                        titulo="Tickets solicitados pendientes"
                        filas={ticketsPendientes}
                        onVer={onVerTicket}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
