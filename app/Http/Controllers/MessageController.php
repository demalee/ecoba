<?php

namespace App\Http\Controllers;

use App\User;
use App\Message;
use App\Events\InstantMessaging;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     * Get contact list for chat.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $contacts = Message::with(['sender:id,name', 'receiver:id,name'])
        //     ->select('id')
        //     ->where('sender_id', Auth::user()->id)
        //     ->orWhere('receiver_id', Auth::user()->id)
        //     ->get();
        //     // ->groupBy('account_id')

        $contacts = User::select('id', 'name')
            ->with(['sent_messages:id,message'])
            ->get();

        return response()->json($response_data = [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'message' => ['required','string','max:255'],
            'receiver' => ['required','exists:App\User,id']
        ]);

        // create and save message
        $message = new Message($validatedData);
        $message->sender()->associate(Auth::user());
        $message->receiver()->associate(User::findOrFail($validatedData['receiver']));
        $message->save();

        // broadcast message
        broadcast(new InstantMessaging($message))->toOthers();

        return response()->json([
            'success' => 'Message sent!',
        ]);
    }

    /**
     * Display the specified resource.
     * Get the messages for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($response_data = [
            'messages' => Message::all(),
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
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
