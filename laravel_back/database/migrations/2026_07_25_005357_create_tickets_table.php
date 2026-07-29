<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id('id_ticket');
            $table->text('descripcion_empleado');
            $table->string('prioridad');
            $table->timestamp('fecha_creacion')->useCurrent();

            $table->foreignId('empleado_id')->constrained('usuarios', 'id_usuario');
            $table->foreignId('tecnico_id')->nullable()->constrained('usuarios', 'id_usuario');

            $table->foreignId('categoria_id')->constrained('tipos_ticket', 'id_tipo');
            $table->foreignId('estado_id')->constrained('estados_ticket', 'id_estado');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
