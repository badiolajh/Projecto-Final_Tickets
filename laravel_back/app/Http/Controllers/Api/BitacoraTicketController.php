<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BitacoraTicket;
use App\Http\Resources\BitacoraTicketResource;
use Illuminate\Http\Request;

class BitacoraTicketController extends Controller
{
    public function index()
    {
        return BitacoraTicketResource::collection(BitacoraTicket::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_ticket' => 'required|exists:tickets,id_ticket',
            'id_usuario' => 'required|exists:usuarios,id_usuario',
            'descripcion_trabajo' => 'required|string',
        ]);

        $bitacora = BitacoraTicket::create($request->all());
        return new BitacoraTicketResource($bitacora);
    }

    public function show(BitacoraTicket $bitacoraTicket)
    {
        return new BitacoraTicketResource($bitacoraTicket);
    }
}
