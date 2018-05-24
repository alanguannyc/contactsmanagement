@extends('layout.master')

@section('content')

<h3>users</h3>

<div>



    <div class="modal fade" id="user_modal_center" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="user_modal_title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">


                
                    <select class="form-control" id="userRole" name="userRole" placeholder="Please Select" required>
                        <option>member</option>
                        <option>admin</option>
                    </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="userModalSave" data-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>




</div> 




<table id="user_table" class="display">
        
    <thead>
        <tr>
            
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th colspan="2">Action</th>

        </tr>
    </thead>
    
</table>



@endsection
