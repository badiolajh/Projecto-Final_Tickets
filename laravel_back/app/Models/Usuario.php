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
}
