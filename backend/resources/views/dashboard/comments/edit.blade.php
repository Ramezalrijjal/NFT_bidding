@extends('dashboard.dashboard_layouts.master')

@section('title','Edit partner')


@section('css')
@endsection

@section('title_page1')
Edit

@endsection
@section('title_page2')
Edit Partners
@endsection

@section('content')

<div class="container-fluid">
    <h2>Edit partner Information</h2>

    <form action="{{ route('comments.update', $comments->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Partner Name:</label>
            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror" required
                value="{{ old('name', $comments->name) }}">
            @error('name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
        {{-- <input type="submit" value="Update" class="btn btn-primary"> --}}
    </form>
    </div>
</div>



@endsection

@section('scripts')

@endsection
