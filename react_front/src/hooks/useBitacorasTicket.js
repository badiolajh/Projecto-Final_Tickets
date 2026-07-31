import { useState, useEffect } from "react";
import api from "../api/api";

export const useBitacorasTicket = (ticketId) => {
  const [bitacoras, setBitacoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/bitacora-tickets");
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        const filtradas = data.filter(b => Number(b.ticket?.id) === Number(ticketId));
        setBitacoras(filtradas);
      } catch (err) {
        setError("No se pudieron cargar las bitácoras.");
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchBitacoras();
    }
  }, [ticketId]);

  return { bitacoras, loading, error };
};
