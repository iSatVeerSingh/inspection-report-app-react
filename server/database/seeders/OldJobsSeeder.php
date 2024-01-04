<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\InspectionItem;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\LibraryItemCategory;
use App\Models\Report;
use App\Models\User;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class OldJobsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicem8Url = env('SERVICEM8_BASEURL');
        $username = env('SERVICEM8_EMAIL');
        $password = env('SERVICEM8_PASSWORD');

        // Categories for jobs
        $categories = Http::withBasicAuth($username, $password)
            ->get($servicem8Url . "/category.json?%24filter=active%20eq%20'1'")
            ->json();

        foreach ($categories as $key => $category) {
            $jobCategory = new JobCategory([
                'uuid' => $category['uuid'],
                'name' => $category['name']
            ]);

            $jobCategory->save();
        }

        // Get Customer or company contacts
        $companies = Http::withBasicAuth($username, $password)
            ->get($servicem8Url . "/companycontact.json?%24filter=active%20eq%20'1'")
            ->json();

        $allFiles = Storage::files('/');
        $itemJsonFiles = array_filter($allFiles, function ($file) {
            return str_contains($file, 'inspectionitems');
        });

        foreach ($itemJsonFiles as $key => $file) {
            $jobData = Storage::json($file);

            // Get All Jobs of work order
            $jobsResponse = Http::withBasicAuth($username, $password)
                ->get($servicem8Url . "/job.json?%24filter=generated_job_id%20eq%20'" . $jobData['jobNumber'] . "'")
                ->json();
            $serviceJob = $jobsResponse[0];

            $job = new Job();
            $job['uuid'] = $serviceJob['uuid'];
            $job['jobNumber'] = $serviceJob['generated_job_id'];
            if ($serviceJob['category_uuid'] !== "") {
                $jobCategory = JobCategory::where('uuid', $serviceJob['category_uuid'])->first();
                $job['category_id'] = $jobCategory['id'];
            }
            $job['siteAddress'] = $serviceJob['job_address'];
            $job['status'] = "Completed";
            $job['description'] = $serviceJob['job_description'];

            $companyUuid = $serviceJob['company_uuid'];
            if (!Customer::where('uuid', $companyUuid)->exists()) {

                $contacts = array_filter($companies, function ($company) use ($companyUuid) {
                    return $company['company_uuid'] === $companyUuid;
                });

                $customerData = new Customer();

                foreach ($contacts as $key => $contact) {
                    if (str_contains(strtolower($contact['type']), "report")) {
                        $customerData['nameOnReport'] = trim($contact['first'] . " " . $contact['last']);
                    }

                    if (str_contains(strtolower($contact['type']), "billing")) {
                        $customerData['name'] = trim($contact['first'] . " " . $contact['last']);
                        $customerData['email'] = strtolower($contact['email']);
                        $customerData['phone'] = $contact['mobile'];
                    }

                    if (str_contains(strtolower($contact['type']), "builder")) {
                        $customerData['builder'] = trim($contact['first'] . " " . $contact['last']);
                        $customerData['builderEmail'] = strtolower($contact['email']);
                        $customerData['builderPhone'] = $contact['mobile'];
                    }

                    if (str_contains(strtolower($contact['type']), "supervisor")) {
                        $customerData['supervisor'] = trim($contact['first'] . " " . $contact['last']);
                        $customerData['supervisorEmail'] = strtolower($contact['email']);
                        $customerData['supervisorPhone'] = $contact['mobile'];
                    }
                }

                $customerData['uuid'] = $companyUuid;
                $customerData['billingAddress'] = $serviceJob['billing_address'];

                $customerData->save();

                $job['customer_id'] = $customerData['id'];
            } else {
                $customerData = Customer::where('uuid', $companyUuid)->first();
                $job['customer_id'] = $customerData['id'];
            }

            $acitvityResponse = Http::withBasicAuth($username, $password)
                ->get($servicem8Url . "/jobactivity.json?%24filter=job_uuid%20eq%20'" . $serviceJob['uuid'] . "'")
                ->json();

            $activities = [];
            foreach ($acitvityResponse as $key => $activity) {
                if ($activity['active'] === 1 && $activity['activity_was_scheduled'] === 1) {
                    array_push($activities, $activity);
                    break;
                }
            };

            if (count($activities) !== 0) {
                $inspector = User::where('uuid', $activities[0]['staff_uuid'])->first();
                if ($inspector) {
                    $job['inspector_id'] = $inspector['id'];
                }
                $job['startsAt'] = new DateTime($activities[0]["start_date"]);
            }

            $job->save();
        }
    }
}
