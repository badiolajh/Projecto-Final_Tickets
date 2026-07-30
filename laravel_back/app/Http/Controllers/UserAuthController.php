<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UsuarioResource;

//FormRequest para validar los datos
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

//FormRequest para recuperar constraseña
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;

class UserAuthController extends Controller
{
    // Registro de usuario
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $usuario = Usuario::create([
            'nombre_completo' => $data['nombre_completo'],
            'puesto' => $data['puesto'],
            'correo_electronico' => $data['correo_electronico'],
            'contrasena_hash' => Hash::make($data['contrasena_hash']),
            'extension_telefono' => $data['extension_telefono'] ?? null,
            'foto_url' => $data['foto_url'] ?? null,
            'id_rol' => $data['id_rol'],
            'id_area' => $data['id_area'],
        ]);

        //Eventro de registro
        event(new \App\Events\UsuarioRegistrado($usuario));

        $token = $usuario->createToken('token-api')->plainTextToken;

        return response()->json([
            'message' => 'Registro exitoso',
            'usuario' => new UsuarioResource($usuario),
            'token' => $token,
        ], 201);
    }

    // Login de usuario
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

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

    // Solicitar token de recuperación
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $data = $request->validated();
        $token = Str::random(64);

        // Guardar el token en la tabla que Laravel trae por defecto
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $data['correo_electronico']],
            ['token' => $token, 'created_at' => now()]
        );

        return response()->json([
            'message' => 'Se ha enviado un enlace/token de recuperación a tu correo.'
        ], 200);
    }

    // Restablecer la contraseña
    public function resetPassword(ResetPasswordRequest $request)
    {
        $data = $request->validated();

        // Verificar que el token sea válido y coincida con el correo
        $resetRequest = DB::table('password_reset_tokens')
            ->where('email', $data['correo_electronico'])
            ->where('token', $data['token'])
            ->first();

        if (!$resetRequest) {
            throw ValidationException::withMessages([
                'token' => ['El token de recuperación es inválido o ha expirado.'],
            ]);
        }

        // Actualizar la contraseña
        $usuario = Usuario::where('correo_electronico', $data['correo_electronico'])->first();
        $usuario->update([
            'contrasena_hash' => Hash::make($data['contrasena_hash'])
        ]);

        // Eliminar el token usado
        DB::table('password_reset_tokens')->where('email', $data['correo_electronico'])->delete();

        return response()->json([
            'message' => 'Contraseña restablecida correctamente.'
        ], 200);
    }
}
