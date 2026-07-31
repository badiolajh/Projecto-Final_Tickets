import React, { useState } from 'react';
import TablaGeneral from '../tables/TablaGeneral';
import SearchBar from '../common/SearchBar';
import FilterEstado from '../common/FilterEstado';
import styles from './IncidenciasContent.module.css';

const IncidenciasContent = ({ acciones, tickets = [] }) => {
    const [search, setSearch] = useState('');
    const [estado, setEstado] = useState('todos');
    const encabezados = ['Empleado', 'Tipo', 'Fecha', 'Acciones'];

    const ticketsSeguro = Array.isArray(tickets) ? tickets : [];

    // Filtrar por búsqueda si es necesario
    const ticketsConBusqueda = ticketsSeguro.filter(t => {
        const coincideBusqueda =
            t.empleado?.nombre_completo?.toLowerCase().includes(search.toLowerCase()) ||
            t.categoria?.nombre_tipo?.toLowerCase().includes(search.toLowerCase());

        const coincideEstado = estado === 'todos' || t.estado?.nombre_estado === estado;

        return coincideBusqueda && coincideEstado;
    });

    // 1. Filtramos los tickets activos (no finalizados)
    const ticketsFiltrados = ticketsConBusqueda.filter(
        t => t.estado?.nombre_estado !== 'Finalizado'
    );

    // 2. Preparamos las columnas de texto para la tabla
    const filas = ticketsFiltrados.map(t => [
        t.empleado?.nombre_completo || 'Desconocido',
        t.categoria?.nombre_tipo || 'General',
        t.fecha_creacion ? new Date(t.fecha_creacion).toLocaleDateString() : 'N/A',
    ]);

    return (
        <div className={styles.incidencias}>
            <h2 className={styles.title}>Estos son tus tickets activos!</h2>

            <div className={styles.controls}>
                <SearchBar onChange={setSearch} />
                <FilterEstado value={estado} onChange={setEstado} />
            </div>

            <TablaGeneral
                encabezados={encabezados}
                filas={filas}
                acciones={acciones.map(accion => ({
                    ...accion,
                    onClick: (_, index) => {
                        accion.onClick(ticketsFiltrados[index]);
                    }
                }))}
            />
        </div>
    );
};

export default IncidenciasContent;
