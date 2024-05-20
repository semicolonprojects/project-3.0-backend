<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServicesRequest;
use App\Http\Resources\ServicesCollection;
use App\Http\Resources\ServicesResource;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ServicesCollection(Services::latest()->paginate(5));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:255',
            'nama_service' => 'required|string|unique:products,slug|max:100',
            'category_id' => 'required|exists:service_categories,id',
            'price' => 'required|numeric|min:0',
            'link_wa' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/service', $image->hashName());

        //create post
        Services::create([
            'nama_service' => $request->nama_service,
            'slug' => $request->slug,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'link_wa' => $request->link_wa,
            'image' => $image->hashName(),
        ]);

        //return response
        return response()->json('Success', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Services $slug)
    {
        return new ServicesResource($slug);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $service = Services::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:255',
            'nama_service' => 'required|string|unique:products,slug|max:100',
            'category_id' => 'required|exists:service_categories,id',            
            'price' => 'required|numeric|min:0',
            'link_wa' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

         //check if validation fails
         if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->hasFile('image')) {
            // Upload image
            $image = $request->file('image');
            $imagePath = $image->storeAs('public/service', $image->hashName());
            $imageFileName = basename($imagePath);
            // Delete previous image if exists
            if ($service->image) {
                Storage::delete('public/service/' . $service->image);
            }
        } else {
            // Keep the existing image if no new image is uploaded
            $imageFileName = $service->image;
        }

        $service->update([
            'nama_service' => $request->nama_service,
            'slug' => $request->slug,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'link_wa' => $request->link_wa,
            'image' => $imageFileName,
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Services $slug)
    {
        $slug->delete();
        return response()->json("Services Has Been Deleted");
    }
}
