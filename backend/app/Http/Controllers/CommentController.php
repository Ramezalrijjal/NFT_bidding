<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::get();
        return view('dashboard.comments.index', compact('comments'));
    }

    // public function create()
    // {
    //     return view('dashboard.comments.create');
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'email' => 'required|email|unique:comments,email',
    //         'mobile' => ['required', 'regex:/^(079|078|077)\d{7}$/'],
    //         'address' => 'required',
    //         'role' => 'required',
    //         'password' => ['required', 'min:8'],
    //     ]);

    //     $comment = new Comment();

    //     $comment->name = $request->input('name');
    //     $comment->email = $request->input('email');
    //     $comment->phone = $request->input('mobile');
    //     $comment->address = $request->input('address');
    //     $comment->role = $request->input('role');
    //     $comment->password = Hash::make($request->input('password'));

    //     $comment->save();

    //     return redirect()->route('comments.index')->with('success', 'Comment created successfully');
    // }

    // public function edit($id)
    // {
    //     $comment = Comment::findOrFail($id);
    //     return view('dashboard.comments.edit', compact('comment'));
    // }

    // public function update(Request $request, $id)
    // {
    //     $validatedData = $request->validate([
    //         'name' => 'required',
    //         'mobile' => ['required', 'regex:/^(079|078|077)\d{7}$/'],
    //         'address' => 'required',
    //         'role' => 'required',
    //     ]);

    //     $data = $request->except(['_token', '_method']);

    //     if ($request->hasFile('image')) {
    //         $newImage = $this->storeImage($request);
    //         $data['image'] = $newImage;
    //     }

    //     Comment::where('id', $id)->update($data);

    //     return redirect()->route('comments.index')->with('success', 'Comment updated successfully');
    // }

    public function destroy($id)
    {
        Comment::destroy($id);
        return redirect()->route('comments.index')->with('success', 'Comment deleted successfully');
    }
    
    // private function storeImage(Request $request)
    // {
    //     $imagePath = $request->file('image')->store('public/images');
    //     return asset('storage/' . $imagePath);
    // }


public function getAllComment()
    {
        //
        $comments = Comment::all();
        return response()->json($comments);
        
    }

   
    public function createComment(Request $request)
    {
        $comments = new Comment();

       
        $comments->content = $request->content;

        $comments->user_id = $request->user_id;

        $comments->post_id = $request->post_id;

        $comments->likes = $request->likes;

       

        $comments->save();

        return response($comments, 201);
    }

    
    public function getComment($id)
    {
        $comments = Comment::find($id);
        if (!$comments) {
            return response()->json(['error' => 'comments not found'], 404);
        }
        return response()->json($comments);
    }

    public function updateComment( Request  $request ,$id )
    {
        $comments = Comment::find($id);

        $comments->content = $request->content;

        $comments->user_id = $request->user_id;

        $comments->post_id = $request->post_id;

        $comments->likes = $request->likes;

        $comments->updat();

        return response($comments, 201);
    }

    
    public function destroyComment($id)
    {
        $comments = Comment::find($id); 
        if (!$comments) {
            return response()->json(['error' => 'Comment not found'], 404);
        }
    
        $comments->delete(); 
    
        return response()->json(['message' => 'Comment deleted']);
    }
}