<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EquipoRed;
use App\Http\Resources\EquipoRedResource;
use Illuminate\Http\Request;

class EquipoRedController extends Controller
{
    public function index()
    {
        return EquipoRedResource::collection(EquipoRed::with('usuario')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|exists:usuarios,id_usuario',
            'nombre_equipo' => 'required|string|max:255',
            'direccion_mac' => 'required|string|unique:equipos_red',
            'numero_inventario' => 'required|string|unique:equipos_red',
        ]);

        $equipo = EquipoRed::create($request->all());
        return new EquipoRedResource($equipo);
    }

    public function show($id)
    {
        $equipoRed = EquipoRed::with('usuario')->findOrFail($id);
        return new EquipoRedResource($equipoRed);
    }


    public function update(Request $request, $id)
    {
        $equipoRed = EquipoRed::findOrFail($id);

        $equipoRed->update($request->all());

        return new EquipoRedResource($equipoRed->load('usuario'));
    }

    public function destroy($id)
    {
        $equipoRed = EquipoRed::findOrFail($id);

        $equipoRed->delete();

        return response()->json(null, 204);
    }
}
