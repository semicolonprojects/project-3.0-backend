<?php

namespace App\Helpers;

use App\Models\Nomor;

class WaLinkHelper
{
    public static function templateService()
    {
        $phoneNumber = Nomor::select('nomor')->first();

        $message = 'Format%20order%0ANama%20%3A%20%0ALokasi%20pengambilan%20%3A%20%0ATreatment%3A%0AJam%20pengambilan%20%3A%20%0A%0A%2AUntuk%20jam%20pengambilan%20akan%20disesuaikan%20oleh%20jam%20kurir%2C%20terimakasih%F0%9F%99%8F%F0%9F%98%8A';

        return "https://wa.me/{$phoneNumber->nomor}?text={$message}";
    }

    public static function orderProduct($message)
    {
        $phoneNumber = Nomor::select('nomor')->first();
        return "https://wa.me/{$phoneNumber->nomor}?text=" . urlencode($message);
    }
}
