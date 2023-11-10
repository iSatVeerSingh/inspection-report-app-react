<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\LibraryItem;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = new User([
            'name' => 'SatVeer Singh',
            'email' => 'developer.satveer@gmail.com',
            'phone' => '7297036755',
            'password' => 'satu0099',
            'role' => 'owner'
        ]);

        $user->save();

        $allitems = Storage::json('libraryitems.json');

        foreach ($allitems as $key => $value) {
            $item = new LibraryItem($value);

            $item->save();
        }
    }
}
