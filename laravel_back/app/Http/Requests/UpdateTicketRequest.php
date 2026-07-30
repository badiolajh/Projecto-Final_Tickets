<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

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
        $isPatch = $this->isMethod('patch');
        $prefix = $isPatch ? 'sometimes|' : '';

        return [
            'descripcion_empleado' => [$prefix . 'required', 'string'],
            'prioridad' => [$prefix . 'required', 'string', 'max:50'],
            'empleado_id' => [$prefix . 'required', 'integer', 'exists:usuarios,id_usuario'],
            'tecnico_id' => ['nullable', 'integer', 'exists:usuarios,id_usuario'],
            'categoria_id' => [$prefix . 'required', 'integer', 'exists:tipos_ticket,id_tipo'],
            'estado_id' => [$prefix . 'required', 'integer', 'exists:estados_ticket,id_estado'],
        ];
    }
}
