<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\CrudHelper;
use App\Http\Controllers\Controller;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TokoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $models = Toko::latest()->paginate();

        if ($request->has('all')) {
            $models = Toko::latest()->get();
        }

        return response()->json($models);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_toko' => 'sometimes|required|unique:tokos',
            'alamat_toko' => 'sometimes|required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(), 422);
        }

        CrudHelper::save(new Toko(), $request->all());

        return response()->json(null, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $model = Toko::findOrFail($id);

        return response()->json($model);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'kode' => 'sometimes|required|unique:tokos',
            'nama_toko' => 'sometimes|required|unique:tokos',
            'alamat_toko' => 'sometimes|required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(), 422);
        }

        $model = Toko::findOrFail($id);

        CrudHelper::save(new Toko(), $request->all(), $model->id);

        return response()->json(null, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Toko::findOrFail($id);
        CrudHelper::delete(new Toko(), $model->id);

        return response()->json(null, 200);
    }
}
