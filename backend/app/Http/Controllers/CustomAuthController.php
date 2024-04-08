<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Bidding;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CustomAuthController extends Controller
{
    //
    public function login(){
        return view ('dashboard.dashboard_login');
    }

    public function loginUser(Request $request){
        $categories = Category::all();
        $users = User::all();
        $products = Product::all();
        $biddings = Bidding::all();

        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => [
                'required',
                'min:8',
                // 'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'
            ]
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if ($admin) {
            if ($request->password == $admin->password) {
                $request->session()->put('id', $admin->id);
                session()->put('name', $admin->name);
                $categoryCount = Category::count();
                $userCount = User::count();
                $productCount = Product::count();
                $biddingCount = Bidding::count();
                // dd($categoryCount);

                return view('welcome-dashboard', [
                    'categoryCount' => $categoryCount,
                    'userCount' => $userCount,
                    'productCount' => $productCount,
                    'biddingCount' => $biddingCount
                ]);
                            } else {
                return back()->with('fail', 'Password does not match');
            }
        } else {
            return back()->with('fail', 'This email is not registered');
        }

    }

    public function logout()
    {
        if (Session::has ('id')){
            Session::pull('id');
        }
        return view ('dashboard.dashboard_login'); // Redirect to the login page after logout.
    }

    public function sidebar()
    {
        $categoryCount = Category::count();
        $userCount = User::count();
        $productCount = Product::count();
        $biddingCount = Bidding::count();
        // dd($categoryCount);

        return view('welcome-dashboard', [
        'categoryCount' => $categoryCount,
        'userCount' => $userCount,
        'DonationCount' => $productCount,
        'UserDonationCount' => $biddingCount
        ]);
    }

}
