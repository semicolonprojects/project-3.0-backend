<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new  ProductCollection(Products::paginate(10));
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

        // $image = $request->file('image');
        // $extension = $image->getClientOriginalExtension();
        // $filename = $image->hashName() . '.' . $extension;
        // Storage::disk('public/product')->put($filename, file_get_contents($image));
        // $image->storeAs('public/product', $filename);

        // Products::create($request->validated());
        // return response()->json('Success');

        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug|max:100',
            'category' => 'required|string|max:30',
            'price' => 'required|numeric|min:0',
            'whatsapp_link' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/posts', $image->hashName());

        //create post
        $post = Products::create([
            'product_name' => $request->product_name,
            'slug' => $request->slug,
            'category' => $request->category,
            'price' => $request->price,
            'whatsapp_link' => $request->whatsapp_link,
            'image' => $image->hashName(),
        ]);

        //return response
        return response()->json('Success', 200);
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
