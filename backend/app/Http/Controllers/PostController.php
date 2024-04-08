<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::get();
        return view('dashboard.posts.index', compact('posts'));
    }

    public function create()
    {
        return view('dashboard.posts.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:posts,email',
            'mobile' => ['required', 'regex:/^(079|078|077)\d{7}$/'],
            'address' => 'required',
            'role' => 'required',
            'password' => ['required', 'min:8'],
        ]);

        $post = new Post();

        $post->name = $request->input('name');
        $post->email = $request->input('email');
        $post->mobile = $request->input('mobile');
        $post->address = $request->input('address');
        $post->role = $request->input('role');
        $post->password = Hash::make($request->input('password'));

        $post->save();

        return redirect()->route('posts.index')->with('success', 'Post created successfully');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        return view('dashboard.posts.edit', compact('post'));
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'mobile' => ['required', 'regex:/^(079|078|077)\d{7}$/'],
            'address' => 'required',
            'role' => 'required',
        ]);

        $data = $request->except(['_token', '_method']);

        if ($request->hasFile('image')) {
            $newImage = $this->storeImage($request);
            $data['image'] = $newImage;
        }

        Post::where('id', $id)->update($data);

        return redirect()->route('posts.index')->with('success', 'Post updated successfully');
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }

    private function storeImage(Request $request)
    {
        $imagePath = $request->file('image')->store('public/images');
        return asset('storage/' . $imagePath);
    }



// class PostController extends Controller
// {
//     /**
//      * Display a listing of the resource.
//      *
//      * @return \Illuminate\Http\Response
//      */
//     public function index()
//     {
//         //
//         $posts=Post::get();
//         return view('dashboard.posts.index', compact('posts'));
//     }

//     /**
//      * Show the form for creating a new resource.
//      *
//      * @return \Illuminate\Http\Response
//      */
//     public function create()
//     {
//         //
//         return view('dashboard.posts.create');

//     }

//     /**
//      * Store a newly created resource in storage.
//      *
//      * @param  \Illuminate\Http\Request  $request
//      * @return \Illuminate\Http\Response
//      */
//     public function store(Request $request)
//     {
//         //
//         $request->validate([
//             'name' => 'required',
//             'email' => 'required|email|unique:users,email',
//             'mobile' => ['required', 'regex:/^(079|078|077)\d{7}$/'],
//             'address' => 'required',
//             'role' => 'required',
//             'password' => [
//                 'required',
//                 'min:8'
//                 // 'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'
//             ]
//         ]);

//         $posts = new Post();

//         $posts->name = $request->input('name');
//         $posts->email = $request->input('email');
//         $posts->phone = $request->input('mobile');
//         $posts->address = $request->input('address');
//         $posts->role = $request->input('role');
//         $posts->password = Hash::make ($request->input('password'));

//         $posts->save();

//         return redirect()->route('posts.index')->with('success', 'post created successfully');
//     }

//     /**
//      * Display the specified resource.
//      *
//      * @param  \App\Models\Post  $post
//      * @return \Illuminate\Http\Response
//      */
//     public function show(Post $post)
//     {
//         //
//     }

//     /**
//      * Show the form for editing the specified resource.
//      *
//      * @param  \App\Models\Post  $post
//      * @return \Illuminate\Http\Response
//      */
//     public function edit(Post $post, $id)
//     {
//         //
//         $posts = Post::findOrFail($id);
//         return view('dashboard.posts.edit', compact('posts'));
//     }

//     /**
//      * Update the specified resource in storage.
//      *
//      * @param  \Illuminate\Http\Request  $request
//      * @param  \App\Models\Post  $post
//      * @return \Illuminate\Http\Response
//      */
//     public function update(Request $request, Post $post, $id)
//     {
//         //
//         //
//         $validatedData = $request->validate([
//             'name' => 'required',
//             // 'image' => 'required',
//             'main_price' => 'required',
//             'description' => 'required',
//         ]);
//         $data = $request->except(['_token', '_method']);

//         // Check if a new image was uploaded
//         if ($request->hasFile('image')) {
//             $newImage = $this->storeImage($request);

//             // Update the image column only if a new image was uploaded
//             $data['main_image'] = $newImage;
//         }

//         Post::where('id', $id)->update($data);


//         return redirect()->route('posts.index')->with('success', 'Product updated successfully');
//     }

//     /**
//      * Remove the specified resource from storage.
//      *
//      * @param  \App\Models\Post  $post
//      * @return \Illuminate\Http\Response
//      */
//     public function destroy(Post $post, $id)
//     {
//         //
//         Post::destroy($id);
//         return back()->with('success', 'Post deleted successfully.');
//     }
// }
public function getAllPost()
    {
        //
        $posts = post::all();
        return response()->json($posts);
        
    }

   
    public function createPost(Request $request)
    {
        $posts = new post();

        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $posts->image = $filename;
        }

        $posts->title = $request->title;

        $posts->description = $request->description;

       

        $posts->user_id = $request->user_id;

        $posts->save();

        return response($posts, 201);
    }

    
    public function getPost($id)
    {
        $posts = post::find($id);
        if (!$posts) {
            return response()->json(['error' => 'post not found'], 404);
        }
        return response()->json($posts);
    }

    public function updatePost( Request  $request ,$id )
    {
        $posts = post::find($id);

        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $posts->image = $filename;
        }



       $posts->title = $request->title;

        $posts->description = $request->description;

        

        $posts->user_id = $request->user_id;

        $posts->updat();

        return response($posts, 201);
    }

    
    public function destroyPost($id)
    {
        $posts = Post::find($id); 
        if (!$posts) {
            return response()->json(['error' => 'post not found'], 404);
        }
    
        $posts->delete(); 
    
        return response()->json(['message' => 'posts deleted']);
    }
}