<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Http\Requests\ProductStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; //php artisan storage:link = php artisan storage:link = http://127.0.0.1:8000/storage/1.jpg

use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::get();
        $category = Category::all();
        $user = User::all();
        // dd($categoryName);
        return view('dashboard.products.index', compact('products', 'category', 'user'));
    }

    public function productsAPI()
    {
        $products = Product::get();
        return response()->json($products);
    }

    public function handleCountDownTimer($id)
    {
        $product = Product::find($id);
        $currentDate = Carbon::now();
        if ($currentDate > $product->timer && $product->status) {
            $product->status = false;
            $product->save();
        }
        return response()->json($product);
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $categories= $donations->category->name;
        return view('dashboard.products.create');
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
        $relativeImagePath = null; // Initialize relativeImagePath as null

        $newImageName = uniqid() . '-' . $request->name . '.' . $request->file('image')->extension();
        $relativeImagePath = 'assets/images/' . $newImageName;
        $request->file('image')->move(public_path('assets/images'), $newImageName);
        $request->validate([
            'name' => 'required',
        ]);


        Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'min_target' => $request->input('min_target'),
            'timer' => $request->input('timer'),
            'category_id' => $request->input('category_id'),
            'user_id' => $request->input('user_id'),
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $products = Product::findOrFail($id);
        return view('dashboard.products.edit', compact('products'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required',
        ]);
        $data = $request->except(['_token', '_method']);

        // Check if a new image was uploaded
        if ($request->hasFile('image')) {
            $newImage = $this->storeImage($request);

            // Update the image column only if a new image was uploaded
            $data['image'] = $newImage;
        }

        Product::where('id', $id)->update($data);


        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        Product::destroy($id);
        return back()->with('success', 'Product deleted successfully.');
    }

    public function storeImage($request)
    {
        $newImageName = uniqid() . '-' . $request->addedCategoryName . '.' . $request->file('image')->extension();
        $relativeImagePath = 'assets/images/' . $newImageName;
        $request->file('image')->move(public_path('assets/images'), $newImageName);


        return $relativeImagePath;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function getAllProduct()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function getProduct($id)
    {
        $products = Product::find($id);
        if (!$products) {
            return response()->json(['error' => 'products not found'], 404);
        }
        return response()->json($products);
    }

    public function createProduct(ProductStoreRequest $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'min_target' => 'required',
                'description' => 'required',
                'category_id' => 'required',
                'user_id' => 'required',
                'timer' => 'required',
                'image' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/assets/images');
            $image->move($destinationPath, $filename);
            // $products->image = $filename;
        }

        // $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();

        // Create Product
        Product::create([
            'name' => $request->name,
            'min_target' => $request->min_target,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
            'image' => $filename,
            'timer' => $request->timer,
            'winning_user' => null,
            'status' => 1,
            'highest_bid' => 0
        ]);

        // Save Image in Storage folder
        // Storage::disk('public')->put($imageName, file_get_contents($request->image));



        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $filename = time() . '.' . $image->getClientOriginalExtension();
        //     $destinationPath = public_path('/img');
        //     $image->move($destinationPath, $filename);
        //     $products->image = $filename;
        // }

        // $products->name = $request->name;
        // $products->min_target = $request->min_target;
        // $products->description = $request->description;
        // $products->category_id = $request->category_id;
        // $products->user_id = 1;
        // $products->timer = $request->timer;
        // $products->winning_user = null;
        // $products->status = 1;
        // $products->highest_bid = 0;

        // $products->save();

        // Return Json Response
        return response()->json([
            'message' => "Product successfully created."
        ], 200);

    }

    public function updateProduct(Request $request, $id)
    {

        $products = Product::find($id);
        if (!$products) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $products->name = $request->name;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/assets/images');
            $image->move($destinationPath, $filename);
            $products->image = $filename;
        }


        $products->save();
        return response()->json($products);
    }



    public function deleteProduct($id)
    {
        $products = Product::find($id);
        if (!$products) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $products->delete();
        return response()->json(['message' => 'Product deleted']);
    }


    public function getProductsOnCategory($id) {
        $products = Product::where('category_id', $id)->get();
        return response()->json($products);
    }


}
