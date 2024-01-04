<?php

namespace Database\Seeders;

use App\Models\InspectionItem;
use App\Models\Job;
use App\Models\LibraryItemCategory;
use App\Models\Report;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class OldItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reportData = Storage::json('inspectionitems4.json');
        $job = Job::where('jobNumber', $reportData['jobNumber'])->first();

        if (Report::where('job_id', $job->id)->exists()) {
            return;
        }

        $report = new Report([
            'uuid' => Uuid::uuid4(),
            'job_id' => $job->id,
            'type' => $reportData['reportType'],
            'inspectionNotes' => $reportData['inspectionNotes'],
        ]);

        $report->save();

        foreach ($reportData['inspectionItems'] as $key => $item) {
            $categoryName = explode(':-', $item['itemName'])[0];
            $itemName = explode(':-', $item['itemName'])[1];

            $category = LibraryItemCategory::where('name', $categoryName)->first();
            $libraryItem = $category->libraryItems()->where('name', $itemName)->first();

            if ($item['type'] === "predefined") {

                $inspectionItem = new InspectionItem([
                    'uuid' => Uuid::uuid4(),
                    'report_id' => $report->id,
                    'library_item_id' => $libraryItem->id,
                    'images' => $item['itemImages'],
                ]);

                if ($item['itemNote']) {
                    $inspectionItem['note'] = $item['itemNote'];
                }

                $inspectionItem->save();
            }
        }
    }
}
