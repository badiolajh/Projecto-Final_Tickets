import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import MainGeneral from '../components/MainGeneral';
import DashboardContent from '../components/dashboard/DashboardContent';
import '../tecnico.css';
import RedesContent from '../components/redes/RedesContent';
import HistorialContent from '../components/historial/HistorialContent';
import IncidenciasContent from '../components/incidencias/IncidenciasContent';

const TecnicoLayout = () => {
    const [opcion, setOpcion] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const user = { nombre: 'Jonathan', avatar: null };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

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
                />

                {/* Overlay para cerrar el menú al hacer clic fuera */}
                {menuOpen && (
                    <div className="overlay" onClick={closeMenu}></div>
                )}

                <div className="main-content">
                    <MainGeneral titulo={opcion}>
                        {/* Aquí se insertará el contenido dinámico según la opción */}
                        {opcion === 'Dashboard' && (
                            <DashboardContent user={user} />
                        )}
                        {opcion === 'Incidencias' && <IncidenciasContent />}
                        {opcion === 'Historial' && <HistorialContent />}
                        {opcion === 'Redes' && <RedesContent />}
                    </MainGeneral>
                </div>
            </div>
        </div>
    );
};

export default TecnicoLayout;
