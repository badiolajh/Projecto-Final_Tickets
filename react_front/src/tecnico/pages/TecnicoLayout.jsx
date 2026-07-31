import React, { useState } from 'react';
import Header from '../components/grid/Header';
import Navbar from '../components/grid/Navbar';
import MainGeneral from '../components/grid/MainGeneral';
import DashboardContent from '../components/dashboard/DashboardContent';
import styles from './TecnicoLayout.module.css';
import RedesContent from '../components/redes/RedesContent';
import HistorialContent from '../components/historial/HistorialContent';
import IncidenciasContent from '../components/incidencias/IncidenciasContent';
import ModalVerPerfil from '../modals/Ver-perfil/ModalVerPerfil';
import Tick_Pendiente from '../modals/Ver-ticket-pendiente/Ver-pendiente';
import Tick_Finalizado from '../modals/Ver-ticket-finalizado/Ver-finalizado';
import Solicitud_Red from '../modals/Ver-solicitud-red/Ver_red';
import FinalizarTicket from '../modals/Finalizar-ticket/finalizar';
import Diagnostico from '../modals/Diagnostico-ticket/diagnostico';
import api from '../../api/api';

const TecnicoLayout = ({ usuario, onLogout }) => {
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
    const [showDiagnosticoModal, setShowDiagnosticoModal] = useState(false);

    const [user, setUser] = useState({
        // nombre: 'Jonathan',
        // puesto: 'Técnico',
        // area: 'Soporte',
        // correo: 'jonathan@correo.com',
        // contraseña: '********',
        // extension: '123',
        // avatar: null,
        nombre: usuario.nombre_completo,
        avatar: usuario.foto_url,
        puesto: usuario.puesto,
        correo: usuario.correo_electronico,
        contraseña: '********',
        extension: usuario.extension_telefono,
        area: usuario.id_area,
    });

    // const user = {
    //     nombre: usuario.nombre_completo,
    //     avatar: usuario.foto_url,
    //     puesto: usuario.puesto,
    //     correo: usuario.correo_electronico,
    //     contraseña: '********',
    //     extension: usuario.extension_telefono,
    //     area: usuario.puesto,
    // };

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
            onClick: (fila) => {
                setSelectedTicket({ username: fila[0], tipo: fila[1] });
                setShowDiagnosticoModal(true);
            },
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
        <div className={styles.tecnicoLayoutRoot}>
            <div className={styles.layout}>
                <Header
                    user={user}
                    onMenuToggle={toggleMenu}
                    isMenuOpen={menuOpen}
                    onProfileClick={() => setShowPerfilModal(true)}
                />

                <div className={styles.layoutBody}>
                    <Navbar
                        onSelect={setOpcion}
                        active={opcion}
                        isVisible={menuOpen}
                        onLogout={onLogout}
                    />

                    {menuOpen && (
                        <div
                            className={styles.overlay}
                            onClick={closeMenu}
                        ></div>
                    )}

                    <div className={styles.mainContent}>
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
                                <HistorialContent
                                    acciones={accionesHistorial}
                                />
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

                {/* Modales */}
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

                {showPendienteModal && (
                    <Tick_Pendiente
                        isOpen={showPendienteModal}
                        onClose={() => setShowPendienteModal(false)}
                        user={selectedTicket}
                    />
                )}

                {showFinalizadoModal && (
                    <Tick_Finalizado
                        isOpen={showFinalizadoModal}
                        onClose={() => setShowFinalizadoModal(false)}
                        user={selectedTicket}
                    />
                )}

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
                            console.log(
                                'Ticket finalizado con diagnóstico:',
                                data
                            );
                            setShowFinalizarModal(false);
                        }}
                    />
                )}

                {showDiagnosticoModal && (
                    <Diagnostico
                        isOpen={showDiagnosticoModal}
                        onClose={() => setShowDiagnosticoModal(false)}
                        user={selectedTicket}
                    />
                )}
            </div>
        </div>
    );
};

export default TecnicoLayout;
