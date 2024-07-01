<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Artikel;
use App\Http\Requests\StoreArtikelRequest;
use App\Http\Requests\UpdateArtikelRequest;
use App\Http\Resources\ArtikelCollection;
use App\Http\Resources\ArtikelResource;
use Database\Factories\ArtikelFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ArtikelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->has('all');

        if ($all) {

            return new ArtikelCollection(Artikel::latest()->get());
        } else {
            return new ArtikelCollection(Artikel::latest()->paginate());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|unique:artikels|max:100',
            'judul' => 'required|string|unique:artikels|max:100',
            'category_id' => 'required|exists:artikel_categories,id',
            'isi_artikel' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|mimes:jpeg,png,jpg|max:5048',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/artikel', $image->hashName());

        //create post
        Artikel::create([
            'slug' => $request->slug,
            'judul' => $request->judul,
            'category_id' => $request->category_id,
            'isi_artikel' => $request->isi_artikel,
            'description' => $request->description,
            'image' => $image->hashName(),
        ]);

        //return response
        return response()->json('Success', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $article = Artikel::where('slug', $slug)->first();
        return new ArtikelResource(Artikel::findOrFail($article->id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artikel $artikel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        // Find the article by ID
        $article = Artikel::findOrFail($id);

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100|unique:artikels,slug,' . $id,
            'judul' => 'required|string|max:100|unique:artikels,judul,' . $id,
            'category_id' => 'required|exists:artikel_categories,id',
            'isi_artikel' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|mimes:jpeg,png,jpg|max:5048',
        ]);

        // If validation fails, return the validation errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Delete the old image file
            if ($article->image) {
                Storage::delete('public/artikel/' . $article->image);
            }

            $image = $request->file('image');
            $imageName = $image->hashName();
            $image->storeAs('public/artikel', $imageName);
            $article->image = $imageName;
        }

        // Update article data
        $article->slug = $request->slug;
        $article->judul = $request->judul;
        $article->category_id = $request->category_id;
        $article->isi_artikel = $request->isi_artikel;
        $article->description = $request->description ?? $article->description;

        // Save the updated article
        $article->save();

        // Return success response
        return response()->json('Article updated successfully', 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $artikel = Artikel::findOrFail($id);

        if (Storage::exists('public/artikel/' . $artikel->image)) {
            Storage::delete('public/artikel/' . $artikel->image); // Corrected path
        } else {
            return response()->json('File does not exist.', 404); // Returning a proper response for non-existing file
        }

        $artikel->delete();

        return response()->json('Deleted');
    }

    public function rekomendasiArtikel(string $categoryId)
    {
        $articles = Artikel::where('category_id', $categoryId)->get();
        return ArtikelResource::collection($articles);
    }
}
