<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug'
    ];

    // public function cekresi()
    // {
    //     return $this->hasMany(CekResi::class);
    // }

    // public function services()
    // {
    //     return $this->hasMany(Services::class);
    // }

}
