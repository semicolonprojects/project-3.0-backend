<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\WaLinkHelper as HelpersWaLinkHelper;
use App\Helpers\WaLinkHelper\WaLinkHelper;
use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Nomor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->has('all');

        if ($all) {
            return new ProductCollection(Products::orderBy('created_at', 'asc')->get());
        } elseif ($request->has('data')) {
            return new ProductCollection(Products::orderBy('created_at', 'asc')->where('category', $request->data)->get());
        } else {
            return new  ProductCollection(Products::latest()->paginate());
        }
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
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|unique:products,product_name|string|max:255',
            'slug' => 'required|string|unique:products,slug|max:100',
            'category' => 'required|string|max:30',
            'price' => 'required|numeric|min:0',
            'whatsapp_link' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());

        //create post
        Products::create([
            'product_name' => $request->product_name,
            'slug' => $request->slug,
            'category' => $request->category,
            'price' => $request->price,
            'whatsapp_link' => HelpersWaLinkHelper::orderProduct($request->template_message),
            'description' => $request->description,
            'image' => $image->hashName(),
        ]);

        //return response
        return response()->json('Success', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $product = Products::where('slug', $slug)->firstOrFail();

        return new ProductResource($product);
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
    public function update(Request $request, $id)
    {
        $product = Products::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'slug' => 'required|string|max:100|unique:products,slug,' . $id,
            'category' => 'required|string|max:30',
            'price' => 'required|numeric|min:0',
            'whatsapp_link' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->hasFile('image')) {
            // Upload image
            $image = $request->file('image');
            $imagePath = $image->storeAs('public/products', $image->hashName());
            $imageFileName = basename($imagePath);
            if ($product->image) {
                Storage::delete('public/products/' . $product->image);
            }
        } else {
            $imageFileName = $product->image;
        }

        $product->update([
            'product_name' => $request->product_name,
            'slug' => $request->slug,
            'category' => $request->category,
            'price' => $request->price,
            'whatsapp_link' => HelpersWaLinkHelper::orderProduct($request->template_message),
            'description' => $request->description,
            'image' => $imageFileName,
        ]);

        return response()->json('Product updated successfully', 200);
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
