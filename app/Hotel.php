<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $fillable = [
        'name', 'address'
    ];
    public function contacts(){
        return $this->hasMany('App\Contact');
    }
    public function addContact($request){
        $this->contacts()->save($request);
    }

    


}
