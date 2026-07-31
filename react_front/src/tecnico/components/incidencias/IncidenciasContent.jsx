import React, { useState } from 'react';
import TablaGeneral from '../tables/TablaGeneral';
import SearchBar from '../common/SearchBar';
import FilterEstado from '../common/FilterEstado';
import styles from './IncidenciasContent.module.css';

const IncidenciasContent = ({ acciones, tickets = [] }) => {
    const [search, setSearch] = useState('');
    const [estado, setEstado] = useState('todos');
    const encabezados = ['Empleado', 'Tipo', 'Fecha', 'Acciones'];

    const filas = tickets.filter(t => t.estado?.nombre_estado !== 'Finalizado');

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
