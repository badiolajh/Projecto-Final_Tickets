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
                 'nombre_tipo' => $this->categoria->nombre_tipo ?? 'General'
             ],
             'tecnico_id' => $this->tecnico_id,
         ];
     }
}
