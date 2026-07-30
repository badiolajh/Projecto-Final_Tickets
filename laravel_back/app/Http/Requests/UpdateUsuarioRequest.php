<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUsuarioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Obtenemos el usuario de la ruta
        $usuario = $this->route('usuario');

        // Determinamos si es una petición PUT o PATCH para ajustar las reglas 'sometimes'
        $isPatch = $this->isMethod('patch');
        $prefix = $isPatch ? 'sometimes|' : '';

        return [
            'nombre_completo' => [$prefix . 'required', 'string', 'max:255'],
            'puesto' => [$prefix . 'required', 'string', 'max:255'],
            'correo_electronico' => [
                $prefix . 'required',
                'email',
                Rule::unique('usuarios', 'correo_electronico')->ignore($usuario->id_usuario, 'id_usuario')
            ],
            'contrasena_hash' => [$prefix . 'required', 'string', 'min:8'],
            'extension_telefono' => ['nullable', 'string', 'max:4'],
            'foto_url' => ['nullable', 'string', 'max:255'],
            'id_rol' => [$prefix . 'required', 'integer', 'exists:rol,id_rol'],
            'id_area' => [$prefix . 'required', 'integer', 'exists:areas,id_area'],
        ];
    }
}
