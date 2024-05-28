<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Nomor;
use App\Http\Requests\StoreNomorRequest;
use App\Http\Requests\UpdateNomorRequest;
use Illuminate\Http\Request;

class NomorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'nomor' => 'required|string|max:255|unique:nomors',
        ]);

        $nomor = Nomor::create($validatedData);

        if ($nomor) {
            return response()->json(['message' => 'Nomor created successfully', 'data' => $nomor], 201);
        } else {
            return response()->json(['message' => 'Failed to create Nomor'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Nomor $nomor)
    {
        return response()->json(['data' => $nomor]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nomor $nomor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nomor $nomor)
    {
        $validatedData = $request->validate([
            'nomor' => 'required|string|max:255|unique:nomors,nomor,' . $nomor->id,
        ]);

        $nomor->update($validatedData);

        if ($nomor) {
            return response()->json(['message' => 'Nomor updated successfully', 'data' => $nomor]);
        } else {
            return response()->json(['message' => 'Failed to update Nomor'], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nomor $nomor)
    {
        $deleted = $nomor->delete();

        if ($deleted) {
            return response()->json(['message' => 'Nomor deleted successfully']);
        } else {
            return response()->json(['message' => 'Failed to delete Nomor'], 500);
        }
    }
}
