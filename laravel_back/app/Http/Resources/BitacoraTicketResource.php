<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BitacoraTicketResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id_bitacora,
            'ticket' => [
                'id' => $this->ticket->id_ticket,
                'descripcion' => $this->ticket->descripcion_empleado,
            ],
            'usuario' => [
                'id' => $this->usuario->id_usuario,
                'nombre' => $this->usuario->nombre_completo,
            ],
            'descripcion_trabajo' => $this->descripcion_trabajo,
            'fecha' => $this->created_at,
        ];
    }
}
