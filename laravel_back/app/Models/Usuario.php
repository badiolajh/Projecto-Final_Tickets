<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $fillable =[
    'nombre_completo',
    'puesto',
    'correo_electronico',
    'contrasena_hash',
    'extension_telefono',
    'foto_url',
    'id_rol',
    'id_area'
    ];

    protected $hidden = [
    'contrasena_hash',
    'remember_token'
    ];

    // <-- Agregamos esta relación para validar el rol del usuario -->
    public function rol()
    {
        return $this->belongsTo(Rol::class, 'id_rol', 'id_rol');
    }

        // Relación con Área
    public function area()
    {
        return $this->belongsTo(Area::class, 'id_area', 'id_area');
    }

}
