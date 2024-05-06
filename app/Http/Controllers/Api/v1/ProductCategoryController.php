<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductCategoryResource::collection(ProductCategory::latest()->paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:product_categories,name|max:255',
        ]);

        $productCategory = ProductCategory::create($validatedData);

        return new ProductCategoryResource($productCategory);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $productCategory = ProductCategory::findOrFail($id);

        return new ProductCategoryResource($productCategory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $productCategory = ProductCategory::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|unique:product_categories,name,' . $id . '|max:255',
        ]);

        $productCategory->update($validatedData);

        return new ProductCategoryResource($productCategory);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productCategory = ProductCategory::findOrFail($id);

        $productCategory->delete();

        return response()->json(null, 204);
    }

    public function getAll()
    {
        return ProductCategoryResource::collection(ProductCategory::latest()->get());
    }
}
