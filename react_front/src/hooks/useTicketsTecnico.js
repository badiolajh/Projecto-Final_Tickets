import { useState, useEffect } from "react";
import api from "../api/api";

export const useTicketsTecnico = (idUsuario) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerTickets = async () => {
            try {
                const token = localStorage.getItem('token');

                // Usamos 'api' en lugar de 'axios'
                const response = await api.get('/tickets', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const todosLosTickets = response.data.data || response.data || [];

                const ticketsFiltrados = todosLosTickets.filter(ticket =>
                    Number(ticket.tecnico_id) === Number(idUsuario) ||
                    Number(ticket.tecnico?.id_usuario) === Number(idUsuario)
                );

                setTickets(ticketsFiltrados);
            } catch (err) {
                console.error('Error al obtener tickets:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (idUsuario) {
            obtenerTickets();
        }
    }, [idUsuario]);

  return { tickets, setTickets, loading, error };
};
