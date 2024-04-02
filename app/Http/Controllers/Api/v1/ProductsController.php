<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new  ProductCollection(Products::all());
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
    public function store(StoreProductsRequest $request)
    {
        Products::create($request->validated());

        return response()->json('Success');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new ProductResource(Products::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductsRequest $request, $id)
    {
        $product = Products::findOrFail($id);
        $product->update($request->validated());

        return response()->json('Products Updated', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Products::findOrFail($id);
        $product->delete();

        return response()->json('Products Deleted');
    }
}
