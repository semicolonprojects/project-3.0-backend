<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Example user data
        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@email.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
            ],
            [
                'name' => 'Nettoyer09',
                'email' => 'Nettoyer09@email.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Nettoyer09'),
            ],
            [
                'name' => 'Nettoyer32',
                'email' => 'Nettoyer32@email.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Nettoyer32'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
