<?php

namespace App\Http\Controllers;

use App\Models\LibraryItem;
use App\Models\LibraryItemCategory;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
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
            $libItem['category'] = $category['id'];
            $libItem['name'] = $item['name'];
            $libItem['openingParagraph'] = $item['openingParagraph'];
            $libItem['closingParagraph'] = $item['closingParagraph'];

            if (array_key_exists('embeddedImage', $item)) {
                $libItem['embeddedImage'] = $item['embeddedImage'];
            }

            $libItem->save();
        }

        return $allitems;
    }
}
