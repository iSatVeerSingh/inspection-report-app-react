<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\LibraryItem;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $user = new User([
        //     'name' => 'SatVeer Singh',
        //     'email' => 'developer.satveer@gmail.com',
        //     'phone' => '7297036755',
        //     'password' => 'satu0099',
        //     'role' => 'Owner'
        // ]);

        // $user->save();

        // $allitems = Storage::json('libraryitems.json');

        // foreach ($allitems as $key => $value) {
        //     $item = new LibraryItem($value);

        //     $item->save();
        // }


        // get staff members or users from service m8
        $response = Http::withBasicAuth(env("SERVICEM8_EMAIL"), env("SERVICEM8_PASSWORD"))->get("https://api.servicem8.com/api_1.0/staff.json");

        $staffMembers = $response->json();

        foreach ($staffMembers as $key => $value) {
            if ($value['job_title'] === "Inspector") {
                $user = new User();
                $user->name = $value['first'] . " " . $value['last'];
                $user->email = $value['email'];
                $user->uuid = $value['uuid'];
                $user->phone = $value['mobile'];
                $user->role = "Inspector";
                $user->password = strtolower($value['first']) . "0099";

                $user->save();
            }
        }
    }
}
