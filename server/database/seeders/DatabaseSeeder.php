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
        $serviceUrl = env("SERVICEM8_BASEURL");
        $username = env("SERVICEM8_EMAIL");
        $password = env("SERVICEM8_PASSWORD");

        // ['Inspector', 'Admin', 'Owner']
        $staffMembers = Http::withBasicAuth($username, $password)->get($serviceUrl . "/staff.json")->json();
        $staff = array_filter($staffMembers, function ($member) {
            return $member['active'] === 1;
        });

        foreach ($staff as $key => $member) {
            $role = "";

            if (str_contains(strtolower($member['job_title']), "admin")) {
                $role = "Admin";
            }

            if (str_contains(strtolower($member['job_title']), "director")) {
                $role = "Owner";
            }

            if (str_contains(strtolower($member['job_title']), "inspector")) {
                $role = "Inspector";
            }

            if ($role !== "") {
                $user = new User();
                $user['uuid'] = $member['uuid'];
                $user['name'] = trim($member['first'] . " " . $member['last']);
                $user['email'] = $member['email'];
                if ($member['mobile'] !== "") {
                    $user['phone'] = $member['mobile'];
                }
                $user['password'] = trim(strtolower($member['first'])) . "0099";
                $user['role'] = $role;

                $user->save();
            }
        }
    }
}
