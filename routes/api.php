<?php

use App\Http\Controllers\Api\v1\ArtikelCategoryController;
use App\Http\Controllers\Api\v1\ArtikelController;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\CekResiController;
use App\Http\Controllers\Api\v1\NomorController;
use App\Http\Controllers\Api\v1\ProductCategoryController;
use App\Http\Controllers\Api\v1\ProductsController;
use App\Http\Controllers\Api\v1\PromoController;
use App\Http\Controllers\Api\v1\ServiceCategoryController;
use App\Http\Controllers\Api\v1\ServicesController;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('users', UserController::class);
    Route::apiResource('artikel_category', ArtikelCategoryController::class);
    Route::apiResource('artikel', ArtikelController::class)->except(['rekomendasiArtikel']);
    Route::get('rekomendasiArtikel/{categoryId}', [ArtikelController::class, 'rekomendasiArtikel'])->name('rekomendasiArtikel');
    Route::apiResource('services', ServicesController::class)->parameters([
        'services' => 'slug',
    ]);
    Route::apiResource('products', ProductsController::class);
    Route::apiResource('productsCategory', ProductCategoryController::class);

    Route::get('allProductsCategory', [ProductCategoryController::class, 'getAll'])->name('getAllProductCategory');
    Route::apiResource('service-category', ServiceCategoryController::class)->except(['getAll']);

    Route::apiResource('cekresi', CekResiController::class)->except(['getResi', 'getDetail']);
    Route::get('getResi', [CekResiController::class, 'getData'])->name('getResi');
    Route::get('getResiDetail/{kode_resi}', [CekResiController::class, 'getDetail'])->name('getDetail');

    Route::apiResource('nomors', NomorController::class)->except(['getExistsNomor']);
    Route::get('getExistsNomor', [NomorController::class, 'getExistsNomor'])->name('getExistsNomor');

    Route::apiResource('promo', PromoController::class)->except(['showPromoNavbar']);
    Route::get('showPromoNavbar', [PromoController::class, 'showPromoNavbar'])->name('showPromoNavbar');
})->middleware('cors');
