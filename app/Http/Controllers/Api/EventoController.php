<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Evento::all();
        return response()->json([
            'status_code' => 200,
            'dados' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\EventRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventRequest $request)
    {

       
        $request->validated();
        $event = Evento::create([
            'name' => $request['name'],
            'date' => $request['date'],
            'desc' => $request['desc'],
        ]);


        $event->save();

        return response()->json([
            'status_code' => 200,
            'message' => 'Evento criado'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Evento::findOrFail($id);
        return response()->json([
            'status_code' => 200,
            'dados' => $event
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\EventRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EventRequest $request, $id)
    {

        $request->validated();
        $event = Evento::findOrFail($id);
        $event->update([
            'name' => $request['name'],
            'date' => $request['date'],
            'desc' => $request['desc'],
        ]);

        return response()->json([
            'status_code' => 200,
            'message' => 'Evento atualizado'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Evento::findOrFail($id)->delete();

        return response()->json([
            'status_code' => 200,
            'message' => 'Evento deletado'
        ]);
    }
}
