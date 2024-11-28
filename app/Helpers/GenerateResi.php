<?php

namespace App\Helpers;

use App\Models\CekResi;
use Carbon\Carbon;
use Illuminate\Support\Str;

class GenerateResi
{
    public static function generateResi()
    {
        $latestResi = CekResi::latest()->first();
        $tanggal = Carbon::now()->format('Ymd');

        if (empty($latestResi)) {
            $resi = "NETT-{$tanggal}-1";
        } else {
            $currentNumber = Str::replaceFirst("NETT-{$tanggal}-", '', $latestResi->kode_resi);

            $nomor = is_numeric($currentNumber) ? (intval($currentNumber) + 1) : 1;

            $resi = "NETT-{$tanggal}-{$nomor}";
        }

        return $resi;
    }
}
