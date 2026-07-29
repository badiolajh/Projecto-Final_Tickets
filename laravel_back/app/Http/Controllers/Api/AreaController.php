<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Http\Resources\AreaResource;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index()
    {
        return AreaResource::collection(Area::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre_area' => 'required|string|max:255',
        ]);

        $area = Area::create($request->all());
        return new AreaResource($area);
    }

    public function show(Area $area)
    {
        return new AreaResource($area);
    }

    public function update(Request $request, Area $area)
    {
        $area->update($request->all());
        return new AreaResource($area);
    }

    public function destroy(Area $area)
    {
        $area->delete();
        return response()->json(null, 204);
    }
}
