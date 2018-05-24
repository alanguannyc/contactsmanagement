<?php

namespace App\Http\Controllers;

use App\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|max:255',
            
        ]);

        $hotel_name = $request->name;
        $hotel_address = $request->address;

        if ($hotel_address == "") {
            $hotel=Hotel::firstOrCreate(['name'=>$hotel_name]);
        } else if($hotel_address !== "") {
            
            $hotel=Hotel::updateOrCreate(['name'=>$hotel_name, 'address'=>$hotel_address]);
        }
        // $hotel=Hotel::create(request(['name','address']));
        // session()->flash('message','Your hotel has been added!');
        return $hotel;

        
        // return redirect('/admin');
    }

    public function update(Request $request) {
        $hotel = Hotel::findOrFail($request->id);
        $hotel = $hotel->update($request->all());
        session()->flash('message','Your hotel information has been udpated!');
    }

    public function destroy($id) {
        $hotel= Hotel::find($id);
        $hotel->delete();
        return $hotel;
    }
}
