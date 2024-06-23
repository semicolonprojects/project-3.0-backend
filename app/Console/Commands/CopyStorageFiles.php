<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CopyStorageFiles extends Command
{
    protected $signature = 'copy:storage-files';

    protected $description = 'Copy files from storage/app/public to storage/';

    public function handle()
    {
        $sourceFolder = storage_path('app/public');
        $destinationFolder = storage_path('/');

        // Check if the source folder exists
        if (!File::exists($sourceFolder)) {
            $this->error('Source folder does not exist.');
            return 1; // Exit with error status
        }

        // Check if the destination folder exists, create if it doesn't
        if (!File::exists($destinationFolder)) {
            File::makeDirectory($destinationFolder, 0777, true, true);
        }

        // Copy all files and directories from source to destination
        try {
            File::cleanDirectory(storage_path('public')); // Clean destination folder first
            File::copyDirectory($sourceFolder, $destinationFolder);
            $this->info('Files copied successfully.');
        } catch (\Throwable $e) {
            $this->error('Failed to copy files.');
            return 1; // Exit with error status
        }
    }
}
