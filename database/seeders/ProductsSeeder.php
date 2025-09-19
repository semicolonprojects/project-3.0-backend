<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use App\Models\Products;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = collect();
        for ($i = 0; $i < 10; $i++) {
            $categories->push(
                ProductCategory::create([
                    'name' => fake()->unique()->word(),
                ])
            );
        }

        for ($i = 0; $i < 10; $i++) {
            $name = fake()->words(2, true);
            Products::create([
                'product_name'   => ucfirst($name),
                'slug'           => Str::slug($name . '-' . Str::random(5)),
                'category'       => $categories->random()->id,
                'price'          => fake()->numberBetween(10000, 100000),
                'whatsapp_link'  => 'https://wa.me/' . fake()->numerify('628##########'),
            ]);
        }
    }
}
