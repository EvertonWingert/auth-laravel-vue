<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'name é requerido',
            'email.required' => 'Nome é requerido',
            'password.required' => 'Descrição é requerido',
            'password.min:8' => 'password muito pequena',
        ];
    }
}
