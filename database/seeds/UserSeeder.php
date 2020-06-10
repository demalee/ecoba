<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // main test user
        $user_1 = User::create([
          'name'=>'John Doe',
          'email' => 'john@doe.com',
          'password' => bcrypt('password'),
          'email_verified_at'=> date("Y-m-d H:i:s"),
          'created_at' => date("Y-m-d H:i:s"),
        ]);

        $admin = User::create([
          'name'=>'Jane Doe',
          'email' => 'jane@doe.com',
          'password' => bcrypt('password'),
          'email_verified_at'=> date("Y-m-d H:i:s"),
          'created_at' => date("Y-m-d H:i:s"),
        ]);

        // other users
        $items = factory(User::class, 2)->create();
    }
}
