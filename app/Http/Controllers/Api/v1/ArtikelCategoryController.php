<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\ArtikelCategory;
use App\Http\Requests\StoreArtikelCategoryRequest;
use App\Http\Requests\UpdateArtikelCategoryRequest;
use App\Http\Resources\ArtikelCategoryCollection;
use App\Http\Resources\ArtikelCategoryResource;

class ArtikelCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ArtikelCategoryCollection(ArtikelCategory::all());
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
    public function store(StoreArtikelCategoryRequest $request)
    {
        ArtikelCategory::create($request->validated());

        return response()->json("Success!");
    }

    /**
     * Display the specified resource.
     */
    public function show(ArtikelCategory $artikelCategory)
    {
        return new ArtikelCategoryResource($artikelCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ArtikelCategory $artikelCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtikelCategoryRequest $request, ArtikelCategory $artikelCategory)
    {
        $artikelCategory->update($request->validated());

        return response()->json('Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArtikelCategory $artikelCategory)
    {
        $artikelCategory->delete();

        return response()->json('Deleted');
    }
}
