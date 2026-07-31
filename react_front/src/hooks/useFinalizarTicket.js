import { useState } from "react";
import api from "../api/api";

export const useFinalizarTicket = (tecnicoId, setTickets) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const finalizarTicket = async (ticketId, descripcionTrabajo) => {
    try {
      setLoading(true);
      setError("");

      // 1️⃣ Actualizar estado del ticket
      await api.patch(`/tickets/${ticketId}/partial`, { estado_id: 3 });

      // 2️⃣ Registrar en bitácora
      await api.post("/bitacora-tickets", {
        id_ticket: ticketId,
        id_usuario: tecnicoId,
        descripcion_trabajo: descripcionTrabajo,
      });

      // 3️⃣ Actualizar tickets en memoria
      setTickets(prev =>
        prev.map(t =>
          t.id_ticket === ticketId
            ? { ...t, estado: { id: 3, nombre_estado: "Finalizado" } }
            : t
        )
      );

    } catch (err) {
      setError("No se pudo finalizar el ticket.");
    } finally {
      setLoading(false);
    }
  };

  return { finalizarTicket, loading, error };
};
