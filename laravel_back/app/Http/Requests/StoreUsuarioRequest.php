<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUsuarioRequest extends FormRequest
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
        return [
            'nombre_completo' => ['required', 'string', 'max:255'],
            'puesto' => ['required', 'string', 'max:255'],
            'correo_electronico' => ['required', 'email', 'unique:usuarios,correo_electronico'],
            'contrasena_hash' => ['required', 'string', 'min:8'],
            'extension_telefono' => ['nullable', 'string', 'max:4'],
            'foto_url' => ['nullable', 'string', 'max:255'],
            'id_rol' => ['required', 'integer', 'exists:rol,id_rol'],
            'id_area' => ['required', 'integer', 'exists:areas,id_area'],
        ];
    }
}
