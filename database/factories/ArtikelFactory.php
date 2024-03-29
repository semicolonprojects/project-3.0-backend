<?php

namespace Database\Factories;

use App\Models\ArtikelCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artikel>
 */
class ArtikelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => $this->faker->unique()->slug,
            'judul' => $this->faker->sentence,
            'category_id' => function () {
                return ArtikelCategory::factory()->create()->id;
            },
            'isi_artikel' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
