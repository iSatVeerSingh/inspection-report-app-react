<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\InspectionNote;
use App\Models\LibraryItem;
use App\Models\LibraryItemCategory;
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


        //library items and categories seeder
        $allitems = Storage::json('libraryitems.json');

        $allCategories = array_map(function ($item) {
            return $item['category'];
        }, $allitems);

        $uniqueCategories = array_unique($allCategories);

        foreach ($uniqueCategories as $key => $category) {
            $itemCategory = new LibraryItemCategory([
                "name" => trim($category)
            ]);

            $itemCategory->save();
        }

        foreach ($allitems as $key => $item) {
            $category = LibraryItemCategory::where('name', $item['category'])->first();

            $libItem = new LibraryItem();
            $libItem['category_id'] = $category['id'];
            $libItem['name'] = $item['name'];
            $libItem['openingParagraph'] = $item['openingParagraph'];
            $libItem['closingParagraph'] = $item['closingParagraph'];

            if (array_key_exists('embeddedImage', $item)) {
                $libItem['embeddedImage'] = $item['embeddedImage'];
            }

            $libItem->save();
        }

        // add inspection notes
        $allNotes = Storage::json('inspectionNotes.json');

        foreach($allNotes as $key => $value) {
            $note = new InspectionNote([
                'text' => $value,
            ]);
            $note->save();
        }
    }
}
