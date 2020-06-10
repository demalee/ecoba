<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Message;
use App\User;
use Faker\Generator as Faker;

$factory->define(Message::class, function (Faker $faker) {
    $users_id = function () use ($faker) {
        $users = null;
        if (User::count() < 4) {
            $users = factory(App\User::class, 4)->create();
        } else {
            $users = User::select('id')
                ->take(4)
                ->get();
        }

        $user_ids = [];
        foreach ($users as $index => $user) {
            array_push($user_ids, $user->id);
        }

        return $user_ids;
    };

    return [
        'message' => $faker->realText($maxNbChars = 100, $indexSize = 2) ,
        'sender_id' => $faker->randomElement($array = $users_id()),
        'receiver_id' => $faker->randomElement($array = $users_id()),
    ];
});
