<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $categories=Category::get();
       return view('dashboard.categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('dashboard.categories.create');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        //
        $relativeImagePath = null; // Initialize relativeImagePath as null

        $newImageName = uniqid() . '-' . $request->addedCategoryName . '.' . $request->file('image')->extension();
        //This line generates a unique image name by combining a unique identifier, the category name (from the request), and the file extension of the uploaded image.
        $relativeImagePath = 'assets/images/' . $newImageName;
        //This line constructs the relative path where the uploaded image will be stored within the public directory. It combines the 'assets/images/' directory with the unique image name.
        $request->file('image')->move(public_path('assets/images'), $newImageName);
        //This line moves the uploaded image file to the specified directory (in this case, public/assets/images) using the generated unique image name.

        // Validate and store the new employee record
        $request->validate([
        'name' => 'required',
        // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,jfif |max:2048',

    ]);

    Category::create([
        'name' => $request->input('name'),
        'image' => $relativeImagePath,
    ]);
   // This code creates a new category record using Laravel's Eloquent ORM. It assigns the 'name' and 'description' values from the request data and sets the 'image' column to the previously calculated $relativeImagePath.

    return redirect()->route('categories.index')->with('success', 'Category created successfully.');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
        $categories = Category::all();

        // dd($categories, $jobs, $partners);
        return view('pages.index', compact('categories'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $categories = Category::findOrFail($id);
        // dd($categories);

        return view('dashboard.categories.edit', compact('categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'name' => 'required',
        ]);

        $data = $request->except(['_token', '_method']);

        // Check if a new image was uploaded
        if ($request->hasFile('image')) {
            $newImage = $this->storeImage($request);

            // Update the image column only if a new image was uploaded
            $data['image'] = $newImage;
        }

        Category::where('id', $id)->update($data);


        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
{
    // Find the category
    $category = Category::findOrFail($id);

    // Delete associated products
    $category->products()->delete();

    // Delete the category
    $category->delete();

    return back()->with('success', 'Category and associated products deleted successfully.');
}


    public function storeImage($request)
    {
        $newImageName = uniqid() . '-' . $request->addedCategoryName . '.' . $request->file('image')->extension();
        $relativeImagePath = 'assets/images/' . $newImageName;
        $request->file('image')->move(public_path('assets/images'), $newImageName);


        return $relativeImagePath;

    }

    public function getAllCategory()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function getCategory($id)
    {
        $categories = Category::find($id);
        if (!$categories) {
            return response()->json(['error' => 'categories not found'], 404);
        }
        return response()->json($categories);
    }

    public function createCategory(Request $request)
    {

        // $validator = Validator::make(
        //     $request->all(),
        //     [
        //         'name' => 'required|string',
        //         'email' => 'email|required|unique:users',
        //         'password' => 'required|min:8',
        //         'phone' => 'required|min:10|max:10',
        //         'image' => 'required|max:5048',
        //     ]
        // );

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()->all()]);
        // }


        $categories = new Category();

        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $categories->image = $filename;
        }

        $categories->name = $request->name;

        $categories->save();

        return response($categories, 201);
    }

    public function updateCategory(Request $request, $id)
    {

        $categories = new Category();
        $categories->name = $request->name;
        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $categories->image = $filename;
        }


        $categories->save();
        return response()->json($categories);

    }

    public function deleteCategory($id)
    {
        $categories = Category::find($id);
        if (!$categories) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $categories->delete();
        return response()->json(['message' => 'Category deleted']);
    }


}
