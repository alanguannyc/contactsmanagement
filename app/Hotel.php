<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    public function contacts(){
        return $this->hasMany('App\Contact');
    }
}
