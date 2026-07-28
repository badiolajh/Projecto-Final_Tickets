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
import Tick_Pendiente from '../modals/Ver-ticket-pendiente/Ver-pendiente';

const TecnicoLayout = () => {
    const [opcion, setOpcion] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPerfilModal, setShowPerfilModal] = useState(false);
    const [showPendienteModal, setShowPendienteModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

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

    // Acciones para incidencias
    const accionesIncidencias = [
        { tipo: 'ver', onClick: (fila) => {
            setSelectedTicket({ username: fila[0], tipo: fila[1] });
            setShowPendienteModal(true);
        }},
        { tipo: 'finalizar', onClick: (fila) => console.log('Finalizar incidencia', fila) },
    ];

    // Acciones para historial
    const accionesHistorial = [
        { tipo: 'ver', onClick: (fila) => console.log('Ver historial', fila) },
        { tipo: 'diagnostico', onClick: (fila) => console.log('Diagnóstico historial', fila) },
    ];

    // Acciones para redes
    const accionesRedes = [
        { tipo: 'ver', onClick: (fila) => console.log('Ver solicitud de red', fila) },
    ];

    // Acciones para dashboard
    const accionesDashboard = [
        { tipo: 'ver', onClick: (fila) => {
            setSelectedTicket({ username: fila.nombre, tipo: fila.tipo });
            setShowPendienteModal(true);
        }}
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
                            <DashboardContent user={user} acciones={accionesDashboard} />
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
                        setUser(updatedUser);
                        console.log("Perfil actualizado:", updatedUser);
                    }}
                />
            )}

            {/* Modal de ticket pendiente */}
            {showPendienteModal && (
                <Tick_Pendiente
                    isOpen={showPendienteModal}
                    onClose={() => setShowPendienteModal(false)}
                    user={selectedTicket}
                />
            )}
        </div>
    );
};

export default TecnicoLayout;
