@extends('layout.master')

@section('content')
<div class="alert alert-danger" style="display:none"></div>
<div class="alert alert-success" style="display:none"></div>
<form autocomplete="off" id="new_contact">
        <div class="form-group autocomplete">
                <label for="HotelInput">Hotel</label>
                <input type="text" class="form-control" id="hotel" name="hotel" placeholder="Enter Hotel" required>
                </div>
        <div class="form-group">
    <div class="form-group">
            <label for="contactName">Name</label>
            <input type="text" class="form-control" id="contactName" name="ContactName" placeholder="Enter Name" required>
            </div>
    <div class="form-group">
      <label for="contactEmail">Email address</label>
      <input type="email" class="form-control" id="contactEmail" placeholder="name@example.com" required>
    </div>
    <div class="form-group">
      <label for="contactPosition">Position</label>
      <select class="form-control" id="contactPosition" name="contactPosition" placeholder="Please Select" required>
            <option></option>
        <option>General Managers</option>
        <option>Hotel Managers</option>
        <option>Front Office Director</option>
        <option>Director of HR</option>
        <option>Controller</option>
        <option>Director of Sales</option>
        <option>Food and Beverage Director</option>
        <option>Director of Marketing</option>
        <option>Director of Public Relations</option>
        <option>Director of Engineering/Chief Engineer</option>
        <option>Director of Security</option>
        <option>Director/Manager of Banquets</option>
        <option>Director of Revenue/Revenue Manager</option>
        <option>Purchase Manager</option>
        <option>Payroll Accounting</option>
        <option>Director of IT /Digital Space</option>
        <option>Others</option>
      </select>
    </div>
    <div class="form-group">
            <label for="contactTitle">Title</label>
            <input type="text" class="form-control" id="contactTitle" name="contactTitle" required placeholder="Enter Position Title">
            </div>
    <div class="form-group">
            <label for="contactPhone">Phone Number</label>
            <input type="text" class="form-control" id="contactPhone" name="contactPhone" placeholder="Enter Phone Number">
            </div>
        <button type="submit" id="btn_add" class="btn btn-primary">Add</button>

</form>
@endsection