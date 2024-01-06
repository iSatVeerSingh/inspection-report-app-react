<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InspectionNoteController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\LibraryItemCategoryController;
use App\Http\Controllers\LibraryItemController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureUserIsOwner;
use App\Http\Middleware\EnsureUserIsOwnerOrAdmin;
use App\Models\InspectionItem;
use App\Models\Job;
use App\Models\LibraryItem;
use App\Models\LibraryItemCategory;
use App\Models\Report;
use Dotenv\Util\Regex;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/users', UserController::class)->except(['show'])->middleware(EnsureUserIsOwner::class);
    Route::apiResource('/job-categories', JobCategoryController::class)->except(['show'])->middleware(EnsureUserIsOwnerOrAdmin::class);
    Route::apiResource('/library-item-categories', LibraryItemCategoryController::class)->except(['show'])->middleware(EnsureUserIsOwnerOrAdmin::class);
    Route::apiResource('/library-items', LibraryItemController::class)->middleware(EnsureUserIsOwnerOrAdmin::class);
    Route::apiResource('/inspection-notes', InspectionNoteController::class)->except(['show'])->middleware(EnsureUserIsOwnerOrAdmin::class);
    Route::get('/install-items', [LibraryItemController::class, 'install']);
    Route::get('/install-item-categories', [LibraryItemCategoryController::class, 'install']);
    Route::get('/install-inspection-notes', [InspectionNoteController::class, 'install']);
    Route::get('/install-job-categories', [JobCategoryController::class, 'install']);
    Route::get('/install-jobs', [JobController::class, 'install']);
});

Route::get('/demo', function () {
    $reportData = Storage::json('inspectionitems2.json');
    $job = Job::where('jobNumber', $reportData['jobNumber'])->first();

    // if (Report::where('job_id', $job->id)->exists()) {
    //     return "nlll";
    // }

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

        if ($item['type'] !== "predefined") {
            return "hlllllllllllll";

            // $inspectionItem = new InspectionItem([
            //     'uuid' => Uuid::uuid4(),
            //     'report_id' => $report->id,
            //     'library_item_id' => $libraryItem->id,
            //     'images' => $item['itemImages'],
            // ]);

            // if ($item['itemNote']) {
            //     $inspectionItem['note'] = $item['itemNote'];
            // }

            // $inspectionItem->save();
        }
    }

    return "added success";
});
