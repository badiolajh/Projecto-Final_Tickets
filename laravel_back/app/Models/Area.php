<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{

    protected $table = 'areas';
    protected $primaryKey = 'id_area';
    public $timestamps = false;

    protected $fillable = ['nombre_area'];

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'id_area');
    }
}
