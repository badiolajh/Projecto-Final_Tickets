<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EstadoTicket;
use App\Http\Resources\EstadoTicketResource;
use Illuminate\Http\Request;

class EstadoTicketController extends Controller
{
    public function index()
    {
        return EstadoTicketResource::collection(EstadoTicket::all());
    }

    public function show($id)
    {
        $estadoTicket = EstadoTicket::findOrFail($id);
        return new EstadoTicketResource($estadoTicket);
    }
}
