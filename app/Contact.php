<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'hotel_id', 'name', 'email', 'phone', 'position', 'title'
    ];

    public function hotel(){
        return $this->belongsTo('App\Hotel','hotel_id');
    }
}
