@extends('layout.master')

@section('content')

<h3>users</h3>

<div>
        <!-- Button trigger modal -->
        <button type="button" id="contact_edit_btn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                EDIT
              </button>
              <button type="button" id="contact_delete_btn" class="btn btn-danger">
                    Delete
                  </button>
              <!-- Modal -->
              <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="exampleModalLongTitle">Modal title</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" id="edit_body_contact">
                            <form autocomplete="off">
                                    <div class="form-group autocomplete">
                                            <label for="HotelInput">Hotel</label>
                                            <input type="text" class="form-control" id="hotel" name="hotel" placeholder="" required>
                                            </div>
                                    <div class="form-group">
                                <div class="form-group">
                                        <label for="contactName">Name</label>
                                        <input type="text" class="form-control" id="contactName" name="contactName" placeholder="Enter Name" required>
                                        </div>
                                <div class="form-group">
                                  <label for="contactEmail">Email address</label>
                                  <input type="email" class="form-control" id="contactEmail" name="contactEmail" placeholder="name@example.com">
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
                                        <input type="text" class="form-control" id="contactTitle" name="contactTitle" placeholder="Enter Position Title">
                                        </div>
                                <div class="form-group">
                                        <label for="contactPhone">Phone Number</label>
                                        <input type="text" class="form-control" id="contactPhone" name="contactPhone" placeholder="Enter Phone Number">
                                        </div>
                                    <button type="button" id="btn_edit_contact" data-dismiss="modal" class="btn btn-primary">Edit</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </form>
                    </div>
                    <div class="modal-footer">
                      {{-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button> --}}
                    </div>
                  </div>
                </div>
              </div>
            </div>




<table id="contact_table" class="display">
        
    <thead>
        <tr>
                <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Hotel</th>
            <th>Position</th>
            <th>Title</th>
            <th>Phone</th>
            <th>Added Date</th>
        </tr>
    </thead>
    
</table>



@endsection
