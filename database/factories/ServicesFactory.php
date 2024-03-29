<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Services>
 */
class ServicesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_service' => $this->faker->name,
            'slug' => $this->faker->unique()->slug(2),
            'category' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 0, 1000),
            'link_wa' => $this->faker->url,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
