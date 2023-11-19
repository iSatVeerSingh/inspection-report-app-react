<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Job;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $serviceUrl = env("SERVICEM8_BASEURL");
        $username = env("SERVICEM8_EMAIL");
        $password = env("SERVICEM8_PASSWORD");

        // Get Staff
        $staff = Http::withBasicAuth($username, $password)->get($serviceUrl . "/staff.json")->json();

        $response = Http::withBasicAuth($username, $password)->get($serviceUrl . "/job.json?%24filter=edit_date%20gt%20'2023-11-17 00:00:00'");

        $jobs = array_filter($response->json(), function ($job) {
            return $job['status'] === "Work Order";
        });



        $existingJobs = [];
        foreach ($jobs as $key => $job) {
            $acitvityResponse = Http::withBasicAuth($username, $password)->get($serviceUrl . "/jobactivity.json?%24filter=job_uuid%20eq%20'" . $job['uuid'] . "'");

            $activities = [];
            foreach ($acitvityResponse->json() as $key => $activity) {
                if ($activity['active'] === 1) {
                    array_push($activities, $activity);
                    break;
                }
            };

            if (count($activities) !== 0) {

                foreach ($staff as $key => $member) {
                    if ($member['uuid'] === $activities[0]['staff_uuid']) {
                        $existingJobs[$job['uuid']] = $member;
                        break;
                    }
                }
            }
        }

        return $existingJobs;
    }
}
