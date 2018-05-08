<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    public function hotel(){
        return $this->belongsTo('App\Hotel','hotel_id');
    }
}
