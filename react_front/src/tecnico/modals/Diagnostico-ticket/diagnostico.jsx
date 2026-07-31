import { IoClose } from 'react-icons/io5';
import './diagnostico.module.css';
import { useBitacorasTicket } from '../../../hooks/useBitacorasTicket';

const Diagnostico = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    // Hook que consulta las bitácoras del ticket
    const { bitacoras, loading, error } = useBitacorasTicket(user?.id_ticket);

    // Concatenamos todos los diagnósticos en un solo string
    const diagnosticosTexto =
        bitacoras.length > 0
            ? bitacoras
                  .map(
                      (b) =>
                          `(${b.usuario?.nombre || 'Técnico'} - ${new Date(b.fecha).toLocaleString()}) ${b.descripcion_trabajo}`
                  )
                  .join('\n\n')
            : 'No hay diagnósticos registrados para este ticket.';

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="section-title-superior">
                    Ticket de{' '}
                    <span>{user?.empleado?.nombre_completo || 'Invitad@'}</span>
                </div>

                <div className="section-title">Descripción</div>
                <div className="tarjeta-cuerpo-formulario">
                    <div className="form-row">
                        <label>Área:</label>
                        <input
                            type="text"
                            value={user?.empleado?.area || 'No especificada'}
                            disabled
                        />
                    </div>
                    <div className="form-row">
                        <label>Puesto:</label>
                        <input
                            type="text"
                            value={user?.empleado?.puesto || 'No especificado'}
                            disabled
                        />
                    </div>
                    <div className="form-row">
                        <label>Num.ext:</label>
                        <input
                            type="text"
                            value={user?.empleado?.extension || 'N/A'}
                            disabled
                        />
                    </div>

                    <div className="form-row">
                        <label>Diagnóstico:</label>
                    </div>
                    <div className="form-row-columna">
                        <textarea
                            disabled
                            rows="6"
                            value={
                                loading
                                    ? 'Cargando diagnósticos...'
                                    : diagnosticosTexto
                            }
                        />
                        {error && <span style={{ color: 'red' }}>{error}</span>}
                    </div>
                </div>

                <div className="modal-actions-finalizado">
                    <label className="etiqueta-asignar">Asignado a:</label>
                </div>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>
                        <IoClose /> Cerrar
                    </button>
                    <div className="asignar-container">
                        <input
                            type="text"
                            className="input-asignado"
                            value={
                                user?.tecnico?.nombre_completo || 'Sin técnico'
                            }
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Diagnostico;
