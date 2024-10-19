<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CekResiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "kode_resi" => $this->kode_resi,
            "nama_pelanggan" => $this->nama_pelanggan,
            "status_pengerjaan" => $this->status_pengerjaan,
            "service" => "{$this->service?->nama_service} - {$this->service?->category?->name}",
            "pengirim" => $this->pengirim,
            "penerima" => $this->penerima,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
        ];
    }
}
