<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServicesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "slug" => $this->slug,
            "nama_service" => $this->nama_service,
            "category" => $this->category->category_barang,
            "category_image" => $this->category->image,
            "price" => $this->price,
            "link_wa" => $this->link_wa,
            "deskripsi" => $this->deskripsi
        ];
    }
}
