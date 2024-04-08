<?php

namespace App\Http\Controllers;

use App\Models\Bidding;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class BiddingController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $user = User::get();
        $product = Product::get();
        $biddings = Bidding::get();
        return view('dashboard.biddings.index', compact('biddings', 'user', 'product'));
    }



    public function create()
    {
        //
    }


    public function store(Request $request)
    {

    }




    public function show(Bidding $bidding)
    {

    }


    public function edit(Bidding $bidding)
    {

    }


    public function update(Request $request, Bidding $bidding)
    {

    }


    public function destroy(Bidding $bidding)
    {

    }

    
    public function getAllBidding()
    {
        //
        $biddings = Bidding::all();
        return response()->json($biddings);
        
    }

   
    public function createBidding(Request $request)
    {
        $biddings = new Bidding();

        $biddings->user_id = $request->user_id;

        $biddings->product_id = $request->product_id;

        $product = Product::find($request->product_id);

        $product->highest_bid = $request->amount;

        $product->save();

        $biddings->amount = $request->amount;

        $biddings->save();

        return response()->json($biddings);
    }

    
    public function getBidding($id)
    {
        $biddings = bidding::find($id);
        if (!$biddings) {
            return response()->json(['error' => 'bidding not found'], 404);
        }
        return response()->json($biddings);
    }

    public function getBiddingsOnProduct($id) {
        $biddings = Bidding::where('product_id', $id)->get();
        return response()->json($biddings);
    }

    public function updateBidding( Request  $request ,$id )
    {
        $biddings = bidding::find($id);
        $biddings->user_id = $request->user_id;

        $biddings->product_id = $request->product_id;

        $biddings->amount = $request->amount;

        $biddings->updat();

        return response($biddings, 201);
    }

    
    public function destroyBidding($id)
    {
        $biddings = Bidding::find($id); 
        if (!$biddings) {
            return response()->json(['error' => 'Bidding not found'], 404);
        }
    
        $biddings->delete(); 
    
        return response()->json(['message' => 'Bidding deleted']);
    }

    public function getWinner($product_id) {
        $maxAmount = Bidding::where('product_id', $product_id)->max('amount');

        $highestBid = Bidding::where('product_id', $product_id)
            ->where('amount', $maxAmount)
            ->first();

        $user = User::where('id', $highestBid->user_id)->first();
        return response()->json($user);
    }

    public function getHighestBid($product_id) {
        $highestBid = Bidding::where('product_id', $product_id)->max('amount');
        return response()->json($highestBid);
    }

}


