<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ArtikelCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map(function ($artikel) {
                return [
                    'id' => $artikel->id,
                    'judul' => $artikel->judul,
                    'category' => $artikel->category->name,
                    'slug' => $artikel->slug,
                    'isi_artikel' => $artikel->isi_artikel,
                    'image' => $artikel->image,
                    'description' => $artikel->description
                ];
            }),
        ];
    }
}
