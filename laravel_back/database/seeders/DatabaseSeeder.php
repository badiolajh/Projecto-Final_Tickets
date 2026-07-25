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
            'contrasena_hash' => Hash::make('12345'),
            'extension_telefono' => '104',
            'id_rol' => 1,
            'id_area' => 1,
        ]);
    }
}
