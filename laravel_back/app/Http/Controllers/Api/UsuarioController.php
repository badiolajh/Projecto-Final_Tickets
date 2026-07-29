<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsuarioResource;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuario = Usuario::paginate(10);

        return UsuarioResource::collection($usuario);
    }

    public function store(Request $request)
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

        return response()->json([
            'message' => 'Usuario creado',
            'usuario' => new UsuarioResource($usuario),
        ], 201);
    }

    public function show(Usuario $usuario)
    {
        return response()->json([
            'usuario' => new UsuarioResource($usuario),
        ], 200);
    }

    public function update(Request $request, Usuario $usuario)
    {
        $data = $request->validate([
            'nombre_completo' => 'required|string|max:255',
            'puesto' => 'required|string|max:255',
            'correo_electronico' => ['required', 'email', Rule::unique('usuarios', 'correo_electronico')->ignore($usuario->id_usuario, 'id_usuario')],
            'contrasena_hash' => 'required|string|min:8',
            'extension_telefono' => 'nullable|string|max:4',
            'foto_url' => 'nullable|string|max:255',
            'id_rol' => 'required|integer|exists:rol,id_rol',
            'id_area' => 'required|integer|exists:areas,id_area',
        ]);

        $usuario->update([
            'nombre_completo' => $data['nombre_completo'],
            'puesto' => $data['puesto'],
            'correo_electronico' => $data['correo_electronico'],
            'contrasena_hash' => Hash::make($data['contrasena_hash']),
            'extension_telefono' => $data['extension_telefono'],
            'foto_url' => $data['foto_url'],
            'id_rol' => $data['id_rol'],
            'id_area' => $data['id_area'],
        ]);

        return response()->json([
            'message' => 'Usuario actualizado',
            'usuario' => new UsuarioResource($usuario),
        ], 200);
    }

    public function updatePartial(Request $request, Usuario $usuario)
    {
        $data = $request->validate([
            'nombre_completo' => 'sometimes|required|string|max:255',
            'puesto' => 'sometimes|required|string|max:255',
            'correo_electronico' => ['sometimes', 'required', 'email', Rule::unique('usuarios', 'correo_electronico')->ignore($usuario->id_usuario, 'id_usuario')],
            'contrasena_hash' => 'sometimes|required|string|min:8',
            'extension_telefono' => 'nullable|string|max:4',
            'foto_url' => 'nullable|string|max:255',
            'id_rol' => 'sometimes|required|integer|exists:rol,id_rol',
            'id_area' => 'sometimes|required|integer|exists:areas,id_area',
        ]);

        if (isset($data['contrasena_hash'])) {
            $data['contrasena_hash'] = Hash::make($data['contrasena_hash']);
        }

        $usuario->update($data);

        return response()->json([
            'message' => 'Usuario actualizado parcialmente',
            'usuario' => new UsuarioResource($usuario),
        ], 200);
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return response()->json([
            'message' => 'Usuario eliminado',
        ], 200);
    }
}
