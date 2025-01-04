<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\GenerateResi;
use App\Helpers\CrudHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\CekResiCollection;
use App\Models\CekResi;
use App\Models\File;
use App\Models\ResiTemp;
use App\Models\Services;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CekResiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CekResiCollection(CekResi::latest()->paginate());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_toko' => 'required|sometimes',
            'kode_resi' => 'required|sometimes',
            'nama_pelanggan' => 'required|sometimes',
            'status_pengerjaan' => 'required|sometimes',
            'ongkir' => 'nullable|numeric',
            'pengirim' => 'nullable|string',
            'penerima' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,png,jpeg,gif',
        ], [
            'id_toko.required' => 'Toko tidak boleh kosong',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $kode_resi = $request->filled('kode_resi')
            ? CekResi::where('kode_resi', $request->kode_resi)->first()->kode_resi
            : GenerateResi::generateResi($request->id_toko);

        $model = CekResi::firstOrNew(['kode_resi' => $kode_resi]);

        $namaItemData = null;
        if ($request->has('data')) {
            $namaItemData = json_decode($request->data, true);

            foreach ($namaItemData as &$item) {
                if (isset($item['service_id']) && is_array($item['service_id'])) {
                    foreach ($item['service_id'] as &$service) {
                        $serviceModel = Services::find($service['id']);
                        if ($serviceModel) {
                            $service['price'] = $serviceModel->price;
                            $service['nama_service'] = $serviceModel->nama_service;
                            $service['category'] = $serviceModel->category->name;
                        }
                    }
                }
            }
        }

        $cekResiData = [
            'id_toko' => $request->id_toko ?? $model->id_toko,
            'nama_pelanggan' => $request->nama_pelanggan ?? $model->nama_pelanggan,
            'status_pengerjaan' => $request->status_pengerjaan ?? $model->status_pengerjaan,
            'pengirim' => $request->pengirim ?? $model->pengirim,
            'penerima' => $request->penerima ?? $model->penerima,
            'nama_item' => $namaItemData,
            'ongkir' => $request->ongkir ?? $model->ongkir ?? 0.00,
        ];

        $cekResi = CekResi::updateOrCreate(
            ['kode_resi' => $kode_resi],
            $cekResiData
        );

        $resiTemp = ResiTemp::where('kode_resi', $kode_resi)->first();
        if ($resiTemp) {
            $resiTemp->update(['nama_item' => $namaItemData]);
        }

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

        return response()->json($cekResi);
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
                    'id_toko' => $item->id_toko,
                    'kode_resi' => $resiCode,
                    'nama_pelanggan' => $item->nama_pelanggan,
                    'status_pengerjaan' => $item->status_pengerjaan,
                    'service_id' => $item->id,
                    'pengirim' => $item->pengirim,
                    'penerima' => $item->penerima,
                    'ongkir' => $item->ongkir,
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
            'id_toko' => 'sometimes|required',
            'kode_resi' => 'sometimes|required',
            'nama_pelanggan' => 'sometimes|required',
            'status_pengerjaan' => 'sometimes|required',
            'ongkir' => 'numeric',
            'service_id' => 'sometimes|required|exists:services,id',
            'pengirim' => 'nullable|string',
            'penerima' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        $cekResi->status_pengerjaan = $request->status_pengerjaan;

        $namaItemData = null;
        if ($request->has('data')) {
            $namaItemData = json_decode($request->data, true);

            foreach ($namaItemData as &$item) {
                if (isset($item['service_id']) && is_array($item['service_id'])) {
                    foreach ($item['service_id'] as &$service) {
                        $serviceModel = Services::findOrFail($service['id']);
                        $service['price'] = $serviceModel->price;
                        $service['nama_service'] = $serviceModel->nama_service;
                        $service['category'] = $serviceModel->category->name;
                    }
                }
            }
        }

        if ($cekResi->isDirty()) {
            ResiTemp::updateOrCreate(
                [
                    'kode_resi' => $kode_resi,
                    'status_pengerjaan' => $request->status_pengerjaan
                ],
                [
                    'id_toko' => $request->id_toko,
                    'kode_resi' => $kode_resi,
                    'nama_pelanggan' => $request->nama_pelanggan,
                    'status_pengerjaan' => $request->status_pengerjaan,
                    'service_id' => $request->service_id,
                    'pengirim' => $request->pengirim,
                    'penerima' => $request->penerima,
                    'nama_item' => $namaItemData ?? $cekResi->nama_item,
                    'ongkir' => $request->ongkir ?? 0.00,
                ]
            );
        }

        $updateData = [
            'id_toko' => $request->id_toko,
            'nama_pelanggan' => $request->nama_pelanggan,
            'service_id' => $request->service_id,
            'pengirim' => $request->pengirim,
            'penerima' => $request->penerima,
            'nama_item' => $namaItemData ?? $cekResi->nama_item,
            'ongkir' => $request->ongkir ?? 0.00,
        ];

        CrudHelper::save(new CekResi(), $updateData, $cekResi->id);

        if ($request->hasFile('images') || $request->has('names')) {
            $newImageNames = $request->names ?? [];

            $oldFiles = File::where('parent_id', $cekResi->id)
                ->where('parent_table', $cekResi->getTable())
                ->whereNotIn('name', $newImageNames)
                ->get();

            foreach ($oldFiles as $oldFile) {
                Storage::delete('public/cek_resi/' . $oldFile->name);
                $oldFile->delete();
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $name = $image->hashName();
                    $image->storeAs('public/cek_resi', $name);

                    File::create([
                        'name' => $name,
                        'parent_id' => $cekResi->id,
                        'parent_table' => $cekResi->getTable(),
                    ]);
                }
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

    public function getData(Request $request)
    {
        $cekResi = CekResi::with('service.category')->get();
        $resiTemp = ResiTemp::with('service.category')->get();

        $mergedResi = $cekResi->merge($resiTemp);

        $result = $mergedResi->mapWithKeys(function ($resi) {
            $resiCode = $resi->kode_resi;
            $createdAt = $resi->created_at->format('Y-m-d H:i:s');
            $serviceInfo = "{$resi->service?->nama_service} - {$resi->service?->category?->name}";

            return [
                $resiCode => [
                    'kode_resi' => $resiCode,
                    'nama_pelanggan' => $resi->nama_pelanggan,
                    'status_pengerjaan' => $resi->status_pengerjaan,
                    'items' => $resi->nama_item,
                    'service' => $serviceInfo,
                    'tanggal' => $createdAt,
                    'ongkir' => $resi->ongkir
                ]
            ];
        });

        $result = $result->sortByDesc(function ($item) {
            return strtotime($item['tanggal']);
        });

        $result = collect($result);

        $result = $result->sortByDesc(function ($item) {
            return strtotime($item['tanggal']);
        });

        $currentPage = $request->get('page', 1);

        $perPage = $request->limit ?? 5;

        $currentItems = $result->slice(($currentPage - 1) * $perPage, $perPage);

        $paginator = new LengthAwarePaginator(
            $currentItems,
            $result->count(),
            $perPage,
            $currentPage,
            ['path' => Paginator::resolveCurrentPath()]
        );

        return response()->json($paginator);
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

    public function getItems($kode_resi)
    {
        $cekResi = CekResi::where('kode_resi', $kode_resi)->first();

        if (empty($cekResi)) {
            return response()->json(null, 200);
        }

        return response()->json($cekResi->nama_item);
    }
}
