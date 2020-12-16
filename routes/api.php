<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/* Auth */
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);



/* Rotas autenticadas */
Route::group(['middleware' =>['auth:sanctum']], function(){
    Route::resource('product', ProductController::class);
    Route::post('logout',[AuthController::class,'logout']);

});


/* Rotas administrativas */