<?php

namespace App\Events;

use App\Models\Usuario;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UsuarioRegistrado
{
    use Dispatchable, SerializesModels;

    public $usuario;

    /**
     * Create a new event instance.
     */
    public function __construct(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }
}
