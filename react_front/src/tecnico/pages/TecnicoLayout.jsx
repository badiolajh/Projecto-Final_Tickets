import React, { useState } from 'react';
import Header from '../components/grid/Header';
import Navbar from '../components/grid/Navbar';
import MainGeneral from '../components/grid/MainGeneral';
import DashboardContent from '../components/dashboard/DashboardContent';
import '../tecnico.css';
import RedesContent from '../components/redes/RedesContent';
import HistorialContent from '../components/historial/HistorialContent';
import IncidenciasContent from '../components/incidencias/IncidenciasContent';
import ModalVerPerfil from '../modals/Ver-perfil/ModalVerPerfil';

const TecnicoLayout = () => {
    const [opcion, setOpcion] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPerfilModal, setShowPerfilModal] = useState(false);

    const [user, setUser] = useState({
        nombre: 'Jonathan',
        puesto: 'Técnico',
        area: 'Soporte',
        correo: 'jonathan@correo.com',
        contraseña: '********',
        extension: '123',
        avatar: null
    });

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Funciones de acciones para cada sección
    const accionesIncidencias = [
        { tipo: 'ver', onClick: (fila) => console.log('Ver incidencia', fila) },
        { tipo: 'finalizar', onClick: (fila) => console.log('Finalizar incidencia', fila) },
    ];

    const accionesHistorial = [
        { tipo: 'ver', onClick: (fila) => console.log('Ver historial', fila) },
        { tipo: 'diagnostico', onClick: (fila) => console.log('Diagnóstico historial', fila) },
    ];

    const accionesRedes = [
        { tipo: 'ver', onClick: (fila) => console.log('Ver solicitud de red', fila) },
    ];

    return (
        <div className="layout">
            <Header
                user={user}
                onMenuToggle={toggleMenu}
                isMenuOpen={menuOpen}
                onProfileClick={() => setShowPerfilModal(true)} 
            />

            <div className="layout-body">
                <Navbar
                    onSelect={setOpcion}
                    active={opcion}
                    isVisible={menuOpen}
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
                        {opcion === 'Redes' && (
                            <RedesContent acciones={accionesRedes} />
                        )}
                    </MainGeneral>
                </div>
            </div>

            {/* Modal de perfil */}
            {showPerfilModal && (
                <ModalVerPerfil
                    info={user}
                    onClose={() => setShowPerfilModal(false)}
                    onSave={(updatedUser) => {
                        setUser(updatedUser); // ✅ actualiza datos
                        console.log("Perfil actualizado:", updatedUser);
                    }}
                />
            )}
        </div>
    );
};

export default TecnicoLayout;
