import React, { useState } from 'react';
import Header from '../components/grid/Header';
import Navbar from '../components/grid/Navbar';
import MainGeneral from '../components/grid/MainGeneral';
import DashboardContent from '../components/dashboard/DashboardContent';
import IncidenciasContent from '../components/incidencias/IncidenciasContent';
import HistorialContent from '../components/historial/HistorialContent';
import ModalVerPerfil from '../modals/ModalVerPerfil';
import ModalGeneral from '../modals/ModalGeneral';
import DetalleTicketContent from '../modals/contents/DetalleTicketContent';
import BtnCerrar from '../modals/buttons/BtnCerrar';
import styles from './EmpleadoLayout.module.css';

const EmpleadoLayout = () => {
    const [opcion, setOpcion] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showDetalleModal, setShowDetalleModal] = useState(false);
    const [ticketSeleccionado, setTicketSeleccionado] = useState(null);

    const user = {
        nombre: 'Wilver Empleado',
        avatar: null,
        puesto: 'Empleado de Soporte',
        area: 'Sistemas',
        correo: 'wilver@correo.com',
        contraseña: '********',
        extension: '452',
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Acciones específicas para el rol Empleado
    const accionesIncidencias = [
        {
            tipo: 'ver',
            onClick: (fila) => {
                setTicketSeleccionado({
                    tipo: fila[1],
                    descripcion: 'Descripción de ejemplo del ticket',
                    asignado: 'Carlos',
                });
                setShowDetalleModal(true);
            },
        },
    ];

    const accionesHistorial = [
        {
            tipo: 'ver',
            onClick: (fila) => {
                setTicketSeleccionado({
                    tipo: fila[1],
                    descripcion: 'Ticket finalizado con detalles',
                    asignado: 'Andrés',
                });
                setShowDetalleModal(true);
            },
        },
    ];

    return (
        <div className={styles.layout}>
            <Header
                user={user}
                onMenuToggle={toggleMenu}
                isMenuOpen={menuOpen}
                onProfileClick={() => setShowProfileModal(true)}
            />

            <div className={styles.layoutBody}>
                <Navbar
                    onSelect={setOpcion}
                    active={opcion}
                    isVisible={menuOpen}
                    opciones={[
                        'Dashboard',
                        'Incidencias',
                        'Historial',
                        'Cerrar sesión',
                    ]}
                />

                {menuOpen && (
                    <div className={styles.overlay} onClick={closeMenu}></div>
                )}

                <div className={styles.mainContent}>
                    <MainGeneral titulo={opcion}>
                        {opcion === 'Dashboard' && (
                            <DashboardContent
                                user={user}
                                onVerTicket={(fila) => {
                                    setTicketSeleccionado({
                                        tipo: fila.tipo,
                                        descripcion:
                                            'Descripción de ejemplo del ticket',
                                        asignado: 'Carlos',
                                    });
                                    setShowDetalleModal(true);
                                }}
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
                        {opcion === 'Cerrar sesión' && (
                            <div>Cerrando sesión...</div>
                        )}
                    </MainGeneral>
                </div>
            </div>

            {/* Modal de perfil */}
            {showProfileModal && (
                <ModalVerPerfil
                    info={user}
                    onClose={() => setShowProfileModal(false)}
                    onSave={(data) => console.log('Datos guardados:', data)}
                />
            )}

            {/* Modal de detalle de ticket */}
            {showDetalleModal && ticketSeleccionado && (
                <ModalGeneral
                    titulo="Detalle del Ticket"
                    onClose={() => setShowDetalleModal(false)}
                    acciones={
                        <BtnCerrar onClick={() => setShowDetalleModal(false)} />
                    }
                >
                    <DetalleTicketContent ticket={ticketSeleccionado} />
                </ModalGeneral>
            )}
        </div>
    );
};

export default EmpleadoLayout;
