<?php

namespace App\Models;

use App\Traits\HasSearch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory, HasSearch;

    protected $fillable = ['product_name', 'slug', 'category', 'price', 'whatsapp_link', 'image', 'description'];
}
