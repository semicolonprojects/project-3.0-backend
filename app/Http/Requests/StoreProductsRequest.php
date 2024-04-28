<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug|max:100',
            'category' => 'required|string|max:30',
            'price' => 'required|numeric|min:0',
            'whatsapp_link' => 'nullable|string|max:255',
            'image' => 'nullable|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}
