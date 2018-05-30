<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Schema;


use Carbon\Carbon;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    Schema::defaultStringLength(191);
        \App\Role::firstOrCreate(['name'=>'admin']);
        \App\Role::firstOrCreate(['name'=>'member']);
        
        
        $users = \DB::table('users')->count();
        $userIncrease = \DB::table('users')->where('created_at', '>', Carbon::now()->startOfWeek())
        ->where('created_at', '<', Carbon::now()->endOfWeek())
        ->count();
        $hotels = \DB::table('hotels')->count();
        $hotelIncrease = \DB::table('hotels')->where('created_at', '>', Carbon::now()->startOfWeek())
        ->where('created_at', '<', Carbon::now()->endOfWeek())
        ->count();
        $contacts = \DB::table('contacts')->count();
        $contactIncrease = \DB::table('contacts')->where('created_at', '>', Carbon::now()->startOfWeek())
        ->where('created_at', '<', Carbon::now()->endOfWeek())
        ->count();

        View::share(['users'=>$users,'hotels'=>$hotels,'contacts'=>$contacts, 'userIncrease'=>$userIncrease, 'hotelIncrease'=>$hotelIncrease, 'contactIncrease'=>$contactIncrease]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
