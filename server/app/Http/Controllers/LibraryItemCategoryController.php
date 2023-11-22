<?php

namespace App\Http\Controllers;

use App\Http\Resources\LibraryItemCategoryCollection;
use App\Models\LibraryItemCategory;
use Illuminate\Http\Request;

class LibraryItemCategoryController extends Controller
{
    public function index(Request $request)
    {
        return new LibraryItemCategoryCollection(LibraryItemCategory::all());
    }
}
