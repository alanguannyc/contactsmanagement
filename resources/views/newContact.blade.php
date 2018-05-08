@extends('layout.master')

@section('content')
<form autocomplete="off">
        <div class="form-group autocomplete">
                <label for="exampleFormControlInput1">Hotel</label>
                <input type="text" class="form-control" id="hotel" name="hotel" placeholder="" required>
                </div>
        <div class="form-group">
    <div class="form-group">
            <label for="exampleFormControlInput1">Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Name" required>
            </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Email address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Position</label>
      <select class="form-control" id="exampleFormControlSelect1" placeholder="Please Select" required>
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
            <label for="exampleFormControlInput1">Title</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Position Title">
            </div>
    <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Phone Number">
            </div>
</form>
@endsection