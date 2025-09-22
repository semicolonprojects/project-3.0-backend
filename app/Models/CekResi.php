<?php

namespace App\Models;

use App\Traits\HasSearch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CekResi extends Model
{
    const STATUS_ANTRIAN = 'Dalam Antrian';
    const STATUS_DIKERJAKAN = 'Sedang Dikerjakan';
    const STATUS_SELESAI = 'Dikirim / Selesai';

    use HasFactory, HasSearch;

    protected $guarded = ['id'];

    protected $appends = ['images'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'nama_item' => 'array',
    ];

    public static function getStatusesAsArray()
    {
        return [
            ['value' => self::STATUS_ANTRIAN],
            ['value' => self::STATUS_DIKERJAKAN],
            ['value' => self::STATUS_SELESAI],
        ];
    }


    public function getImagesAttribute()
    {
        $model = File::query()->where(['parent_id' => $this->id, 'parent_table' => $this->getTable()])->get();
        return $model;
    }

    public function service(): HasOne
    {
        return $this->hasOne(Services::class, 'id', 'service_id');
    }
}
