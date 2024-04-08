@extends('dashboard.dashboard_layouts.master')

@section('title','Show Partners')


@section('css')
  <link rel="stylesheet" href="{{ asset('assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
  <link rel="stylesheet" href="{{ asset('assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
  <link rel="stylesheet" href="{{ asset('assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">

@endsection

@section('title_page1')

comments
@endsection

@section('title_page2')
comments
@endsection

@section('content')
<!-- Main content -->
<section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div> @if(session()->has('success'))
            <div class="alert alert-success">
              <button type="button" class="close" data-dismiss="alert">x</button>
            {{session()->get('success') }}
            @endif
          </div>
          <div class="card">
            {{-- <div class="card-header">
                <!-- Add a link to create a new user -->
                <a class="btn btn-primary btn-sm float-left" href="{{ route('comments.create') }}">
                    <i class="fas fa-handshake nav-icon"></i> Add New comment
                </a>
            </div> --}}

            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                  <thead>
                      <tr>
                          <th>#ID</th>
                          <th>Content</th>
                          <th>User name</th>
                          <th>Post ID</th>
                          <th>Likes</th>
                          <th>Created At</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      @php
                      $i = 1;
                      @endphp
                      @foreach ($comments as $comment)
                      <tr>
                          <td>{{ $i }}</td>
                          <td>{{ $comment->content }}</td>
                          <td>{{ $comment->user->name }}</td>
                          <td>{{ $comment->post_id }}</td>
                          <td>{{ $comment->likes }}</td>
                          <td>{{ $comment->created_at }}</td>
                          <td class="project-actions">
                              <a class="btn btn-info btn-sm" href="{{ route('comments.edit', $comment->id) }}">
                                  <i class="fas fa-pencil-alt"></i> Edit
                              </a>
                              <form action="{{ route('comments.destroy', $comment->id) }}" method="POST" style="display: inline;">
                                  @method('DELETE')
                                  @csrf
                                  <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this comment?')">
                                      <i class="fas fa-trash"></i> Delete
                                  </button>
                              </form>
                          </td>
                      </tr>
                      @php
                      $i++;
                      @endphp
                      @endforeach
                  </tbody>
                  <tfoot>
                  </tfoot>
              </table>
          </div>
          
            <!-- /.card-header -->
            {{-- <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>partner_name</th>
                    <th>partner_image</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  @php
                  $i=1;
                @endphp
                @foreach ($comments as $comment)
                <td>{{ $i }}</td>
                <td>{{ $comment->name }}</td>
                <td><img src="{{ asset($comment->image) }}" alt="" width="100px" height="100px"></td>
                <td class="project-actions ">
                  {{-- <a class="btn btn-primary btn-sm" href="#">
                      <i class="fas fa-folder">
                      </i>
                      View
                  </a> --}}
                  {{-- <a class="btn btn-info btn-sm" href="{{ route('comments.edit',$comment->id) }}">
                      <i class="fas fa-pencil-alt">
                      </i>
                      Edit
                  </a> --}}
                  {{-- <a class="btn btn-danger btn-sm" href="#">
                      <i class="fas fa-trash">
                      </i>
                      Delete
                  </a> --}}

                  {{-- <form action="{{route('comments.destroy',$comment->id)}}"  method="POST"  style="display: inline;">
                    @method('DELETE')
                    @csrf
                    <button type="submit" class="btn btn-danger btn-sm"
                    onclick="return confirm('Are you sure you want to delete this comments?')">Delete</button>
                  </form>
              </td>
                @php
                  $i++;
                @endphp

                </tr>
                @endforeach

                </tbody>
                <tfoot>
                </tfoot>
              </table>
            </div> --}} 
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </section>
  <!-- /.content -->
@endsection














@section('scripts')
{{-- <script src="../../plugins/datatables/jquery.dataTables.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables/jquery.dataTables.min.js') }}"></script>

{{-- <script src="../../plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js') }}"></script>

{{-- <script src="../../plugins/datatables-responsive/js/dataTables.responsive.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-responsive/js/dataTables.responsive.min.js') }}"></script>

{{-- <script src="../../plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js') }}"></script>

{{-- <script src="../../plugins/datatables-buttons/js/dataTables.buttons.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-buttons/js/dataTables.buttons.min.js') }}"></script>

{{-- <script src="../../plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js') }}"></script>

{{-- <script src="../../plugins/jszip/jszip.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/jszip/jszip.min.js') }}"></script>

{{-- <script src="../../plugins/pdfmake/pdfmake.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/pdfmake/pdfmake.min.js') }}"></script>

{{-- <script src="../../plugins/pdfmake/vfs_fonts.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/pdfmake/vfs_fonts.js') }}"></script>

{{-- <script src="../../plugins/datatables-buttons/js/buttons.html5.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-buttons/js/buttons.html5.min.js') }}"></script>

{{-- <script src="../../plugins/datatables-buttons/js/buttons.print.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-buttons/js/buttons.print.min.js') }}"></script>

{{-- <script src="../../plugins/datatables-buttons/js/buttons.colVis.min.js"></script> --}}
<script type="text/javascript" src="{{ URL::asset('assets/plugins/datatables-buttons/js/buttons.colVis.min.js') }}"></script>


<script>
    $(function () {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
      });
    });
  </script>

@endsection
