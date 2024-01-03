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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    Route::apiResource('/library-item-categories', LibraryItemCategoryController::class)->except(['show'])->middleware(EnsureUserIsOwnerOrAdmin::class);
    Route::apiResource('/library-items', LibraryItemController::class)->middleware(EnsureUserIsOwnerOrAdmin::class);
    Route::apiResource('/inspection-notes', InspectionNoteController::class)->except(['show'])->middleware(EnsureUserIsOwnerOrAdmin::class);
    Route::get('/install-items', [LibraryItemController::class, 'install']);
    Route::get('/install-item-categories', [LibraryItemCategoryController::class, 'install']);
    Route::get('/install-inspection-notes', [InspectionNoteController::class, 'install']);
    Route::get('/install-job-categories', [JobCategoryController::class, 'install']);
    Route::get('/install-jobs', [JobController::class, 'install']);
});
