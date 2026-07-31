import { useState, useEffect } from 'react';
import api from '../api/api';

export const useTicketsTecnico = (idUsuario) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerTickets = async () => {
            try {
                const response = await api.get(`/tickets/tecnico/${idUsuario}`);

                // El backend devuelve un Resource::collection
                const data = Array.isArray(response.data)
                    ? response.data
                    : response.data.data;

                setTickets(data || []);
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
