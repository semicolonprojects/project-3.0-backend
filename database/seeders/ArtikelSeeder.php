<?php

namespace Database\Seeders;

use App\Models\Artikel;
use App\Models\ArtikelCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArtikelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = collect();

        for ($i = 0; $i < 10; $i++) {
            $categories->push(
                ArtikelCategory::create([
                    'name' => fake()->unique()->words(2, true),
                ])
            );
        }

        fake()->unique(true);

        for ($i = 0; $i < 10; $i++) {
            $title = fake()->sentence(3);

            Artikel::create([
                'slug'        => Str::slug($title . '-' . Str::random(5)),
                'judul'       => $title,
                'category_id' => $categories->random()->id,
                'isi_artikel' => fake()->paragraphs(3, true),
            ]);
        }
    }
}
