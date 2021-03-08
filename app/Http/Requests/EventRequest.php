<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3',
            'date' => 'required|date',
            'desc' => 'required',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Email é requerido',
            'date.required' => 'Nome é requerido',
            'desc.required' => 'Descrição é requerido',
            'date.date'=> 'Digite uma data válida'
        ];
    }
}
