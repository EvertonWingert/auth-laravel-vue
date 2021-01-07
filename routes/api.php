<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventoController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/* Auth */
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
Route::resource('evento', EventoController::class);


/* Rotas autenticadas */
Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[AuthController::class,'logout']);
});


/* Rotas administrativas */