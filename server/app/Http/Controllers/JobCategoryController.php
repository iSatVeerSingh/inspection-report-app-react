<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobCategoryCollection;
use App\Models\JobCategory;
use Illuminate\Http\Request;

class JobCategoryController extends Controller
{
  public function index(Request $request)
  {
    return new JobCategoryCollection(JobCategory::all());
  }
}
