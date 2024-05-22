<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServicesRequest extends FormRequest
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
            'slug' => ['required', Rule::unique('services')->ignore($this->service)],
            'nama_service' => ['required', 'min:5', 'max:100'],
            'category_id' => ['required|exists:artikel_categories,id' ],
            'price' => ['required'],
            'link_wa' => ['required'],
            'image' => ['nullable', 'file', 'image', 'max:1024']
        ];
    }
}
