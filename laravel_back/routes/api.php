<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//De usuario
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\Api\UsuarioController;

//De ticket
use App\Http\Resources\TicketResource;
use App\Http\Controllers\Api\TicketController;

//De tipos_ticket
use App\Http\Controllers\Api\TipoTicketController;

//De rol
use App\Http\Controllers\Api\RolController;

/**
 * aqui lo nuevo
 */
use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\EstadoTicketController;
use App\Http\Controllers\Api\EquipoRedController;
use App\Http\Controllers\Api\BitacoraTicketController;


//Rutas para recuperar contraseña
Route::post('/forgot-password', [UserAuthController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [UserAuthController::class, 'resetPassword']);

// Sirve para la tabla de usuarios
Route::post('/register',[UserAuthController::class,'register']);
Route::post('/login', [UserAuthController::class,'login']);

// Ruta de áreas pública para que aparezca en el Registro
Route::apiResource('areas', AreaController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function()
{
    Route::get('/logout',[UserAuthController::class,'logout']);

    Route::get('/usuarios',[UsuarioController::class, 'index']);
    Route::get('/usuarios/{usuario}', [UsuarioController::class, 'show']);
    Route::post('/usuarios',[UsuarioController::class, 'store']);
    Route::put('/usuarios/{usuario}', [UsuarioController::class, 'update']);
    Route::patch('/usuarios/{usuario}', [UsuarioController::class, 'updatePartial']);
    Route::delete('/usuarios/{usuario}', [UsuarioController::class, 'destroy']);
});

//Rutas de tabla Ticket
Route::middleware('auth:sanctum')->group(function()
{
    Route::apiResource('tickets', TicketController::class);
    Route::patch('tickets/{ticket}/partial',[TicketController::class, 'updatePartial']);
});

// Rutas de tabla tipos_ticket
Route::middleware('auth:sanctum')->group(function()
{
    Route::apiResource('tipos-ticket', TipoTicketController::class);
});

// Rutas de tabla rol
Route::middleware('auth:sanctum')->group(function()
{
    //no agregar nuevos roles
    Route::apiResource('roles', RolController::class);
});

// Rutas nuevas
Route::middleware('auth:sanctum')->group(function()
{

    Route::apiResource('estados-ticket', EstadoTicketController::class)
        ->only(['index','show']);

    Route::apiResource('equipos-red', EquipoRedController::class);

    Route::apiResource('bitacora-tickets', BitacoraTicketController::class)
        ->only(['index','store','show']);

    Route::get('/tickets/tecnico/{id}', [TicketController::class, 'ticketsPorTecnico']);
});

// asignar ticket a un técnico (solo admin)
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tickets', TicketController::class);
    Route::patch('tickets/{ticket}/partial', [TicketController::class, 'updatePartial']);

    // Nueva ruta para asignar técnico
    Route::post('tickets/{ticket}/asignar', [TicketController::class, 'asignar']);
});
