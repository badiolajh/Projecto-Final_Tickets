<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        //Roles solo habra administrador, tecnico y empleado
        DB::table('rol')->insert([
            ['nombre_rol' => 'Administrador'],
            ['nombre_rol' => 'Técnico'],
            ['nombre_rol' => 'Empleado'],
        ]);

        //Areas de la empresa, pueden ser mas
        DB::table('areas')->insert([
            ['nombre_area' => 'Sistemas'],
            ['nombre_area' => 'Recursos Humanos'],
            ['nombre_area' => 'Finanzas'],
            ['nombre_area' => 'Direccion Administrativa'],
            ['nombre_area' => 'Direccion Juridica'],
            ['nombre_area' => 'Recursos Materiales'],
            ['nombre_area' => 'Marketing'],
            ['nombre_area' => 'Ventas'],
            ['nombre_area' => 'Produccion'],
        ]);

        // Solo habra 3 tippos de tickets
        DB::table('tipos_ticket')->insert([
            ['nombre_tipo' => 'Hardware'],
            ['nombre_tipo' => 'Software'],
            ['nombre_tipo' => 'Redes'],
        ]);

        // solo tendra estos estados los tickets
        DB::table('estados_ticket')->insert([
            ['nombre_estado' => 'Sin asignar'],
            ['nombre_estado' => 'En proceso'],
            ['nombre_estado' => 'Finalizado'],
        ]);

        // El primer usuario ser adminiostrados como el usuario de prueba
        DB::table('usuarios')->insert([
            'nombre_completo' => 'Jonathan',
            'puesto' => 'Soporte IT',
            'correo_electronico' => 'admin@empresa.com',
            'contrasena_hash' => Hash::make('12345678'),
            'extension_telefono' => '104',
            'id_rol' => 1,
            'id_area' => 1,
        ]);

        // Otros Usuarios iniciales para pruebas en los roles tenico y empleado
        $tecnicoId = DB::table('usuarios')->insertGetId([
            'nombre_completo' => 'Carlos Pérez',
            'puesto' => 'Técnico de Redes',
            'correo_electronico' => 'tecnico@empresa.com',
            'contrasena_hash' => Hash::make('12345678'),
            'extension_telefono' => '105',
            'id_rol' => 2, // Técnico
            'id_area' => 1,
        ]);

        $empleadoId = DB::table('usuarios')->insertGetId([
            'nombre_completo' => 'María López',
            'puesto' => 'Asistente Administrativo',
            'correo_electronico' => 'empleado@empresa.com',
            'contrasena_hash' => Hash::make('12345678'),
            'extension_telefono' => '106',
            'id_rol' => 3, // Empleado
            'id_area' => 2,
        ]);

        // Equipo de red asociado al empleado
        DB::table('equipos_red')->insert([
            'id_usuario' => $empleadoId,
            'nombre_equipo' => 'PC-Empleado-01',
            'direccion_mac' => 'AA:BB:CC:DD:EE:01',
            'numero_inventario' => 'INV-EMP-001',
        ]);

        // Ticket de prueba creado por empleado y asignado al técnico
        $ticketId = DB::table('tickets')->insertGetId([
            'descripcion_empleado' => 'La computadora no enciende.',
            'prioridad' => 'Alta',
            'empleado_id' => $empleadoId,
            'tecnico_id' => $tecnicoId,
            'categoria_id' => 1, // Hardware
            'estado_id' => 2, // En proceso
        ]);

        // Bitácora del ticket registrada por el técnico
        DB::table('bitacora_tickets')->insert([
            'id_ticket' => $ticketId,
            'id_usuario' => $tecnicoId,
            'descripcion_trabajo' => 'Se revisó la fuente de poder y se reemplazó.',
        ]);

    }
}
