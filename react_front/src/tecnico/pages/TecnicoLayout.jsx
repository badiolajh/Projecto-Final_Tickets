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
import Tick_Finalizado from '../modals/Ver-ticket-finalizado/Ver-finalizado';
import Solicitud_Red from '../modals/Ver-solicitud-red/Ver_red';
import FinalizarTicket from '../modals/Finalizar-ticket/finalizar';

const TecnicoLayout = () => {
    const [opcion, setOpcion] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);

    // Estados para modales
    const [showPerfilModal, setShowPerfilModal] = useState(false);
    const [showPendienteModal, setShowPendienteModal] = useState(false);
    const [showFinalizadoModal, setShowFinalizadoModal] = useState(false);
    const [showRedModal, setShowRedModal] = useState(false);

    // Estado para ticket/solicitud seleccionada
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [redMode, setRedMode] = useState('nuevo'); // "nuevo" o "ver"
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [showFinalizarModal, setShowFinalizarModal] = useState(false);

    const [user, setUser] = useState({
        nombre: 'Jonathan',
        puesto: 'Técnico',
        area: 'Soporte',
        correo: 'jonathan@correo.com',
        contraseña: '********',
        extension: '123',
        avatar: null,
    });

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Acciones para incidencias
    const accionesIncidencias = [
        {
            tipo: 'ver',
            onClick: (fila) => {
                setSelectedTicket({ username: fila[0], tipo: fila[1] });
                setShowPendienteModal(true);
            },
        },
        {
            tipo: 'finalizar',
            onClick: (fila) => {
                setSelectedTicket({ username: fila[0], tipo: fila[1] });
                setShowFinalizarModal(true);
            },
        },
    ];

    // Acciones para historial
    const accionesHistorial = [
        {
            tipo: 'ver',
            onClick: (fila) => {
                setSelectedTicket({ username: fila[0], tipo: fila[1] });
                setShowFinalizadoModal(true);
            },
        },
        {
            tipo: 'diagnostico',
            onClick: (fila) => console.log('Diagnóstico historial', fila),
        },
    ];

    // Acciones para redes
    const accionesRedes = [
        {
            tipo: 'ver',
            onClick: (fila) => {
                setSelectedSolicitud({
                    nombre: fila[0],
                    estado: fila[1],
                    fecha: fila[2],
                });
                setRedMode('ver');
                setShowRedModal(true);
            },
        },
    ];

    // Acciones para dashboard
    const accionesDashboard = [
        {
            tipo: 'ver',
            onClick: (fila) => {
                setSelectedTicket({ username: fila.nombre, tipo: fila.tipo });
                setShowPendienteModal(true);
            },
        },
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
                            <DashboardContent
                                user={user}
                                acciones={accionesDashboard}
                            />
                        )}
                        {opcion === 'Incidencias' && (
                            <IncidenciasContent
                                acciones={accionesIncidencias}
                            />
                        )}
                        {opcion === 'Historial' && (
                            <HistorialContent acciones={accionesHistorial} />
                        )}
                        {opcion === 'Redes' && (
                            <RedesContent
                                acciones={accionesRedes}
                                onNuevaSolicitud={() => {
                                    setRedMode('nuevo');
                                    setSelectedSolicitud(null);
                                    setShowRedModal(true);
                                }}
                            />
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
                        console.log('Perfil actualizado:', updatedUser);
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

            {/* Modal de ticket finalizado */}
            {showFinalizadoModal && (
                <Tick_Finalizado
                    isOpen={showFinalizadoModal}
                    onClose={() => setShowFinalizadoModal(false)}
                    user={selectedTicket}
                />
            )}

            {/* Modal de solicitud de red */}
            {showRedModal && (
                <Solicitud_Red
                    isOpen={showRedModal}
                    onClose={() => setShowRedModal(false)}
                    mode={redMode}
                    info={selectedSolicitud}
                />
            )}

            {showFinalizarModal && (
                <FinalizarTicket
                    isOpen={showFinalizarModal}
                    onClose={() => setShowFinalizarModal(false)}
                    user={selectedTicket}
                    onAccept={(data) => {
                        console.log('Ticket finalizado con diagnóstico:', data);
                        setShowFinalizarModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default TecnicoLayout;
