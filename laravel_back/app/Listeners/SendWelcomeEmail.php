<?php

namespace App\Listeners;

use App\Events\UsuarioRegistrado;
use Illuminate\Support\Facades\Mail;
use App\Mail\BienvenidaMail;

class SendWelcomeEmail
{
    public function handle(UsuarioRegistrado $event): void
    {
        $user = $event->usuario;
        Mail::to($user->correo_electronico)->send(new BienvenidaMail($user));
    }
}
