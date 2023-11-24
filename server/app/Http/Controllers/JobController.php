<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobCollection;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $jobFilter = QueryBuilder::for(Job::class)
            ->allowedFilters([
                AllowedFilter::exact('category', 'category_id'),
                'status'
            ])
            ->defaultSort('-updated_at');

        if (Auth::user()['role'] === "Inspector") {
            return new JobCollection($jobFilter->get());
        }

        return new JobCollection($jobFilter->paginate());
    }
}
