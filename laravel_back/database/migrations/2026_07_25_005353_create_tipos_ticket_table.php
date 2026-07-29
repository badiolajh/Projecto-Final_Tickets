<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tipos_ticket', function (Blueprint $table) {
            $table->id('id_tipo');
            $table->string('nombre_tipo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tipos_ticket');
    }
};
