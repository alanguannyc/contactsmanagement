@extends('layout.master')

@section('content')

<h3>Hotels</h3>


<div>
<!-- Button trigger modal -->
<button type="button" id="hotel_edit_btn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
        EDIT
      </button>
      <button type="button" id="hotel_delete_btn" class="btn btn-danger">
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
            <div class="modal-body" id="edit_body">
                    <form autocomplete="off">
                        <div class="form-group autocomplete">
                                <label for="exampleFormControlInput1">Hotel</label>
                                <input type="text" class="form-control" id="hotelName" name="name" placeholder="" value="" required>
                        </div>
                        <div class="form-group">
                            
                            <label for="exampleFormControlInput1">address</label>
                            <input type="text" class="form-control" id="hotelAddress" name="address" placeholder="Enter address" >
                        </div>
                            <button type="button" id="btn_edit_hotel" data-dismiss="modal"  class="btn btn-primary">Edit</button>
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

<table id="hotel_table" class="display">
        
    <thead>
        <tr>
                <th></th>
            <th>Name</th>
            <th>Address</th>
            <th>Added Date</th>
            
        </tr>
    </thead>
    
</table>



@endsection
