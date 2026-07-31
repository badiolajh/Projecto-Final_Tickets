import { IoClose, IoCheckmark } from "react-icons/io5";
import styles from "./finalizar.module.css";
import { useState } from "react";

const FinalizarTicket = ({ isOpen, onClose, user, onAccept }) => {
  const [diagnostico, setDiagnostico] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAccept = () => {
    if (!diagnostico.trim()) {
      setError("El diagnóstico es obligatorio.");
      return;
    }
    setError("");
    if (onAccept) {
      onAccept({ ...user, diagnostico });
    }
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.title}>
          ¿Estás seguro de finalizar el ticket?
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label>Empleado:</label>
            <input
                type="text"
                value={user?.empleado?.nombre_completo || "Invitad@"}
                disabled
            />
          </div>
          <div className={styles.field}>
            <label>Tipo:</label>
            <input
                type="text"
                value={user?.categoria?.nombre_tipo || ""}
                disabled
            />
          </div>

          {/* ✅ Envoltorio para Diagnóstico */}
          <div className={styles.diagnosticoWrapper}>
            <label>Diagnóstico:</label>
            <textarea
              placeholder="Describa el incidente y cómo lo solucionó..."
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            <IoClose /> Cancelar
          </button>
          <button className={styles.accept} onClick={handleAccept}>
            <IoCheckmark /> Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalizarTicket;
