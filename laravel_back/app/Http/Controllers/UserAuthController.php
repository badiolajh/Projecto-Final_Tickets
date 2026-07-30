<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UsuarioResource;

class UserAuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        $data = $request->validate([
        'nombre_completo' => 'required|string|max:255',
        'puesto' => 'required|string|max:255',
        'correo_electronico' => 'required|email|unique:usuarios,correo_electronico',
        'contrasena_hash' => 'required|string|min:8',
        'extension_telefono' => 'nullable|string|max:4',
        'foto_url' => 'nullable|string|max:255',
        'id_rol' => 'required|integer|exists:rol,id_rol',
        'id_area' => 'required|integer|exists:areas,id_area',
        ]);

        $usuario = Usuario::create([
            'nombre_completo' => $data['nombre_completo'],
            'puesto' => $data['puesto'],
            'correo_electronico' => $data['correo_electronico'],
            'contrasena_hash' => Hash::make($data['contrasena_hash']),
            'extension_telefono' => $data['extension_telefono'],
            'foto_url' => $data['foto_url'],
            'id_rol' => $data['id_rol'],
            'id_area' => $data['id_area'],
        ]);

        $token = $usuario->createToken('token-api')->plainTextToken;

        return response()->json([
            'message' => 'Registro exitoso',
            'usuario' => new UsuarioResource($usuario),
            'token' => $token,
        ], 201);
    }

    // Login de usuario
    public function login(Request $request)
    {
        $data = $request->validate([
            'correo_electronico' => 'required|email',
            'contrasena_hash' => 'required|string|min:8',
        ]);

        $usuario = Usuario::where('correo_electronico', $data['correo_electronico'])->first();

        if (! $usuario || ! Hash::check($data['contrasena_hash'], $usuario->contrasena_hash)) {
            throw ValidationException::withMessages([
                'correo_electronico' => ['Credenciales incorrectas.'],
            ]);
        }

        $token = $usuario->createToken('token-api')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'usuario' => new UsuarioResource($usuario),
            'token' => $token,
        ], 200);
    }

    // Logout de usuario
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada',
        ], 200);
    }
}
