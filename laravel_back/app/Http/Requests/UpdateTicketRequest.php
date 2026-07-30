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
             $isPatch = $this->isMethod('patch');

             return [
                 'descripcion_empleado' => [$isPatch ? 'sometimes' : 'required', 'string'],
                 'prioridad'            => [$isPatch ? 'sometimes' : 'required', 'string', 'max:50'],
                 'empleado_id'          => [$isPatch ? 'sometimes' : 'required', 'integer', 'exists:usuarios,id_usuario'],
                 'tecnico_id'           => ['nullable', 'integer', 'exists:usuarios,id_usuario'],
                 'categoria_id'         => [$isPatch ? 'sometimes' : 'required', 'integer', 'exists:tipos_ticket,id_tipo'],
                 'estado_id'            => [$isPatch ? 'sometimes' : 'required', 'integer', 'exists:estados_ticket,id_estado'],
             ];
         }
}
