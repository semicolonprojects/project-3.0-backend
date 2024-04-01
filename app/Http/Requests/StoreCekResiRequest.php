<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCekResiRequest extends FormRequest
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
            'kode_resi'=> ['required'],
            'nama_pelanggan'=> ['required'],
            'status_pengerjaan'=> ['required'],
            'category'=> ['required'],
            'pengirim'=>['nullable'],
            'penerima'=>['nullable']
        ];
    }
}
