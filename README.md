# SoportITO

            Instituto Tecnólogico de Oaxaca
            Ing. en Sistemas Computacionales
                
            Equipo 7:
            Badiola Barrita Jonathan
            Flores Santiago Wilver Alfredo

            Grupo: 7SB
                
            Docente: Martinez Nieto Adelina

## Descripción 
__SuportITO__  es una aplicacion web  para dar _soporte tecnico_ a los empleados de una empresa mediante la _gestion de tickets_.
La funcion de la aplicacion es, ser el medio para reportar fallas de diferentes tipos (hardware, software o red), gestionar los reportes mediante tickets, asignar tecnicos para solucionar los tickets y llevar un registro de incidencias centralizado.

### Problematica
Es un sistema que nos va a permitir almacenar de forma segura y continua las solicitudes que se realicen dia a dia en alguna empresa en los temas de soporte tecnico, como son los problemas de algun otro sistema (como ejemplo puede ser fallo al subir algun archivo, fallo de ingreso al sistema), de algun fallo tecnico (como computadora lenta, creacion de carpeta compartida, etc) en algun equipo y en algun fallo en la red dentro de la empresa (puede ser una computadora sin internet, impresora sin internet, etc).

Se busca que cada empleado cuente con un usuario para ingresar al sistema, con la finalidad de realizar alguna solicitud y al mismo tiempo monitorear el seguimiento e historial de las solicitudes ya realizadas.

## Modulos
Indicar los modulos principales del sistema (minimo 4 entidades no triviales)
Modulos propuestos:
- Usuarios
- Tickets
- ??
- ??


## Roles de usuario
__SuportITO__ contará con tres roles de usuarios donde cada uno tiene definida sus propios permisos y responsabilidades. Los roles son

- __Empleado:__ Prodra crear una solicitud, asi como monitorear el segumiento del ticket y el historial de tickets solicitados

- __Administrador:__ El Administrador del sistema al recibir la solicitud de algun empleado, esta sera analizada y turnada al personal especializado en el tema de ayuda.

- __Tecnico:__ Se encargara de solucionar el problema de su ticket o tickets asignados, tendra la responsabilidad de actualizar el estado del ticket y detallar lo realizado. esto con la fianlidad de poder tener una bitacora de lo realizado.

## Tecnologias utilizadas
### Frontend
- HTML 5
- CSS 3
- JavaScript
- React
- Vite
- Node.js

### Backend
- PHP
- Laravel
- Composer

### Servicios
- VPS
- MySQL
- Nginx
- Postfix
- Twilio

### Herramientas CASE
- Draw.io
- GitHub
- GitHub Proyects

## Guía de Instalación
### Requisitos del sistema
- PHP 8.2 o superior
- Composer
- Node.js

### Descarga
Descarga o clona este repositorio en tu propia maquina.

### Instalacion de dependencias
Para instalar los paquetes necesarios del frontend ejecuta el siguiente comando en la raiz del proyecto ``.\react_front``


Para instalar los paquetes necesarios del backends ejecuta el siguiente comando en la raiz del proyecto ``.\laravel_back``

### Configuracion de las variables del sistema
Como definir el archivo .env

### Ejecutar el sistema

## Guía de Inicio
El proyecto tiene las siguientes credenciales por default para poder probar el sistema:
```
Nombre: admin
Correo: admin@correo.com
Contraseña: Adm1n1$trad0r
```

## Diseño del sistema

### Diagrama Entidad-Relacion
insertar diagra
### Modelo Relacional
insertar modelo

## Link del prototipo en Figma
- Link a mockup de figma

## Link a los recursos de GitHub
- Link para el repositorio de github
- Link para el tablero de github proyects

## Link del VPS
Demo del proyecto final y su acceso en el VPS



