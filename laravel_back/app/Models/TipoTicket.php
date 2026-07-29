<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoTicket extends Model
{
    use HasFactory;

    protected $table = 'tipos_ticket';

    protected $primaryKey = 'id_tipo';

    protected $fillable = [
        'nombre_tipo',
    ];

     public function tickets()
     {
         return $this->hasMany(Ticket::class, 'categoria_id', 'id_tipo');
     }
}
