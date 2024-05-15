<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceCategoryResource;
use Illuminate\Http\Request;
use App\Models\ServiceCategory;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ServiceCategoryResource::collection(ServiceCategory::latest()->paginate(5));
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
        $validatedData = $request->validate([
            'name' => 'required|unique:service_categories,name|max:255',
            'slug' => 'required',
        ]);

        $serviceCategory = ServiceCategory::create($validatedData);

        return new ServiceCategoryResource($serviceCategory);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, $id)
    {
        $serviceCategory = ServiceCategory::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|unique:service_categories,name,' . $id . '|max:255',
            'slug' => 'required',
        ]);

        $serviceCategory->update($validatedData);

        return new ServiceCategoryResource($serviceCategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $serviceCategory = ServiceCategory::findOrFail($id);
        
        $serviceCategory->delete();

        return response()->json(null, 204);
    }

    public function getAll()
    {
        return ServiceCategoryResource::collection(ServiceCategory::latest()->get());
    }
}
