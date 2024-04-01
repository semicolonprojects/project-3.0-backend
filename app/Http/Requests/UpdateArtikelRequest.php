<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArtikelRequest extends FormRequest
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
            'slug' => ['required'],
            'judul' => ['required', 'max:255'],
            'category_id' => ['required'],
            'isi_artikel'  => ['required'],
            'image' =>  ['nullable', 'file', 'image', 'max:1024'],
        ];
    }
}
