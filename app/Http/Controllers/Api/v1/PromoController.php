<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use App\Http\Requests\StorePromoRequest;
use App\Http\Requests\UpdatePromoRequest;
use Carbon\Carbon;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promos = Promo::all();
        return response()->json(['promos' => $promos]);
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
    public function store(StorePromoRequest $request)
    {
        $validatedData = $request->validated();
        $promo = Promo::create($validatedData);
        return response()->json(['promo' => $promo], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Promo $promo)
    {
        return response()->json(['promo' => $promo]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promo $promo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromoRequest $request, Promo $promo)
    {
        $validatedData = $request->validated();
        $promo->update($validatedData);
        return response()->json(['message' => 'Promo updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promo $promo)
    {
        $promo->delete();
        return response()->json(['message' => 'Promo deleted successfully']);
    }

    public function showPromoNavbar()
    {
        $promo = Promo::latest()
            ->where('is_visible', true)
            ->first();

        if ($promo->valid_date >= date('Y-m-d')) {
            return response()->json($promo);
        }
    }
}
