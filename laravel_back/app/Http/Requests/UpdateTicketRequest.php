<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
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
            'descripcion_empleado' => 'sometimes|string',
            'prioridad'            => 'sometimes|string',
            'empleado_id'          => 'sometimes|exists:usuarios,id_usuario',
            'categoria_id'         => 'sometimes|exists:tipos_ticket,id_tipo', // También ajustado por seguridad con base en tu migración
            'tecnico_id'           => 'nullable|exists:usuarios,id_usuario',
            'estado_id'            => 'sometimes|exists:estados_ticket,id_estado', // ⬅️ CAMBIADO DE 'estados' A 'estados_ticket'
        ];
    }
}
