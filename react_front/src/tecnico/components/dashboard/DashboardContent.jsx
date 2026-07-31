import React from 'react';
import styles from './DashboardContent.module.css';
import TablaDashboard from '../tables/TablaDashboard';

const DashboardContent = ({ user, acciones, tickets }) => {
    console.log("Usuario en Dashboard:", user); // 🔍 Verificar
    console.log("Tickets recibidos:", tickets);

    const ticketsFiltrados = React.useMemo(() => {
            if (!user || !Array.isArray(tickets)) return [];

            const esTecnico = user.id_rol === 2 || user.rol_id === 2 || user.rol?.id === 2;

            console.log("¿Es técnico?", esTecnico);

            if (esTecnico) {
                // Obtenemos el ID del usuario asegurando que sea numérico
                const idUsuarioActual = Number(user.id_usuario || user.id);

                const filtrados = tickets.filter(ticket => {
                    const tecnicoIdTicket = Number(ticket.tecnico_id || ticket.tecnico?.id_usuario);

                    // Comparamos ambos como números
                    const coincide = tecnicoIdTicket === idUsuarioActual;

                    console.log(`Ticket ${ticket.id_ticket}: tecnico_id=${tecnicoIdTicket} vs usuario=${idUsuarioActual}, coincide=${coincide}`);
                    return coincide;
                });

                console.log("Tickets filtrados para técnico:", filtrados);
                return filtrados;
            }

            return tickets;
        }, [user, tickets]);

    const estadisticas = {
        asignados: ticketsFiltrados.length,
        pendientes: ticketsFiltrados.filter(t => t.estado?.nombre_estado === 'Sin asignar').length,
        proceso: ticketsFiltrados.filter(t => t.estado?.nombre_estado === 'En proceso').length,
        resueltos: ticketsFiltrados.filter(t => t.estado?.nombre_estado === 'Finalizado').length,
    };

    const total = ticketsFiltrados.length || 1;
    const distribucion = {
        redes: `${Math.round((ticketsFiltrados.filter(t => t.categoria?.nombre_tipo === 'Redes').length / total) * 100)}%`,
        sistemas: `${Math.round((ticketsFiltrados.filter(t => t.categoria?.nombre_tipo === 'Software').length / total) * 100)}%`,
        hardware: `${Math.round((ticketsFiltrados.filter(t => t.categoria?.nombre_tipo === 'Hardware').length / total) * 100)}%`,
    };

    const ticketsPendientes = tickets.filter(t => t.estado?.nombre_estado !== 'Finalizado');

    return (
        <div className={styles.dashboard}>
            <h2 className={styles.welcome}>
                Bienvenido {user?.nombre || 'Técnico'}
            </h2>

            {/* Sección de estadísticas */}
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

            {/* Sección de distribución + tabla */}
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
