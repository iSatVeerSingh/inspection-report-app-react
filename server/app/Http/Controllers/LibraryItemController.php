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
        return new LibraryItemCollection(
            LibraryItem::select('id', 'name', 'category_id', 'summary', 'created_at', 'updated_at')
                ->orderByDesc('updated_at')
                ->simplePaginate()
                ->withPath('/library-items')
        );
    }

    public function show(Request $request, LibraryItem $libraryItem)
    {
        return new LibraryItemResource($libraryItem);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required',
            'name' => 'required|max:255',
            'summary' => 'required',
            'openingParagraph' => 'required',
            'closingParagraph' => 'required',
            'embeddedImage' => 'sometimes|required'
        ]);

        $libraryItem = new LibraryItem($validated);
        $libraryItem->save();

        return response()->json(['message' => 'Library Item created successfully'], Response::HTTP_CREATED);
    }

    public function update(Request $request, LibraryItem $libraryItem)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes:required',
            'name' => 'sometimes|required|max:255',
            'summary' => 'sometimes|required',
            'openingParagraph' => 'sometimes|required',
            'closingParagraph' => 'sometimes|required',
            'embeddedImage' => 'sometimes'
        ]);

        $libraryItem->update($validated);
        return new LibraryItemResource($libraryItem);
    }

    public function install(Request $request)
    {
        $allItems = LibraryItem::all()->toJson();
        $contentLength = strlen($allItems);
        return response($allItems)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
