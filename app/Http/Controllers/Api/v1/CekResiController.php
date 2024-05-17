<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCekResiRequest;
use App\Http\Resources\CekResiCollection;
use App\Http\Resources\CekResiResource;
use App\Models\CekResi;
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
        $validatedData = $request->validate([
            'kode_resi' => 'required|unique:cek_resis,kode_resi',
            'nama_pelanggan' => 'required',
            'status_pengerjaan' => 'required',
            'category' => 'required',
            'pengirim' => 'nullable',
            'penerima' => 'nullable'
        ]);
        $cekResi = CekResi::create($validatedData);
        return new CekResiResource($cekResi);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cekResi = CekResi::findOrFail($id);

        return new CekResiResource($cekResi);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cekResi = CekResi::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'kode_resi' => 'required|unique:cek_resis,kode_resi',
            'nama_pelanggan' => 'required',
            'status_pengerjaan' => 'required',
            'category' => 'required',
            'pengirim' => 'nullable',
            'penerima' => 'nullable'
        ]);

         //check if validation fails
         if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
       

        $cekResi->update([
            'kode_resi' => $request->kode_resi,
            'nama_pelanggan' => $request->nama_pelanggan,
            'status_pengerjaan' => $request->status_pengerjaan,
            'category' => $request->category,
            'pengirim' => $request->pengirim,
            'penerima' => $request->penerima,
        ]);
        return new CekResiResource($cekResi);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CekResi $cekresi)
    {
        $cekresi->delete();
        return response()->json("Resi Has Been Deleted");
    }
}
