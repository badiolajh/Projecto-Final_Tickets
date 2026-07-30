<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
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
            'descripcion_empleado' => ['required', 'string'],
            'prioridad' => ['required', 'string', 'max:50'],
            'empleado_id' => ['required', 'integer', 'exists:usuarios,id_usuario'],
            'tecnico_id' => ['nullable', 'integer', 'exists:usuarios,id_usuario'],
            'categoria_id' => ['required', 'integer', 'exists:tipos_ticket,id_tipo'],
            'estado_id' => ['required', 'integer', 'exists:estados_ticket,id_estado'],
        ];
    }
}
