<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Artikel;
use App\Http\Requests\StoreArtikelRequest;
use App\Http\Requests\UpdateArtikelRequest;
use App\Http\Resources\ArtikelCollection;
use App\Http\Resources\ArtikelResource;
use Database\Factories\ArtikelFactory;

class ArtikelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new  ArtikelCollection(Artikel::all());
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
    public function store(StoreArtikelRequest $request)
    {
        $validate = Artikel::create($request->validated());

        return response()->json("Success!");
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new ArtikelResource(Artikel::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artikel $artikel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtikelRequest $request, Artikel $artikel)
    {
        $artikel->update($request->validated());

        return response()->json('Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artikel $artikel)
    {
        $artikel->delete();

        return response()->json('Deleted');
    }
}
