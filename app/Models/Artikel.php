<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'judul', 'category_id', 'isi_artikel', 'image', 'description'];

    public function category()
    {
        return $this->belongsTo(ArtikelCategory::class, 'category_id');
    }
}
