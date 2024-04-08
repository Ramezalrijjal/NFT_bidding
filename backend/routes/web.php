<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BiddingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard_login', function () {
    return view('dashboard.dashboard_login');
})->name('dashboard.dashboard_login');

Route::post('welcome/dashboard', [CustomAuthController::class, 'loginUser'])->name('dashlog');


Route::get('main/dashboard', [CustomAuthController::class, 'sidebar'])->middleware('adminMiddleWar');


Route::get('dashboard_logout', [CustomAuthController::class, 'logout']);

Route::resource('dashboard/users', UserController::class)->middleware('adminMiddleWar');
Route::resource('dashboard/admins', AdminController::class)->middleware('adminMiddleWar');
Route::resource('dashboard/categories', CategoryController::class)->middleware('adminMiddleWar');
Route::resource('dashboard/products', ProductController::class)->middleware('adminMiddleWar');
Route::resource('dashboard/posts', PostController::class)->middleware('adminMiddleWar');
Route::resource('dashboard/comments', CommentController::class)->middleware('adminMiddleWar');
Route::resource('dashboard/biddings', BiddingController::class)->middleware('adminMiddleWar');
Route::resource('dashboard/emails', ContactController::class)->middleware('adminMiddleWar');





require __DIR__.'/auth.php';
