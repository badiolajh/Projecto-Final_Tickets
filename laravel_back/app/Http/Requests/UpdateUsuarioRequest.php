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
             // Obtenemos el ID del usuario que se está actualizando para ignorar su propio correo en la regla unique
             $usuarioId = $this->route('usuario')?->id_usuario ?? $this->route('usuario');

             return [
                 'nombre_completo' => ['sometimes', 'required', 'string', 'max:255'],
                 'puesto' => ['sometimes', 'required', 'string', 'max:255'],
                 'correo_electronico' => [
                     'sometimes',
                     'required',
                     'email',
                     Rule::unique('usuarios', 'correo_electronico')->ignore($usuarioId, 'id_usuario')
                 ],
                 'contrasena_hash' => ['nullable', 'string', 'min:8'],
                 'extension_telefono' => ['nullable', 'string', 'max:4'],
                 'foto_url' => ['nullable', 'string', 'max:255'],
                 'id_rol' => ['sometimes', 'required', 'integer', 'exists:rol,id_rol'],
                 'id_area' => ['sometimes', 'required', 'integer', 'exists:areas,id_area'],
             ];
         }
}
