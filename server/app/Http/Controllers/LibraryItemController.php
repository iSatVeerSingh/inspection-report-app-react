<?php

namespace App\Http\Controllers;

use App\Http\Resources\LibraryItemCollection;
use App\Http\Resources\LibraryItemResource;
use App\Models\LibraryItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LibraryItemController extends Controller
{
    public function index(Request $request)
    {
        $libraryItems = LibraryItem::where('active', true)->paginate();
        return new LibraryItemCollection($libraryItems);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:library_item_categories,id',
            'name' => "required|max:255",
            'summary' => 'sometimes',
            'embeddedImage' => 'sometimes',
            'openingParagraph' => 'required',
            'closingParagraph' => 'required'
        ]);

        $libraryItem = new LibraryItem($validated);
        $libraryItem->save();
        return new LibraryItemResource($libraryItem);
    }

    public function update(Request $request, LibraryItem $libraryItem)
    {
        if ($libraryItem['active'] === false) {
            return response()->json(['message' => "Library item does not exists"], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:library_item_categories,id',
            'name' => "sometimes|max:255",
            'summary' => 'sometimes',
            'embeddedImage' => 'sometimes',
            'openingParagraph' => 'sometimes|required',
            'closingParagraph' => 'sometimes|required'
        ]);

        $libraryItem->update($validated);

        return new LibraryItemResource($libraryItem);
    }

    public function destroy(Request $request, LibraryItem $libraryItem)
    {
        if ($libraryItem['active'] === false) {
            return response()->json(['message' => "Library item does not exists"], Response::HTTP_NOT_FOUND);
        }

        $libraryItem->update(['active' => false]);
        return response()->json(['message' => "Item deleted successfully"]);
    }

    public function install(Request $request)
    {

        $allItems = (new LibraryItemCollection(LibraryItem::where('active', true)->get()))->toJson();
        $contentLength = strlen($allItems);
        return response($allItems)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
