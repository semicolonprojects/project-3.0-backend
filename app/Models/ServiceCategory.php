<?php

namespace App\Models;

use App\Traits\HasSearch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
    use HasFactory, HasSearch;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'category_barang'
    ];
}
