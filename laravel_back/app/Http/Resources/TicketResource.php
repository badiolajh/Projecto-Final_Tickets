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
            'empleado' => [
                'nombre_completo' => $this->empleado->nombre_completo ?? 'Desconocido',
                'puesto' => $this->empleado->puesto ?? 'No especificado',
                'extension' => $this->empleado->extension_telefono ?? 'N/A', // Mapeo correcto de la columna extension_telefono
                'area' => $this->empleado->area->nombre_area ?? 'No especificada', // Nombre del área mediante la relación anidada
            ],
            'categoria' => [
                'id' => $this->categoria->id_tipo ?? null,
                'nombre_tipo' => $this->categoria->nombre_tipo ?? 'General'
            ],
            'tecnico' => [
                'id' => $this->tecnico->id_usuario ?? null,
                'nombre_completo' => $this->tecnico->nombre_completo ?? 'No asignado',
            ],
            'estado' => [
                'id' => $this->estado->id_estado ?? null,
                'nombre_estado' => $this->estado->nombre_estado ?? 'Sin estado',
            ],
        ];
    }
}
