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

        // Técnicos
        $tecnicos = [];
        for ($i = 1; $i <= 5; $i++) {
            $tecnicos[] = DB::table('usuarios')->insertGetId([
                'nombre_completo' => "Tecnico $i",
                'puesto' => 'Técnico de Soporte',
                'correo_electronico' => "tecnico$i@empresa.com",
                'contrasena_hash' => Hash::make('12345678'),
                'extension_telefono' => "20$i",
                'id_rol' => 2,
                'id_area' => 1,
            ]);
        }

        // Empleados
        $empleados = [];
        for ($i = 1; $i <= 5; $i++) {
            $empleados[] = DB::table('usuarios')->insertGetId([
                'nombre_completo' => "Empleado $i",
                'puesto' => 'Empleado de área',
                'correo_electronico' => "empleado$i@empresa.com",
                'contrasena_hash' => Hash::make('12345678'),
                'extension_telefono' => "30$i",
                'id_rol' => 3,
                'id_area' => rand(2, 9), // asignar a distintas áreas
            ]);
        }

        // Equipos de red (15 en total, repartidos entre empleados)
        for ($i = 1; $i <= 15; $i++) {
            DB::table('equipos_red')->insert([
                'id_usuario' => $empleados[array_rand($empleados)],
                'nombre_equipo' => "Equipo-$i",
                'direccion_mac' => sprintf("AA:BB:CC:DD:EE:%02d", $i),
                'numero_inventario' => "INV-$i",
            ]);
        }

        // Tickets de prueba (15 en total, repartidos entre técnicos y empleados)
        $tickets = [];
        for ($i = 1; $i <= 15; $i++) {
            $tickets[] = DB::table('tickets')->insertGetId([
                'descripcion_empleado' => "Problema de prueba $i",
                'prioridad' => ['Alta', 'Normal', 'Baja'][array_rand(['Alta', 'Normal', 'Baja'])],
                'empleado_id' => $empleados[array_rand($empleados)],
                'tecnico_id' => $tecnicos[array_rand($tecnicos)],
                'categoria_id' => rand(1, 3),
                'estado_id' => rand(1, 3),
            ]);
        }

        // Bitácora de tickets (15 registros, uno por ticket)
        foreach ($tickets as $ticketId) {
            DB::table('bitacora_tickets')->insert([
                'id_ticket' => $ticketId,
                'id_usuario' => $tecnicos[array_rand($tecnicos)],
                'descripcion_trabajo' => "Trabajo realizado en ticket $ticketId",
            ]);
        }
    }
}
