<?php

namespace App\Http\Controllers;

use App\User;
use App\Message;
use App\Facades\MessageFacade;
use App\Events\InstantMessaging;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

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
        $inbox_contacts = User::where('id', '!=', Auth::user()->id)
            ->whereHas('sent_messages', function (Builder $query) {
                $query->where('receiver_id', Auth::user()->id);
            })->get();

        $outbox_contacts = User::where('id', '!=', Auth::user()->id)
            ->whereHas('received_messages', function (Builder $query) {
                $query->where('sender_id', Auth::user()->id);
            })->get();

        $contacts = $inbox_contacts->merge($outbox_contacts)->all();
        $serialized_contacts = [];
        foreach ($contacts  as $key => $user) {
            $data['id'] = $user->id;
            $data['name'] = $user->name;

            $last_message = $this->getLastUserMessage($user);
            $data['last_message'] = $last_message->message;
            $data['last_message_date'] = $last_message->created_at->format('F d');

            array_push($serialized_contacts, $data);
        }

        return response()->json($response_data = [
            'contacts' => $serialized_contacts,
        ]);
    }

    private function getLastUserMessage(User $user)
    {
        $sent_messages = $user->sent_messages()
            ->where('receiver_id', Auth::user()->id)
            ->take(1)
            ->latest()
            ->first();

        $received_messages = $user->received_messages()
            ->where('sender_id', Auth::user()->id)
            ->take(1)
            ->latest()
            ->first();

        if (! $sent_messages or ! $received_messages) {
            if (! $sent_messages) {
                return $received_messages;
            }

            if (! $received_messages) {
                return $sent_messages;
            }
        }

        return ($sent_messages->created_at->greaterThan($received_messages->created_at))
            ? $sent_messages
            : $received_messages;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort(404);
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
            'response_text' => 'Message sent succesfully.',
            'message' => MessageFacade::formatMessageOutput($message),
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
        $outbox = Message::whereHas('receiver', function (Builder $query) use ($id){
            $query->where('id', $id);
        })->whereHas('sender', function (Builder $query) use ($id){
            $query->where('id', Auth::user()->id);
        })->get();

        $inbox = Message::whereHas('receiver', function (Builder $query) use ($id){
            $query->where('id', Auth::user()->id);
        })->whereHas('sender', function (Builder $query) use ($id){
            $query->where('id', $id);
        })->get();

        $messages = $outbox->mergeRecursive($inbox)->all();
        usort($messages, function($first, $second){
            return $first->created_at->greaterThan($second->created_at);
        });

        $serialized_msgs = [];
        foreach ($messages as $key => $message) {
            $serialize = MessageFacade::formatMessageOutput($message);
            array_push($serialized_msgs, $serialize);
        }

        return response()->json($response_data = [
            'messages' => $serialized_msgs,
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
        abort(404);
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
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        abort(404);
    }
}
