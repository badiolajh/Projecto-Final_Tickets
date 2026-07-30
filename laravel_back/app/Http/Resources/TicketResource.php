<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_ticket' => $this->id_ticket,
            'descripcion_empleado' => $this->descripcion_empleado,
            'prioridad' => $this->prioridad,
            'fecha_creacion' => $this->fecha_creacion,
            'empleado_id' => $this->empleado_id,
            'tecnico_id' => $this->tecnico_id,
            'categoria_id' => $this->categoria_id,
            'estado_id' => $this->estado_id,

            // Agregamos los campos dinámicos extraídos de las relaciones
            'nombre_empleado' => $this->empleado ? $this->empleado->nombre_completo : 'Desconocido',
            'nombre_tipo' => $this->categoria ? $this->categoria->nombre_tipo : 'General',

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
