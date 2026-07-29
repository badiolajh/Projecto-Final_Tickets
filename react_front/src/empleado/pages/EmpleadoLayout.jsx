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
import CrearTicketContent from '../modals/contents/CrearTicketContent';
import BtnCerrar from '../modals/buttons/BtnCerrar';
import BtnAceptar from '../modals/buttons/BtnAceptar';
import BtnCancelar from '../modals/buttons/BtnCancelar';
import styles from './EmpleadoLayout.module.css';

const EmpleadoLayout = ({ onLogout }) => {
    const [opcion, setOpcion] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);

    // Modales
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showDetalleModal, setShowDetalleModal] = useState(false);
    const [showCrearModal, setShowCrearModal] = useState(false);

    // Datos de tickets
    const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
    const [crearValido, setCrearValido] = useState(false);
    const [nuevoTicket, setNuevoTicket] = useState(null);

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
  <div className={styles.empleadoLayoutRoot}>
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
           onLogout={onLogout}
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
                    descripcion: 'Descripción de ejemplo del ticket',
                    asignado: 'Carlos',
                  });
                  setShowDetalleModal(true);
                }}
                onSolicitarTicket={() => setShowCrearModal(true)}
              />
            )}
            {opcion === 'Incidencias' && (
              <IncidenciasContent
                acciones={accionesIncidencias}
                onSolicitarTicket={() => setShowCrearModal(true)}
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

      {/* Modales */}
      {showProfileModal && (
        <ModalVerPerfil
          info={user}
          onClose={() => setShowProfileModal(false)}
          onSave={(data) => console.log('Datos guardados:', data)}
        />
      )}

      {showDetalleModal && ticketSeleccionado && (
        <ModalGeneral
          titulo="Detalle del Ticket"
          onClose={() => setShowDetalleModal(false)}
          acciones={<BtnCerrar onClick={() => setShowDetalleModal(false)} />}
        >
          <DetalleTicketContent ticket={ticketSeleccionado} />
        </ModalGeneral>
      )}

      {showCrearModal && (
        <ModalGeneral
          titulo="Solicitar Ticket"
          onClose={() => setShowCrearModal(false)}
          acciones={
            <>
              <BtnCancelar onClick={() => setShowCrearModal(false)} />
              <BtnAceptar
                onClick={() => {
                  console.log('Ticket creado:', nuevoTicket);
                  setShowCrearModal(false);
                }}
                disabled={!crearValido}
              />
            </>
          }
        >
          <CrearTicketContent
            onValidChange={(valido, data) => {
              setCrearValido(valido);
              setNuevoTicket(data);
            }}
          />
        </ModalGeneral>
      )}
    </div>
  </div>
);

};

export default EmpleadoLayout;
