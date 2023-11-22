<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class JobCategoryController extends Controller
{
    public function index(Request $request)
    {
        $serviceUrl = env("SERVICEM8_BASEURL");
        $username = env("SERVICEM8_EMAIL");
        $password = env("SERVICEM8_PASSWORD");

        // Categories for jobs
        $categoryResponse = Http::withBasicAuth($username, $password)->get($serviceUrl . "/category.json?%24filter=active%20eq%20'1'");
        $categories = $categoryResponse->json();

        foreach ($categories as $key => $category) {
            $jobCategory = new JobCategory([
                'uuid' => $category['uuid'],
                'name' => $category['name']
            ]);

            $jobCategory->save();
        }
        return $categoryResponse->json();
    }
}
