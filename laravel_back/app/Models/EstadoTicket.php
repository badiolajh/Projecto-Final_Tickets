<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoTicket extends Model
{
    protected $table = 'estados_ticket';
    protected $primaryKey = 'id_estado';
    public $timestamps = false;

    protected $fillable = ['nombre_estado'];

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'estado_id');
    }
}
