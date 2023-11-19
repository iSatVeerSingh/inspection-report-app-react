<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LibraryItemController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureUserIsOwner;
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
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class)->middleware(EnsureUserIsOwner::class);
    Route::apiResource('/library-items', LibraryItemController::class)->except(['index'])->middleware(EnsureUserIsOwner::class);
    Route::apiResource('/library-items', LibraryItemController::class)->only(['index']);
});

Route::get('/demo', [CustomerController::class, 'index']);
