<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;

class JobCategoryController extends Controller
{
    public function install(Request $request)
    {
        $allCategories = JobCategory::where('active', true)->get()->toJson();
        $contentLength = strlen($allCategories);
        return response($allCategories)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
