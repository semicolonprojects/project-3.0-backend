<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCekResiRequest;
use App\Http\Resources\CekResiCollection;
use App\Http\Resources\CekResiResource;
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
            'category_id' => 'required|exists:service_categories,id',
            'pengirim' => 'nullable',
            'penerima' => 'nullable'
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        CekResi::create([
            'kode_resi' => $request->kode_resi,
            'nama_pelanggan' => $request->nama_pelanggan,
            'status_pengerjaan' => $request->status_pengerjaan,
            'category_id' => $request->category_id,
            'pengirim' => $request->pengirim,
            'penerima' => $request->penerima,
        ]);

        return response()->json('Success', 200);
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     dd($id);
    //     $cekResi = CekResi::findOrFail($id);

    //     return new CekResiResource($cekResi);
    // }

    public function show($kode_resi)
    {
        $cekResi = CekResi::where('kode_resi', $kode_resi)->paginate();
        $resiTemp = ResiTemp::where('kode_resi', $kode_resi)->paginate();

        $result = [];

        // Merge data from CekResi
        foreach ($cekResi as $resi) {
            $resiCode = $resi->kode_resi;
            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $resi->created_at) {
                $result[$resiCode] = [
                    'kode_resi' => $resi->kode_resi,
                    'nama_pelanggan' => $resi->nama_pelanggan,
                    'status_pengerjaan' => $resi->status_pengerjaan,
                    'category' => $resi->category->name,
                    'pengirim' => $resi->pengirim,
                    'penerima' => $resi->penerima,
                    'tanggal' => $resi->created_at->format('Y-m-d H:i:s')
                ];
            }
        }

        // Merge data from ResiTemp
        foreach ($resiTemp as $temp) {
            $resiCode = $temp->kode_resi;
            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $temp->created_at) {
                $result[$resiCode] = [
                    'kode_resi' => $temp->kode_resi,
                    'nama_pelanggan' => $temp->nama_pelanggan,
                    'status_pengerjaan' => $temp->status_pengerjaan,
                    'category' => $temp->category->name,
                    'pengirim' => $temp->pengirim,
                    'penerima' => $temp->penerima,
                    'tanggal' => $temp->created_at->format('Y-m-d H:i:s'),
                ];
            }
        }

        // Reindex the array to start from 0
        $result = array_values($result);

        return response()->json($result);
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
                'category_id' => $request->category_id,
                'pengirim' => $request->pengirim,
                'penerima' => $request->penerima
            ]);
        } else {
            $getResi = CekResi::where('kode_resi', $kode_resi)->first();
            $cekResi = CekResi::findOrFail($getResi->id);
            $validator = Validator::make($request->all(), [
                'kode_resi' => 'required',
                'nama_pelanggan' => 'required',
                'status_pengerjaan' => 'required',
                'category_id' => 'required|exists:service_categories,id',
                'pengirim' => 'nullable',
                'penerima' => 'nullable'
            ]);

            //check if validation fails
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            ResiTemp::where('kode_resi', $kode_resi)->delete();

            $cekResi->update([
                'kode_resi' => $request->kode_resi,
                'nama_pelanggan' => $request->nama_pelanggan,
                'status_pengerjaan' => $request->status_pengerjaan,
                'category_id' => $request->category_id,
                'pengirim' => $request->pengirim,
                'penerima' => $request->penerima,
            ]);
        }

        // return new CekResiResource($cekResi);
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
        $cekResi = CekResi::paginate();
        $resiTemp = ResiTemp::paginate();

        $result = [];

        // Merge data from CekResi
        foreach ($cekResi as $resi) {
            $resiCode = $resi->kode_resi;
            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $resi->created_at) {
                $result[$resiCode] = [
                    'kode_resi' => $resi->kode_resi,
                    'nama_pelanggan' => $resi->nama_pelanggan,
                    'status_pengerjaan' => $resi->status_pengerjaan,
                    'category' => $resi->category->name,
                    'tanggal' => $resi->created_at->format('Y-m-d H:i:s')
                ];
            }
        }

        // Merge data from ResiTemp
        foreach ($resiTemp as $temp) {
            $resiCode = $temp->kode_resi;
            if (!isset($result[$resiCode]) || $result[$resiCode]['tanggal'] < $temp->created_at) {
                $result[$resiCode] = [
                    'kode_resi' => $temp->kode_resi,
                    'nama_pelanggan' => $temp->nama_pelanggan,
                    'status_pengerjaan' => $temp->status_pengerjaan,
                    'category' => $temp->category->name,
                    'tanggal' => $temp->created_at->format('Y-m-d H:i:s'),
                ];
            }
        }

        // Reindex the array to start from 0
        $result = array_values($result);

        return response()->json($result);
    }

    public function getDetail($kode_resi)
    {
        $cekResi = CekResi::where('kode_resi', $kode_resi)->get();
        $resiTemp = ResiTemp::where('kode_resi', $kode_resi)->get();

        // Combine both collections into one array
        $resultArray = $cekResi->concat($resiTemp)->toArray();

        $resultArray = collect($resultArray)->sortByDesc('created_at')->values()->all();

        return response()->json($resultArray);
    }
}
