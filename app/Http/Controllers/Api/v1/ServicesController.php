<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\WaLinkHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\ServicesCollection;
use App\Http\Resources\ServicesResource;
use App\Models\ServiceCategory;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if ($request->has('data') && $request->data === 'all') {
                $services = Services::latest()->get();
            } elseif ($request->has('data')) {
                if ($request->data === 'Shoes') {
                    $categories = ServiceCategory::where('category_barang', 'like', '%Shoes%')->get();
                } else {
                    $categories = ServiceCategory::where('category_barang', $request->data)->get();
                }

                $serviceIds = $categories->pluck('id')->toArray();
                $services = Services::whereIn('category_id', $serviceIds)->get();

                if ($services->isEmpty()) {
                    $services = [];
                }
            } else {
                $services = Services::latest()->paginate();
            }

            return new ServicesCollection($services);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch services', 'message' => $e->getMessage()], 500);
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

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        Services::create([
            'nama_service' => $request->nama_service,
            'slug' => $request->slug,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'link_wa' => WaLinkHelper::templateService(),
            'deskripsi' => $request->deskripsi
        ]);

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

    public function getByCategoryId(int $category_id)
    {
        $model = Services::query()
            ->where(['category_id' => $category_id])
            ->get();

        return response()->json($model);
    }

    public function getById($id = null)
    {
        if (empty($id)) {
            $model = Services::latest()->first();
        } else {
            $model = Services::findOrFail($id);
        }

        return response()->json($model);
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
