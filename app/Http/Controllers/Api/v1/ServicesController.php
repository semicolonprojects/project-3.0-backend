<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServicesRequest;
use App\Http\Resources\ServicesCollection;
use App\Http\Resources\ServicesResource;
use App\Models\Services;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ServicesCollection(Services::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServicesRequest $request)
    {
        Services::create($request->validated());
        return response()->json("Services Has Been Created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Services $service)
    {
        return new ServicesResource($service);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(StoreServicesRequest $request, Services $service)
    {
        $service->update($request->validated());
        return response()->json("Service Has Been Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Services $service)
    {
        $service->delete();
        return response()->json("Services Has Been Deleted");
    }
}
