<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rol;
use Illuminate\Http\Request;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'roles' => Rol::all()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_rol' => 'required|string|max:255'
        ]);

        $rol = Rol::create($request->all());

        return response()->json([
            'message' => 'Rol creado con éxito',
            'rol' => $rol
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rol $rol)
    {
        return response()->json($rol, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rol $rol)
    {
        $request->validate([
            'nombre_rol' => 'required|string|max:255'
        ]);

        $rol->update($request->all());

        return response()->json([
            'message' => 'Rol actualizado con éxito',
            'rol' => $rol
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rol $rol)
    {
        $rol->delete();

        return response()->json([
            'message' => 'Rol eliminado con éxito'
        ], 200);
    }
}
