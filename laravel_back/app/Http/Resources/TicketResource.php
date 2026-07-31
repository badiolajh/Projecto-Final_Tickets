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

            // IDs esenciales para los filtros de React
            'empleado_id' => $this->empleado_id,
            'estado_id' => $this->estado_id,
            'tecnico_id' => $this->tecnico_id,

            // Mantener compatibilidad si algún componente usaba nombre_tipo plano
            'nombre_tipo' => $this->categoria->nombre_tipo ?? 'General',

            // Objeto empleado para el modal (área, extensión, puesto)
            'empleado' => [
                'id_usuario' => $this->empleado->id_usuario ?? null,
                'nombre_completo' => $this->empleado->nombre_completo ?? 'Desconocido',
                'puesto' => $this->empleado->puesto ?? 'No especificado',
                'extension' => $this->empleado->extension_telefono ?? 'N/A',
                'area' => $this->empleado->area->nombre_area ?? 'No especificada',
            ],

            // Categoría anidada
            'categoria' => [
                'id_tipo' => $this->categoria_id,
                'nombre_tipo' => $this->categoria->nombre_tipo ?? 'General'
            ],

            // Objeto técnico completo
            'tecnico' => $this->tecnico ? [
                'id_usuario' => $this->tecnico->id_usuario,
                'nombre_completo' => $this->tecnico->nombre_completo,
            ] : null,

            // Estado actual del ticket
            'estado' => [
                'id' => $this->estado->id_estado ?? null,
                'nombre_estado' => $this->estado->nombre_estado ?? 'Sin estado',
            ],
        ];
    }
}
