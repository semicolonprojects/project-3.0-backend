<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use  Illuminate\Validation\Rule;

class StoreArtikelRequest extends FormRequest
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
            'slug' => 'required|string|unique:artikels|max:100',
            'judul' => 'required|string|unique:artikels|max:100',
            'category_id' => 'required|exists:artikel_categories,id',
            'isi_artikel' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}
