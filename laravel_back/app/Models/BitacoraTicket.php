<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BitacoraTicket extends Model
{
    protected $table = 'bitacora_tickets';
    protected $primaryKey = 'id_bitacora';
    public $timestamps = false;

    protected $fillable = [
        'id_ticket',
        'id_usuario',
        'descripcion_trabajo'
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'id_ticket');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
