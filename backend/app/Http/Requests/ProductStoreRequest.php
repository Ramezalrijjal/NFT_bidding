<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */

     public function rules(): array
    {
        if(request()->isMethod('post')) {
            return [
                'name' => 'required',
                'image' => 'required',
                'description' => 'required',
                'category_id' => 'required',
                'min_target' => 'required',
                'timer' => 'required',
            ];
        } else {
            return [
                'name' => 'required',
                'image' => 'required',
                'description' => 'required',
                'category_id' => 'required',
                'min_target' => 'required',
                'timer' => 'required',
            ];
        }
    }

    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'name.required' => 'Name is required!',
                'image.required' => 'Image is required!',
                'category_id.required' => 'category_id is required!',
                'description.required' => 'Description is required!',
                'min_target.required' => 'min_target is required!',
                'timer.required' => 'timer is required!'
            ];
        } else {
            return [
                'name.required' => 'Name is required!',
                'image.required' => 'Image is required!',
                'category_id.required' => 'category_id is required!',
                'description.required' => 'Description is required!',
                'min_target.required' => 'min_target is required!',
                'timer.required' => 'timer is required!'
            ];
        }
    }

}
