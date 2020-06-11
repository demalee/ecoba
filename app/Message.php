<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['message'];

    /**
     * The user that sends the message.
     */
    public function sender()
    {
        return $this->belongsTo('App\User', 'sender_id');
    }

    /**
     * The user that receives the message.
     */
    public function receiver()
    {
        return $this->belongsTo('App\User', 'receiver_id');
    }

    /**
     * Format the message object for response output.
     *
     * @param  \App\Message $message
     * @return array
     */
    public function formatMessageOutput(Message $message)
    {
        return [
            "id" => $message->id,
            "message" => $message->message,
            "created_at" => $message->created_at->format('g:i A \| F d'),
            "sender" => [
                "id" => $message->sender->id,
                "name" => $message->sender->name,
            ],
            "receiver" => [
                "id" => $message->receiver->id,
                "name" => $message->receiver->name,
            ]
        ];
    }
}
