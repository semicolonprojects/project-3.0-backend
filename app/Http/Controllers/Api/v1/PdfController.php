<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\CekResi;
use App\Models\File;
use App\Models\Nomor;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    public function generatePdf(string $kode_resi)
    {
        $data = ['title' => 'My Laravel PDF'];
        $model = CekResi::where(['kode_resi' => $kode_resi])->first();
        $phoneNumber = Nomor::first();
        $images = File::where(['parent_id' => $model->id, 'parent_table' => $model->getTable()])->get();
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.template', get_defined_vars());

        return $pdf->stream("$model->nama_pelanggan-$kode_resi.pdf");
        // return view('pdf.template', get_defined_vars());
    }
}
