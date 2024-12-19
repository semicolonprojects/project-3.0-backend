<?php

namespace App\Models;

use Illuminate\Container\Container;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class File extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
