<?php

namespace App\Http\Controllers;

use App\Models\LibraryItemCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LibraryItemCategoryController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(['data' => LibraryItemCategory::withCount(['libraryItems as itemsCount'])->orderBy('updated_at', 'desc')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|unique:library_item_categories,name'
        ]);

        $category = new LibraryItemCategory($validated);
        $category->save();

        return response()->json(['message' => 'Category created successfully'], Response::HTTP_CREATED);
    }

    public function update(Request $request, LibraryItemCategory $libraryItemCategory)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|unique:library_item_categories,name'
        ]);

        $libraryItemCategory->update($validated);
        return response()->json(['message' => 'Category updated successfully']);
    }

    public function destroy(Request $request, LibraryItemCategory $libraryItemCategory)
    {
        $itemcount = $libraryItemCategory->libraryItems()->count();
        if ($itemcount !== 0) {
            return response()->json(['message' => "Category is not empty"], Response::HTTP_BAD_REQUEST);
        }

        $libraryItemCategory->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function install(Request $request)
    {
        $allCategories = LibraryItemCategory::all()->toJson();
        $contentLength = strlen($allCategories);
        return response($allCategories)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
