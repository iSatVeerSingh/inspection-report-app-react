<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobCollection;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function index(Request $request)
    {
        return new JobCollection(Job::all());
    }

    public function install(Request $request)
    {
        $jobs = new JobCollection(Job::where('inspector_id', Auth::id())->get());
        $contentLength = strlen($jobs->toJson());
        return response($jobs)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
