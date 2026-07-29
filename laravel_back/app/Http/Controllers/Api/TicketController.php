<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // Muestra todos los tickets
    public function index()
    {
        $ticket = Ticket::paginate(10);

        return TicketResource::collection($ticket);
    }

    // Almacena un nuevo ticket
    public function store(Request $request)
    {
        $data = $request->validate([
            'descripcion_empleado' => 'required|string',
            'prioridad' => 'required|string|max:50',
            'empleado_id' => 'required|integer|exists:usuarios,id_usuario',
            'tecnico_id' => 'nullable|integer|exists:usuarios,id_usuario',
            'categoria_id' => 'required|integer|exists:tipos_ticket,id_tipo',
            'estado_id' => 'required|integer|exists:estados_ticket,id_estado',
        ]);

        $ticket = Ticket::create([
            'descripcion_empleado' => $data['descripcion_empleado'],
            'prioridad' => $data['prioridad'],
            'empleado_id' => $data['empleado_id'],
            'tecnico_id' =>$data['tecnico_id'],
            'categoria_id' => $data['categoria_id'],
            'estado_id' => $data['estado_id'],
        ]);

        return response()->json([
            'message' => 'Ticket creado',
            'ticket' => new TicketResource($ticket),
        ], 201);
    }

    // Ticket en especifico
    public function show(Ticket $ticket)
    {
        return response()->json([
            'ticket' => new TicketResource($ticket),
        ], 200);
    }

    // Actualizascion completa
    public function update(Request $request, Ticket $ticket)
    {
        $data = $request->validate([
            'descripcion_empleado' => 'required|string',
            'prioridad' => 'required|string|max:50',
            'empleado_id' => 'required|integer|exists:usuarios,id_usuario',
            'tecnico_id' => 'nullable|integer|exists:usuarios,id_usuario',
            'categoria_id' => 'required|integer|exists:tipos_ticket,id_tipo',
            'estado_id' => 'required|integer|exists:estados_ticket,id_estado',
        ]);

        $ticket->update([
        'descripcion_empleado' => $data['descripcion_empleado'],
        'prioridad' => $data['prioridad'],
        'empleado_id' => $data['empleado_id'],
        'tecnico_id' =>$data['tecnico_id'],
        'categoria_id' => $data['categoria_id'],
        'estado_id' => $data['estado_id'],
        ]);

        return response()->json([
            'message' => 'Ticket actualizado',
            'ticket' => new TicketResource($ticket),
        ], 200);
    }

    // Actualizacion parcial
    public function updatePartial(Request $request, Ticket $ticket)
    {
        $data = $request->validate([
            'descripcion_empleado' => 'sometimes|required|string',
            'prioridad' => 'sometimes|required|string|max:50',
            'empleado_id' => 'sometimes|required|integer|exists:usuarios,id_usuario',
            'tecnico_id' => 'nullable|integer|exists:usuarios,id_usuario',
            'categoria_id' => 'sometimes|required|integer|exists:tipos_ticket,id_tipo',
            'estado_id' => 'sometimes|required|integer|exists:estados_ticket,id_estado',
        ]);

        $ticket->update([
            'descripcion_empleado' => $data['descripcion_empleado'],
            'prioridad' => $data['prioridad'],
            'empleado_id' => $data['empleado_id'],
            'tecnico_id' =>$data['tecnico_id'],
            'categoria_id' => $data['categoria_id'],
            'estado_id' => $data['estado_id'],
        ]);

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
}
