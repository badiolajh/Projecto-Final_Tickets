<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_usuario' => $this->id_usuario,
            'nombre_completo' => $this->nombre_completo,
            'nombre' => $this->nombre_completo,
            'correo_electronico' => $this->correo_electronico,
            'puesto' => $this->puesto,
            'extension_telefono' => $this->extension_telefono,
            'foto_url' => $this->foto_url,
            'id_rol' => $this->id_rol,
            'rol_id' => $this->id_rol,
            'id_area' => $this->id_area,
            'rol' => $this->whenLoaded('rol', function () {
                return [
                    'id' => $this->rol->id,
                    'nombre_rol' => $this->rol->nombre_rol,
                ];
            }),
            'area' => $this->whenLoaded('area', function () {
                return [
                    'id' => $this->area->id,
                    'nombre_area' => $this->area->nombre_area,
                ];
            }),
        ];
    }
}
