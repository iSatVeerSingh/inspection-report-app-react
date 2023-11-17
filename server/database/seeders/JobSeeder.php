<?php

namespace Database\Seeders;

use App\Models\Job;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryRes = Http::withBasicAuth(env("SERVICEM8_EMAIL"), env("SERVICEM8_PASSWORD"))->get("https://api.servicem8.com/api_1.0/category.json");

        $categories = [];
        foreach ($categoryRes->json() as $key => $value) {
            $categories[$value['uuid']] = $value['name'];
        }


        $response = Http::withBasicAuth(env("SERVICEM8_EMAIL"), env("SERVICEM8_PASSWORD"))->get("https://api.servicem8.com/api_1.0/job.json?%24filter=status%20eq%20'Work Order'");

        $jobs = $response->json();
        $activeJobs = array_filter($jobs, function ($job) {
            return $job['active'] === 1;
        });



        foreach ($activeJobs as $key => $value) {
            $job = new Job();
            $job->uuid = $value['uuid'];
            $job->siteAddress = $value['job_address'];
            $job->jobNumber = $value['generated_job_id'];
            $job->status = $value['status'];
            $job->workOrder = new DateTime($value['work_order_date']);

            if ($value['category_uuid'] === "") {
                $job->category = "";
            } else {
                $job->category = $categories[$value['category_uuid']];
            }
            $job->description = $value['job_description'];

            $job->save();
        }
    }
}
