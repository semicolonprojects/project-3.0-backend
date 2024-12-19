<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * @source Chatgpt
 */

class CrudHelper
{
    /**
     * Save a record (create or update).
     *
     * @param Model $model
     * @param array $data
     * @param int|null $id
     * @return Model|null
     */
    public static function save(Model $model, array $data, $id = null)
    {
        try {
            // Check if the ID exists (if it's an update or create)
            if ($id) {
                $record = $model::find($id)->first();
                if ($record) {
                    // Update the record
                    $record->update($data);
                    return $record;
                }
            }

            // If the ID doesn't exist, create a new record
            return $model::create($data);
        } catch (\Exception $e) {
            Log::error('Save operation failed: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get a single record by ID.
     *
     * @param Model $model
     * @param int $id
     * @return Model|null
     */
    public static function read(Model $model, $id)
    {
        try {
            return $model::find($id);
        } catch (\Exception $e) {
            Log::error('Read operation failed: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Delete a record.
     *
     * @param Model $model
     * @param int $id
     * @return bool
     */
    public static function delete(Model $model, $id)
    {
        try {
            $record = $model::find($id);
            if ($record) {
                return $record->delete();
            }
            return false;
        } catch (\Exception $e) {
            Log::error('Delete operation failed: ' . $e->getMessage());
            return false;
        }
    }
}
