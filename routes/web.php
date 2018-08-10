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
use Carbon\Carbon;
Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'hotel',  'middleware' => ['auth','admin']], function()
{
    Route::get('/', function() {
        return view('hotelIndex');
    });

    Route::get('/{id}', function() {
        return view('hotel-show');
    });
    

});

Route::get('/contact', 'ContactController@index');

Route::get('/upload', function () {
    return view('upload');
});

Route::get("/user", function(){
    return view('userIndex');
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


Route::group(['prefix' => 'api/v1','middleware' => ['auth','admin', 'web']], function () {
    Route::get('/contact', function(){
        return $contacts=\App\Contact::with('hotel')->get();
    });

    Route::get('/hotel', function(){
        return $hotels=App\Hotel::with('contacts')->get();
    });

    Route::get('/user', function(){
        return $users=\App\User::with('roles')->get();
    });

    Route::post('/hotel', 'HotelController@store');
    Route::post('/hotel/edit', 'HotelController@update');
    Route::delete('/hotel/{id}', 'HotelController@destroy');
    Route::get('hotel/{id}', 'HotelController@show');

    Route::post('/contact', 'ContactController@store');
    Route::post('/contact/edit', 'ContactController@update');
    Route::delete('/contact/{id}', 'ContactController@destroy');
    Route::get('/contact/{id}', 'ContactController@show');

    Route::resource('user', 'UserController')->except(['index']);
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

// Route::group(['prefix' => 'user','middleware' => ['auth','admin', 'web']], function () {
    
//     Route::resource('user', 'UserController');
//     // Route::get('/', 'UserController@index');
//     // Route::post('/', 'UserController@store');
//     // Route::delete('/', 'UserController@destroy');


// });

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');


//add new columns



