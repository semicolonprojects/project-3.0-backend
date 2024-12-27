<?php

namespace App\Helpers;

use App\Models\CekResi;
use App\Models\Toko;
use Carbon\Carbon;
use Illuminate\Support\Str;

class GenerateResi
{
    public static function generateResi($id_toko)
    {
        $now = Carbon::now();
        $currentMonth = $now->month;
        $currentYear = $now->year;
        $date = $now->format('Ymd');

        $latestResi = CekResi::where('id_toko', $id_toko)
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->latest()
            ->first();

        $toko = Toko::findOrFail($id_toko);

        $nomor = 1;

        if (!empty($latestResi)) {
            $currentNumber = Str::replaceFirst("{$toko->kode}-{$date}-", '', $latestResi->kode_resi);

            $nomor = intval($currentNumber) + 1;
        }

        $resi = "{$toko->kode}-{$date}-{$nomor}";

        return $resi;
    }
}
