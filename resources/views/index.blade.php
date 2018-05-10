@extends('layout.master')

@section('content')

<h3>users</h3>

@include('layout.modal')

<table id="user_table" class="display">
        
    <thead>
        <tr>
                <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Position</th>
            <th>Title</th>
            <th>Phone</th>
            <th>Added Date</th>
        </tr>
    </thead>
    
</table>



@endsection
