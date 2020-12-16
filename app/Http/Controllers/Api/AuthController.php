<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        //Validar
        $validator = Validator::make($request->all(),[
            'email' => 'required|email','max:255',
            'password' => 'required','max:255',
        ]);
        if($validator->fails()){
            return response()->json(['status_code'=>400, 'message'=> 'Bad Request']);
        }
        
        $credentials = request(['email','password']);

        if(!Auth::attempt($credentials)){
            return response()->json([
                'status_code'=>500,
                'message'=>'Sem autorização',
                
            ]);
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
    public function register(Request $request)
    {
        //Validar
        $validator = Validator::make($request->all(),[
            'name' => 'required','max:255','string',
            'email' => 'required|email|unique:users','string','max:255',
            'password' => 'required','max:255',
        ]);
        if($validator->fails()){
            return response()->json(['status_code'=>400, 'message'=> 'Bad Request']);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'status_code'=>200,
            'message'=>'Usuario registrado',
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
