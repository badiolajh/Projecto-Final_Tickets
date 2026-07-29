<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EquipoRedResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id_equipos,
            'usuario' => [
                'id' => $this->usuario->id_usuario,
                'nombre' => $this->usuario->nombre_completo,
            ],
            'nombre_equipo' => $this->nombre_equipo,
            'direccion_mac' => $this->direccion_mac,
            'numero_inventario' => $this->numero_inventario,
            'fecha_registro' => $this->created_at,
        ];
    }
}
