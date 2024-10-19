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
        Schema::create('resi_temps', function (Blueprint $table) {
            $table->id();
            $table->string('kode_resi');
            $table->string('nama_pelanggan');
            $table->string('status_pengerjaan');
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');
            $table->string('pengirim')->nullable();
            $table->string('penerima')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resi_temps');
    }
};
