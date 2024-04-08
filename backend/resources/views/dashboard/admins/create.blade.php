@extends('dashboard.dashboard_layouts.master')

@section('title','Create New Admin')


@section('css')
@endsection

@section('title_page1')
Admins
@endsection

@section('title_page2')
Create New Admin
@endsection

@section('content')


<form method="POST" style="width: 80%; margin: 50px auto" action="{{ route('admins.store') }}" enctype="multipart/form-data">
    @csrf
        <div class="form-group" >
          <label for="first_name">Admin first name:</label>
          <input type="text" name="first_name" class="form-control" id="first_name"  placeholder="Enter admin first name">
          @error('first_name') <span class="text-danger">{{ $message }}</span>   @enderror
        </div>
        <div class="form-group" >
          <label for="last_name">Admin last name:</label>
          <input type="text" name="last_name" class="form-control" id="last_name"  placeholder="Enter admin last name">
          @error('last_name') <span class="text-danger">{{ $message }}</span>   @enderror
        </div>

        <div class="form-group">
          <label  for="email">Admin Email:</label>
          <input type="email" name="email" class="form-control" id="email"  placeholder="Enter admin email ">
          @error('email') <span class="text-danger">{{ $message }}</span>   @enderror
        </div>

        <div class="form-group">
            <label  for="admin_password">Admin Password:</label>
            <input type="password" name="password" class="form-control" id="password"  placeholder="Enter admin password ">
            @error('password') <span class="text-danger">{{ $message }}</span>   @enderror
        </div>
        <div class="form-group">
            <label for="image">Image:</label>
            <input type="file"  class="form-control" name="image" required width="100px" height="100px">
            @error('image')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <br>
        <input type="submit" value="Add Admin" class="btn btn-success"><br>
      </form>






@endsection

@section('scripts')

@endsection
