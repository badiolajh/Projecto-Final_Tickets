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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario');
            $table->string('nombre_completo');
            $table->string('puesto');
            $table->string('correo_electronico')->unique();
            $table->string('contrasena_hash');
            $table->string('extension_telefono')->nullable();
            $table->string('foto_url')->nullable();
            $table->timestamp('fecha_de_creacion')->useCurrent();

            $table->foreignId('id_rol')->constrained('rol', 'id_rol');
            $table->foreignId('id_area')->constrained('areas', 'id_area');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
