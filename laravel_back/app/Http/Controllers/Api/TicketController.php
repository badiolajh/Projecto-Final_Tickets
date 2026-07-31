<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// FormRequest
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;

class TicketController extends Controller
{
    // Muestra todos los tickets según el rol del usuario autenticado
    public function index(Request $request)
    {
        $usuario = $request->user(); // Usuario autenticado por Sanctum

        // Cargamos todas las relaciones necesarias incluyendo 'estado'
        $query = Ticket::with(['empleado.area', 'categoria', 'tecnico', 'estado']);

        // Si el usuario es empleado, solo ve sus propios tickets
        if ($usuario->rol->nombre_rol === 'Empleado') {
            $query->where('empleado_id', $usuario->id_usuario);
        }
        // Si es técnico, ve solo los asignados a él
        elseif ($usuario->rol->nombre_rol === 'Técnico') {
            $query->where('tecnico_id', $usuario->id_usuario);
        }
        // Si es Administrador, ve todos (sin filtro)

        $tickets = $query->get();

        return TicketResource::collection($tickets);
    }

    // Almacena un nuevo ticket
    public function store(StoreTicketRequest $request)
    {
        $ticket = Ticket::create($request->validated());

        return response()->json([
            'message' => 'Ticket creado',
            'ticket' => new TicketResource($ticket),
        ], 201);
    }

    // Ticket en específico
    public function show(Ticket $ticket)
    {
        return response()->json([
            'ticket' => new TicketResource($ticket),
        ], 200);
    }

    // Actualización completa
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return response()->json([
            'message' => 'Ticket actualizado',
            'ticket' => new TicketResource($ticket),
        ], 200);
    }

    // Actualización parcial
    public function updatePartial(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update(array_filter($request->validated(), function ($value) {
            return !is_null($value);
        }));

        return response()->json([
            'message' => 'Ticket actualizado parcialmente',
            'ticket' => new TicketResource($ticket),
        ], 200);
    }

    // Eliminar ticket
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json([
            'message' => 'Ticket eliminado',
        ], 200);
    }

    // Tickets por técnico específico
    public function ticketsPorTecnico($id)
    {
        $tickets = Ticket::with([
            'empleado.area',
            'tecnico',
            'categoria',
            'estado'
        ])
        ->where('tecnico_id', $id)
        ->get();

        return TicketResource::collection($tickets);
    }

    // Asignar ticket a un técnico (solo administrador)
    public function asignar(Request $request, Ticket $ticket)
    {
        $request->validate([
            'tecnico_id' => 'required|exists:usuarios,id_usuario',
        ]);

        if ($request->user()->rol->nombre_rol !== 'Administrador') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $ticket->update([
            'tecnico_id' => $request->tecnico_id,
            'estado_id' => 2, // Cambia automáticamente a "En proceso" o el ID que corresponda
        ]);

        return response()->json([
            'message' => 'Ticket asignado correctamente',
            'ticket' => new TicketResource($ticket),
        ]);
    }
}
