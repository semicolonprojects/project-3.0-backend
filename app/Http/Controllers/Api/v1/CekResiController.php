<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\GenerateResi;
use App\Helpers\CrudHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\CekResiCollection;
use App\Models\CekResi;
use App\Models\File;
use App\Models\ResiService;
use App\Models\ResiTemp;
use App\Models\Services;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CekResiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CekResiCollection(CekResi::latest()->paginate(5));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $model = CekResi::query()->where('kode_resi', $request->kode_resi)->first();

        $validator = Validator::make($request->all(), [
            'kode_resi' => 'required|sometimes',
            'nama_pelanggan' => 'required|sometimes',
            'status_pengerjaan' => 'required|sometimes',
            'pengirim' => 'nullable|string',
            'penerima' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,png,jpeg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $namaItemData = null;
        if ($request->has('data')) {
            $namaItemData = json_decode($request->data, true);

            foreach ($namaItemData as &$item) {
                if (isset($item['service_id']) && is_array($item['service_id'])) {

                    foreach ($item['service_id'] as &$service) {
                        $id = $service['id'];

                        $serviceModel = Services::findOrFail($id);

                        $service['price'] = $serviceModel->price;
                        $service['nama_service'] = $serviceModel->nama_service;
                        $service['category'] = $serviceModel->category->name;
                    }
                }
            }
        }

        $cekResiData = [
            'kode_resi' => $request->kode_resi ?? $model->kode_resi,
            'nama_pelanggan' => $request->nama_pelanggan ?? $model->nama_pelanggan,
            'status_pengerjaan' => $request->status_pengerjaan ?? $model->status_pengerjaan,
            'pengirim' => $request->pengirim ?? $model->pengirim,
            'penerima' => $request->penerima ?? $model->penerima,
            'nama_item' => $namaItemData,
        ];

        $cekResi = CrudHelper::save(new CekResi(), $cekResiData, $model->id ?? null);

        if ($request->hasFile('images')) {
            $files = [];

            foreach ($request->file('images') as $image) {
                $name = $image->hashName();
                $image->storeAs('public/cek_resi', $name);

                $files[] = [
                    'name' => $name,
                    'parent_id' => $cekResi->id,
                    'parent_table' => (new CekResi())->getTable(),
                ];
            }

            File::insert($files);
        }

        return response()->json(null, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($kode_resi)
    {
        $model = CekResi::where('kode_resi', $kode_resi)->firstOrFail();

        $files = File::where('parent_id', $model->id)
            ->where('parent_table', $model->getTable())
            ->get();

        $cekResi = CekResi::where('kode_resi', $kode_resi)->get();
        $resiTemp = ResiTemp::where('kode_resi', $kode_resi)->get();

        $merged = $cekResi->merge($resiTemp);

        $result = [];

        foreach ($merged as $item) {
            $resiCode = $item->kode_resi;
            $createdAt = Carbon::parse($item->created_at);

            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $createdAt) {
                $result[$resiCode] = [
                    'kode_resi' => $resiCode,
                    'nama_pelanggan' => $item->nama_pelanggan,
                    'status_pengerjaan' => $item->status_pengerjaan,
                    'service_id' => $item->id,
                    'pengirim' => $item->pengirim,
                    'penerima' => $item->penerima,
                    'tanggal' => $createdAt->format('Y-m-d H:i:s'),
                    'images' => $files
                ];
            }
        }

        return response()->json(array_values($result));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kode_resi)
    {
        $cekResi = CekResi::where('kode_resi', $kode_resi)->first();

        if (!$cekResi) {
            return response()->json(['error' => 'CekResi not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'kode_resi' => 'sometimes|required',
            'nama_pelanggan' => 'sometimes|required',
            'status_pengerjaan' => 'sometimes|required',
            'service_id' => 'sometimes|required|exists:services,id',
            'pengirim' => 'nullable',
            'penerima' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(), 422);
        }

        if ($request->status_pengerjaan !== 'Selesai') {
            ResiTemp::create([
                'kode_resi' => $request->kode_resi,
                'nama_pelanggan' => $request->nama_pelanggan,
                'status_pengerjaan' => $request->status_pengerjaan,
                'service_id' => $request->service_id,
                'pengirim' => $request->pengirim,
                'penerima' => $request->penerima,
            ]);
        } else {
            ResiTemp::where('kode_resi', $kode_resi)->delete();

            $cekResi->update($request->only([
                'kode_resi',
                'nama_pelanggan',
                'status_pengerjaan',
                'service_id',
                'pengirim',
                'penerima',
            ]));
        }

        if ($request->hasFile('images')) {
            File::where('parent_id', $cekResi->id)
                ->where('parent_table', $cekResi->getTable())
                ->delete();

            $images = $request->file('images');
            foreach ($images as $image) {
                $name = $image->hashName();
                $image->storeAs('public/cek_resi', $name);

                File::create([
                    'name' => $name,
                    'parent_id' => $cekResi->id,
                    'parent_table' => $cekResi->getTable(),
                ]);
            }
        }


        return response()->json('Sukses Update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kode_resi)
    {
        $getDataResi = CekResi::where('kode_resi', $kode_resi)->first();
        if ($getDataResi) {
            $getDataResi->delete();
            ResiTemp::where('kode_resi', $kode_resi)->delete();
            return response()->json("Resi Has Been Deleted");
        } else {
            return response()->json("Resi Not Found", 404);
        }
    }

    public function getData()
    {
        $cekResi = CekResi::with('service.category')->paginate();
        $resiTemp = ResiTemp::with('service.category')->paginate();

        $result = [];

        foreach ($cekResi as $resi) {
            $resiCode = $resi->kode_resi;
            $createdAt = $resi->created_at->format('Y-m-d H:i:s');
            $serviceInfo = "{$resi->service?->nama_service} - {$resi->service?->category?->name}";

            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $createdAt) {
                $result[$resiCode] = [
                    'kode_resi' => $resiCode,
                    'nama_pelanggan' => $resi->nama_pelanggan,
                    'status_pengerjaan' => $resi->status_pengerjaan,
                    'items' => $resi->nama_item,
                    'service' => $serviceInfo,
                    'tanggal' => $createdAt,
                ];
            }
        }

        foreach ($resiTemp as $temp) {
            $resiCode = $temp->kode_resi;
            $createdAt = $temp->created_at->format('Y-m-d H:i:s');
            $serviceInfo = "{$temp->service?->nama_service} - {$temp->service?->category?->name}";

            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $createdAt) {
                $result[$resiCode] = [
                    'kode_resi' => $resiCode,
                    'nama_pelanggan' => $temp->nama_pelanggan,
                    'status_pengerjaan' => $temp->status_pengerjaan,
                    'service' => $serviceInfo,
                    'items' => $resi->nama_item,
                    'tanggal' => $createdAt,
                ];
            }
        }

        $result = array_values($result);


        return response()->json($result);
    }

    public function getDetail($kode_resi)
    {
        $cekResi = CekResi::where('kode_resi', $kode_resi)->get();
        $resiTemp = ResiTemp::where('kode_resi', $kode_resi)->get();

        $resultArray = $cekResi->concat($resiTemp)->sortByDesc('created_at')->values()->all();

        return response()->json($resultArray);
    }

    public function statusPengerjaan()
    {
        $statusPengerjaans = CekResi::getStatusesAsArray();

        return response()->json($statusPengerjaans);
    }

    public function generateResi()
    {
        $resi = GenerateResi::generateResi();

        return response()->json($resi);
    }

    public function getItems($kode_resi)
    {
        $cekResi = CekResi::where('kode_resi', $kode_resi)->first();

        if (empty($cekResi)) {
            return response()->json(null, 200);
        }

        return response()->json($cekResi->nama_item);
    }
}
