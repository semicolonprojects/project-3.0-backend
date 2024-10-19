<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CekResiCollection;
use App\Models\CekResi;
use App\Models\ResiTemp;
use Illuminate\Http\Request;
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
        $validator = Validator::make($request->all(), [
            'kode_resi' => 'required|unique:cek_resis,kode_resi',
            'nama_pelanggan' => 'required',
            'status_pengerjaan' => 'required',
            'service_id' => 'required|exists:services,id',
            'pengirim' => 'nullable',
            'penerima' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        CekResi::create($request->only([
            'kode_resi',
            'nama_pelanggan',
            'status_pengerjaan',
            'service_id',
            'pengirim',
            'penerima',
        ]));

        return response()->json(null, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($kode_resi)
    {
        $cekResi = CekResi::where('kode_resi', $kode_resi)->get();
        $resiTemp = ResiTemp::where('kode_resi', $kode_resi)->get();

        $result = [];

        foreach (array_merge($cekResi->toArray(), $resiTemp->toArray()) as $item) {
            $resiCode = $item['kode_resi'];
            $createdAt = \Carbon\Carbon::parse($item['created_at']);

            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $createdAt) {
                $result[$resiCode] = [
                    'kode_resi' => $resiCode,
                    'nama_pelanggan' => $item['nama_pelanggan'],
                    'status_pengerjaan' => $item['status_pengerjaan'],
                    'service_id' => $item['service_id'],
                    'pengirim' => $item['pengirim'],
                    'penerima' => $item['penerima'],
                    'tanggal' => $createdAt->format('Y-m-d H:i:s'),
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
            $cekResi = CekResi::where('kode_resi', $kode_resi)->firstOrFail();

            $validator = Validator::make($request->all(), [
                'kode_resi' => 'required',
                'nama_pelanggan' => 'required',
                'status_pengerjaan' => 'required',
                'service_id' => 'required|exists:services,id',
                'pengirim' => 'nullable',
                'penerima' => 'nullable',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

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
}
