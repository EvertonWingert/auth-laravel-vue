<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        //Validar
        $request->validated();


        $credentials = request(['email','password']);

        if(!Auth::attempt($credentials)){
            throw ValidationException::withMessages(['email' => 'Credenciais incorretas']);
        }
        


        $user = User::where('email',$request->email)->first();
        $tokenResult = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status_code'=>200,
            'message'=>'Usuario logado',
            'token' => $tokenResult
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {
        //Validar
        $request->validated();
         
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        $tokenResult = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            'status_code'=>200,
            'message'=>'Usuario registrado',
            'token' => $tokenResult
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request){
        $request->user()->currentAcessToken()->delete();
        return response()->json([
            'status_code' => 200,
            'message' => 'Token deletado'
        ]);
    }
}
