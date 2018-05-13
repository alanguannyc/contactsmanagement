<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hotel;
use App\Contact;

class ContactController extends Controller
{
    public function validated(){
        $request->validate([
            'name' => 'required|max:255',
            'position' => 'required|max:255',
            'email' => 'required|max:255',
            'title' => 'required|max:255',
            
        ]);
    }

    public function store( Request $request ) {
        $request->validate([
            'name' => 'required|max:255',
            'position' => 'required|max:255',
            'email' => 'required|max:255',
            'title' => 'required|max:255',
            
        ]);


        $hotel_id = $request->input('hotel_id');
        $hotel = Hotel::find($hotel_id);
        
        $hotel->addContact(
            new Contact(request(['name','position','title','email','phone']))
        );
        session()->flash('message','Your contact has been added!');
    }

    public function update(Request $request) {
        $contact = Contact::findOrFail($request->id);
        $contact = $contact->update($request->all());
        session()->flash('message','Your contact information has been updated!');
    }

    public function destroy($id) {
        $contact= Contact::find($id);
        $contact->delete();
        return $contact;
    }
}
