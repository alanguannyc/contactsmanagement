@extends('layout.master')

@section('content')

<div class="alert alert-danger" style="display:none"></div>
<div class="alert alert-success" style="display:none"></div>
<form autocomplete="off"  method="POST">
    @csrf
        <div class="form-group autocomplete">
                <label for="exampleFormControlInput1">Hotel</label>
                <input type="text" class="form-control" id="hotelName" name="hotelName" placeholder="" required>
                </div>
        <div class="form-group">
    <div class="form-group">
            <label for="exampleFormControlInput1">address</label>
            <input type="text" class="form-control" id="hotelAddress" name="hotelAddress" onfocus="this.value=''" placeholder="Enter address" >
            </div>
    <button type="submit" id="btn_hotel" class="btn btn-primary">Add</button>
</form>
@endsection