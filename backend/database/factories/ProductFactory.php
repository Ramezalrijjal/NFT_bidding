<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;

class ProductFactory extends Factory
{
    public function definition()
    {
        $user = User::inRandomOrder()->first();
        // $winning_user = User::inRandomOrder()->where('id', '!=', $user->id)->first();        
        $category = Category::inRandomOrder()->first();

        return [
            'name' => $this->faker->word(),
            'image' => $this->faker->imageUrl($width = 200, $height = 200),
            'description' => $this->faker->sentence(),
            'min_target' => $this->faker->randomNumber(),
            'timer' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => 1,
            'user_id' => $user->id,
            'category_id' => $category->id,
            'winning_user' => null,
            'highest_bid' => 0,
        ];
    }
}
