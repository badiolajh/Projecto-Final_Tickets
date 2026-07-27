import React, { useState } from 'react';
import Header from '../components/grid/Header';
import Navbar from '../components/grid/Navbar';
import MainGeneral from '../components/grid/MainGeneral';
import DashboardContent from '../components/dashboard/DashboardContent';
import IncidenciasContent from '../components/incidencias/IncidenciasContent';
import HistorialContent from '../components/historial/HistorialContent';
import '../empleado.css';

const EmpleadoLayout = () => {
    const [opcion, setOpcion] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const user = { nombre: 'Jonathan', avatar: null };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Acciones específicas para el rol Empleado
    const accionesIncidencias = [
        { tipo: 'ver', onClick: (fila) => console.log('Ver incidencia', fila) },
    ];

    const accionesHistorial = [
        { tipo: 'ver', onClick: (fila) => console.log('Ver historial', fila) },
    ];

    return (
        <div className="layout">
            <Header
                user={user}
                onMenuToggle={toggleMenu}
                isMenuOpen={menuOpen}
            />

            <div className="layout-body">
                <Navbar
                    onSelect={setOpcion}
                    active={opcion}
                    isVisible={menuOpen}
                    opciones={['Dashboard', 'Incidencias', 'Historial', 'Cerrar sesión']}
                />

                {menuOpen && (
                    <div className="overlay" onClick={closeMenu}></div>
                )}

                <div className="main-content">
                    <MainGeneral titulo={opcion}>
                        {opcion === 'Dashboard' && (
                            <DashboardContent user={user} />
                        )}
                        {opcion === 'Incidencias' && (
                            <IncidenciasContent acciones={accionesIncidencias} />
                        )}
                        {opcion === 'Historial' && (
                            <HistorialContent acciones={accionesHistorial} />
                        )}
                        {opcion === 'Cerrar sesión' && (
                            <div>Cerrando sesión...</div>
                        )}
                    </MainGeneral>
                </div>
            </div>
        </div>
    );
};

export default EmpleadoLayout;
