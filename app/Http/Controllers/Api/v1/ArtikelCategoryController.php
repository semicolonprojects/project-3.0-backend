<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\ArtikelCategory;
use App\Http\Requests\StoreArtikelCategoryRequest;
use App\Http\Requests\UpdateArtikelCategoryRequest;

class ArtikelCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json('Artikel Category Controller');
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ArtikelCategory $artikelCategory)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArtikelCategory $artikelCategory)
    {
        //
    }
}
