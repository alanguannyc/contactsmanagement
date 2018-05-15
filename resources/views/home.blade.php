@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card mb-2" >
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                You are logged in!

                </div>
                
            </div>
            <div class="card ">
                    <div class="card-body">
                      <p class="card-title">Role Type</p>
                    <p class="card-text">Your current Role is {{$role = Auth::user()->roles->pluck('name')[0]}}</p>
                    @if( $role == 'admin')
                      <a href="/admin" class="btn btn-primary" >Go to Admin Panel</a>
                      @endif
                    </div>
                  </div>
        </div>
    </div>
</div>
@endsection
