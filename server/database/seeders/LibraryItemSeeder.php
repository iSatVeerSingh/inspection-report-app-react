<?php

namespace Database\Seeders;

use App\Models\LibraryItem;
use App\Models\LibraryItemCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class LibraryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // seed all categories
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
    }
}
