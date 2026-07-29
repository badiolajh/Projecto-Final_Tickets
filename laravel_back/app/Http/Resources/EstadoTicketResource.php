<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EstadoTicketResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id_estado,
            'nombre' => $this->nombre_estado,
        ];
    }
}
