

@extends('layouts.app')

@section('content')
<div class="container">
    
        <div class="input-group">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="exceldoc">
                  <label class="custom-file-label" for="exceldoc">Choose file</label>
                </div>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" id="#upload-btn" type="button">Upload</button>
                </div>
              </div>
              <div class="alert alert-success" id="success-upload" style="display:none">
                </div>
</div>


@endsection


