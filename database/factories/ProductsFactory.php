<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name' => $this->faker->name,
            'slug' => $this->faker->unique()->slug(2),
            'category' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 0, 1000),
            'whatsapp_link' => $this->faker->url,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
