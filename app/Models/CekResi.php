<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CekResi extends Model
{
    const STATUS_ANTRIAN = 'Dalam Antrian';
    const STATUS_DIKERJAKAN = 'Sedang Dikerjakan';
    const STATUS_SELESAI = 'Dikirim / Selesai';

    use HasFactory;

    protected $guarded = ['id'];

    public static function getStatusesAsArray()
    {
        return [
            ['value' => self::STATUS_ANTRIAN],
            ['value' => self::STATUS_DIKERJAKAN],
            ['value' => self::STATUS_SELESAI],
        ];
    }

    public function service(): HasOne
    {
        return $this->hasOne(Services::class, 'id', 'service_id');
    }
}
