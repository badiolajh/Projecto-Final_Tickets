<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'tickets';
    protected $primaryKey = 'id_ticket';

    protected $fillable = [
        'descripcion_empleado',
        'prioridad',
        'fecha_creacion',
        'empleado_id',
        'tecnico_id',
        'categoria_id',
        'estado_id',
    ];

    public function empleado()
    {
        return $this->belongsTo(Usuario::class, 'empleado_id', 'id_usuario');
    }

    public function tecnico()
    {
        return $this->belongsTo(Usuario::class, 'tecnico_id', 'id_usuario');
    }
}
