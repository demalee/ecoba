<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Website routes
Route::get('/', function () {
    return view('welcome');
});
Route::get('shop/index', function () {
    return view('shop/index');
});

Route::get('our-services/index', function () {
    return view('our-services/index');
});
Route::get('blog/index', function () {
    return view('blog/index');
});
Route::get('about-us/index', function () {
    return view('about-us/index');
});

// routes for chat functionality
Route::get('chats', function () {
    return view('chat.index');
})->middleware('auth');

Route::resource('messages', 'MessageController')->only([
    'index', 'store', 'show'
]);
