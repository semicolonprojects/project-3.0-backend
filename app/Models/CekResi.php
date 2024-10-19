<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CekResi extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function service(): HasOne
    {
        return $this->hasOne(Services::class, 'id', 'service_id');
    }
}
