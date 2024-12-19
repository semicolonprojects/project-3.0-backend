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
        Schema::create('resi_services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resi_id');
            $table->unsignedBigInteger('service_id');
            $table->timestamps();

            $table->foreign('resi_id')->references('id')->on('cek_resis')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resi_services');
    }
};
