<?php

use App\Http\Controllers\Api\v1\ArtikelCategoryController;
use App\Http\Controllers\Api\v1\ArtikelController;
use App\Http\Controllers\Api\v1\UserController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'v1'], function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('artikel_category', ArtikelCategoryController::class);
    Route::apiResource('artikel', ArtikelController::class);
});
