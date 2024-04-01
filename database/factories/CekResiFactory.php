<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CekResi>
 */
class CekResiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "kode_resi" => $this->faker->countryCode(5),
            "nama_pelanggan" => $this->faker->name,
            "status_pengerjaan" => $this->faker->word,
            "category" => $this->faker->word,
            "pengirim" => $this->faker->name,
            "penerima" => $this->faker->name
        ];
    }
}
