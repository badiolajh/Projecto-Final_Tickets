<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsuarioResource;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

//FormRequest
use App\Http\Requests\StoreUsuarioRequest;
use App\Http\Requests\UpdateUsuarioRequest;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuario = Usuario::paginate(10);

        return UsuarioResource::collection($usuario);
    }

    public function store(StoreUsuarioRequest $request)
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

    public function update(UpdateUsuarioRequest $request, Usuario $usuario)
    {
        $data = $request->validated();

        if (isset($data['contrasena_hash'])) {
            $data['contrasena_hash'] = Hash::make($data['contrasena_hash']);
        }

        $usuario->update($data);

        return response()->json([
            'message' => 'Usuario actualizado',
            'usuario' => new UsuarioResource($usuario),
        ], 200);
    }

    public function updatePartial(UpdateUsuarioRequest $request, Usuario $usuario)
    {
        return $this->update($request, $usuario);
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return response()->json([
            'message' => 'Usuario eliminado',
        ], 200);
    }
}
