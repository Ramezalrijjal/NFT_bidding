<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\User;
use App\Models\Bidding;

class Product extends Model
{

    protected $fillable = [
        'name',
        'image',
        'description',
        'min_target',
        'timer',
        'status',
        'category_id',
        'user_id',
        'highest_bid',
        'winning_user',
    ];

    use HasFactory;

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function biddings() {
        return $this->hasMany(Bidding::class);
    }
}
