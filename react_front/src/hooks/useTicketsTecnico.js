import { useState, useEffect } from "react";
import api from "../api/api";

export const useTicketsTecnico = (tecnicoId) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/tickets/tecnico/${tecnicoId}`);
        // Si el backend devuelve un Resource::collection, la data está en response.data.data
        const data = Array.isArray(response.data) ? response.data : response.data.data;
        setTickets(data || []);
      } catch (err) {
        setError("No se pudieron cargar los tickets asignados.");
      } finally {
        setLoading(false);
      }
    };

    if (tecnicoId) {
      fetchTickets();
    }
  }, [tecnicoId]);

  return { tickets, loading, error };
};
