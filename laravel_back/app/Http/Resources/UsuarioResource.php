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
                    'puesto' => $this->puesto,
                    'correo_electronico' => $this->correo_electronico,
                    'extension_telefono' => $this->extension_telefono,
                    'foto_url' => $this->foto_url,
                    'id_rol' => $this->id_rol,
                    'id_area' => $this->id_area,
                ];
    }
}
