<?php

namespace Database\Seeders;

use App\Models\LibraryItem;
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
        $allitems = Storage::json('all-library-items.json');

        foreach ($allitems as $key => $value) {
            $newItem = [
                'category' => $value['category'],
                'name' => $value['itemName'],
                'openingParagraph' => json_encode([
                    [
                        'text' => $value['openingParagraph']
                    ]
                ]),
                'closingParagraph' => json_encode([
                    [
                        'text' => $value['closingParagraph'],
                    ]
                ]),
            ];
            $libItem = new LibraryItem($newItem);
            $libItem->save();
        }
    }
}
