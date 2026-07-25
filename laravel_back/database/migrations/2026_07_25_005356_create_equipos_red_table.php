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
        Schema::create('equipos_red', function (Blueprint $table) {
            $table->id('id_equipos');
            $table->foreignId('id_usuario')->constrained('usuarios', 'id_usuario');
            $table->string('nombre_equipo');
            $table->string('direccion_mac')->unique();
            $table->string('numero_inventario')->unique();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos_red');
    }
};
