<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//FormRequest
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;

class TicketController extends Controller
{
    // Muestra todos los tickets
    public function index()
    {
        // Cargamos el ticket con su empleado, el área del empleado y la categoría/tipo
            $tickets = Ticket::with(['empleado.area', 'categoria', 'tecnico'])->get();

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

    // Ticket en especifico
    public function show(Ticket $ticket)
    {
        return response()->json([
            'ticket' => new TicketResource($ticket),
        ], 200);
    }

    // Actualizascion completa
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return response()->json([
            'message' => 'Ticket actualizado',
            'ticket' => new TicketResource($ticket),
        ], 200);
    }

    // Actualizacion parcial
    public function updatePartial(UpdateTicketRequest $request, Ticket $ticket)
    {
        // Al usar 'sometimes' en el FormRequest, podemos actualizar solo los campos enviados
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
}
