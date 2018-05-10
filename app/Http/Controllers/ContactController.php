<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hotel;
use App\Contact;

class ContactController extends Controller
{
    public function store( Request $request ) {
        $hotel_id = $request->input('hotel_id');
        $hotel = Hotel::find($hotel_id);
        
        $hotel->addContact(
            new Contact(request(['name','position','title','email','phone']))
        );
    }
}
