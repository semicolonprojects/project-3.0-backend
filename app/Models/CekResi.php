<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CekResi extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_resi',
        'nama_pelanggan',
        'status_pengerjaan',
        'category',
        'pengirim',
        'penerima'
    ];
}
