<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipoRed extends Model
{
    protected $table = 'equipos_red';
    protected $primaryKey = 'id_equipos';
    public $timestamps = false;

    protected $fillable = [
        'id_usuario',
        'nombre_equipo',
        'direccion_mac',
        'numero_inventario'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
