<?php

namespace App\Traits;

trait HasSearch
{
    public function scopeSearch($query, $search, $columns = [])
    {
        return $query->when($search, function ($q) use ($search, $columns) {
            $q->where(function ($innerQuery) use ($search, $columns) {
                foreach ($columns as $column) {
                    $innerQuery->orWhere($column, 'LIKE', "%{$search}%");
                }
            });
        });
    }
}
