<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCekResiRequest;
use App\Http\Resources\CekResiCollection;
use App\Http\Resources\CekResiResource;
use App\Models\CekResi;
use Illuminate\Http\Request;

class CekResiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CekResiCollection(CekResi::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCekResiRequest $request)
    {
        CekResi::create($request->validated());
        return response()->json("Resi Has Been Created");
    }

    /**
     * Display the specified resource.
     */
    public function show(CekResi $cekresi)
    {
        return new CekResiResource($cekresi);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCekResiRequest $request, CekResi $cekresi)
    {
        $cekresi->update($request->validated());
        return response()->json("Resi Has Been Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CekResi $cekresi)
    {
        $cekresi->delete();
        return response()->json("Resi Has Been Deleted");
    }
}
