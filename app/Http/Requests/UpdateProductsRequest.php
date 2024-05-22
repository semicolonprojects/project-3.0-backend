<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductsRequest extends FormRequest
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
            'product_name' => 'nullable|string|max:255',
            'slug' => 'nullable|string|unique:products,slug,' . $this->route('id') . '|max:100',
            'category' => 'nullable|string|max:30',
            'price' => 'nullable|numeric|min:0',
            'whatsapp_link' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,png',
        ];
    }
}
