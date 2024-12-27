<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cek_resis', function (Blueprint $table) {
            $table->unsignedBigInteger('id_toko')->after('id')->nullable();

            $table->foreign('id_toko')->references('id')->on('tokos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cek_resis', function (Blueprint $table) {
            $table->dropColumn('id_toko');
        });
    }
};
