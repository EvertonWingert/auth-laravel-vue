<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email' => 'required|email',
            'password' => 'required|min:8',
        ];
    }
    public function messages()
    {
        return [
            
            'email.required' => 'Email é requerido',
            'email.email' => 'Digite um email valido',
            'password.min' => 'A senha precisa ter pelo menos :min dígitos ',
            
        ];
    }
}
