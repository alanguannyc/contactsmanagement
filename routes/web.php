<?php

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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/hotel', function () {
    return view('hotelIndex');
});

Route::group(['prefix' => 'add'], function () {
    Route::get('/add', function () {
        return view('newContact');
    });

    Route::get('/contact', function () {
        return view('newContact');
    });

    Route::get('/hotel', function () {
        return view('newHotel');
    });
});



Route::group(['prefix' => 'api/v1'], function () {
    Route::get('/contact', function(){
        return $contacts=\App\Contact::with('hotel')->get();
    });

    Route::get('/hotel', function(){
        return $hotels=App\Hotel::all();
    });

    Route::post('/hotel', 'HotelController@store');
    Route::post('/hotel/edit', 'HotelController@update');
    Route::delete('/hotel/{id}', 'HotelController@destroy');

    Route::post('/contact', 'ContactController@store');

});

Route::group(['prefix' => 'admin',  'middleware' => ['auth','admin']], function()
{
    Route::get('/', function() {
        return view('index');
    })->name('index');

    Route::get('/contact', 'ContactController@index')->name('user');
    // Route::get('/user/api', function () {
    //     return $users=App\User::with(['profile'])->get();
    // });
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
