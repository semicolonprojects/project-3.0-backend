<?php

namespace Database\Seeders;

use App\Models\Toko;
use Illuminate\Database\Seeder;

class TokoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            Toko::create([
                'kode'        => fake()->unique()->bothify('TK-####'),
                'nama_toko'   => fake()->company(),
                'alamat_toko' => fake()->address(),
            ]);
        }
    }
}
