<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\WaLinkHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServicesRequest;
use App\Http\Resources\ServicesCollection;
use App\Http\Resources\ServicesResource;
use App\Models\ServiceCategory;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->data === 'all') {
            return new ServicesCollection(Services::latest()->get());
        } else if ($request->data) {
            $category = ServiceCategory::where('category_barang', $request->data)->first();
            $service = Services::where('category_id', $category->id)->get();

            return new ServicesCollection($service);
        } else {
            return new ServicesCollection(Services::latest()->paginate());
        }
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
            'deskripsi' => 'required|string'

        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }



        //create post
        Services::create([
            'nama_service' => $request->nama_service,
            'slug' => $request->slug,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'link_wa' => WaLinkHelper::templateService(),
            'deskripsi' => $request->deskripsi
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
            'deskripsi' => 'required|string'

        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $service->update([
            'nama_service' => $request->nama_service,
            'slug' => $request->slug,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'link_wa' => WaLinkHelper::templateService(),
            'deskripsi' => $request->deskripsi,
        ]);

        return response()->json('Sukses Update');
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
