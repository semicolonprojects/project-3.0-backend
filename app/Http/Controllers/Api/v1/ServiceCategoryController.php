<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceCategoryResource;
use Illuminate\Http\Request;
use App\Models\ServiceCategory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'slug' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5048',
            'category_barang' => 'required|max:255',
           
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

         //upload image
         $image = $request->file('image');
         $image->storeAs('public/service', $image->hashName());
        //create post
        ServiceCategory::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'image' => $image->hashName(),
            'category_barang' => $request->category_barang,
        ]);

        //return response
        return response()->json('Success', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $serviceCategory = ServiceCategory::findOrFail($id);
        return new ServiceCategoryResource($serviceCategory);
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
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'slug' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5048',
            'category_barang' => 'required|max:255',
           
        ]);

       // Check if validation fails
       if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Check if image is uploaded
    if ($request->hasFile('image')) {
        // Upload image
        $image = $request->file('image');
        $imagePath = $image->storeAs('public/service', $image->hashName());
        $imageFileName = basename($imagePath);
        // Delete previous image if exists
        if ($serviceCategory->image) {
            Storage::delete('public/service/' . $serviceCategory->image);
        }
    } else {
        // Keep the existing image if no new image is uploaded
        $imageFileName = $serviceCategory->image;
    }
        //create post
        $serviceCategory->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'image' => $imageFileName,
            'category_barang' => $request->category_barang,
        ]);

        //return response
        return response()->json('Success', 200);
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
