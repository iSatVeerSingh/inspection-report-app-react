<?php

namespace App\Http\Controllers;

use App\Http\Resources\LibraryItemCollection;
use App\Http\Resources\LibraryItemResource;
use App\Models\LibraryItem;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class LibraryItemController extends Controller
{
    public function index(Request $request)
    {
        if ($request->query('install') === 'true') {
            return new LibraryItemCollection(LibraryItem::all());
        }

        $libraryItems = QueryBuilder::for(LibraryItem::class)
            ->allowedFilters('category')
            ->defaultSort('-updated_at')
            ->allowedSorts(['category', 'name', 'updated_at'])
            ->paginate();

        return new LibraryItemCollection($libraryItems);
    }

    public function show(Request $request, LibraryItem $libraryItem)
    {
        return new LibraryItemResource($libraryItem);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|max:255',
            'name' => 'required|max:255',
            'openingParagraph' => 'required',
            'closingParagraph' => 'required',
            'embeddedImage' => 'sometimes|required',
            'summary' => 'sometimes|required'
        ]);

        $libraryItem = new LibraryItem($validated);
        $libraryItem->save();

        return new LibraryItemResource($libraryItem);
    }

    public function update(Request $request, LibraryItem $libraryItem)
    {
        $validated = $request->validate([
            'category' => 'sometimes|required|max:255',
            'name' => 'sometimes|required',
            'openingParagraph' => 'sometimes|required',
            'closingParagraph' => 'sometimes|required',
            'embeddedImage' => 'sometimes|required',
            'summary' => 'sometimes|required'
        ]);

        $libraryItem->update($validated);
        return new LibraryItemResource($libraryItem);
    }

    public function destroy(Request $request, LibraryItem $libraryItem)
    {
        $libraryItem->delete();
        return response()->noContent();
    }
}
