<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/storage-link', function () {
    $sourceFolder = storage_path('app/public');
    $destinationFolder = storage_path('/');

    // Check if the source folder exists
    if (!File::exists($sourceFolder)) {
        return response()->json(['error' => 'Source folder does not exist.'], 500);
    }

    // Check if the destination folder exists, create if it doesn't
    if (!File::exists($destinationFolder)) {
        File::makeDirectory($destinationFolder, 0777, true, true);
    }

    // Copy all files and directories from source to destination
    try {
        File::cleanDirectory(storage_path('/public')); // Clean destination folder first
        File::copyDirectory($sourceFolder, $destinationFolder);
    } catch (\Throwable $e) {
        return response()->json(['error' => 'Failed to copy files.'], 500);
    }

    return response()->json(['message' => 'Files copied successfully.']);
});
