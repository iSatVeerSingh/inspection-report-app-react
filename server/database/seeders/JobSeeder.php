<?php

namespace Database\Seeders;

use App\Models\Customer;
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
        $serviceUrl = env("SERVICEM8_BASEURL");
        $username = env("SERVICEM8_EMAIL");
        $password = env("SERVICEM8_PASSWORD");

        // Categories for jobs
        $categoryResponse = Http::withBasicAuth($username, $password)->get($serviceUrl . "/category.json");
        $categories = [];

        foreach ($categoryResponse->json() as $key => $category) {
            $categories[$category['uuid']] = $category['name'];
        }

        // Get Customer or company contacts
        $companyResponse = Http::withBasicAuth($username, $password)->get($serviceUrl . "/companycontact.json?%24filter=active%20eq%20'1'");
        $companies = $companyResponse->json();

        // Get All Jobs of work order
        $jobsResponse = Http::withBasicAuth($username, $password)->get($serviceUrl . "/job.json?%24filter=status%20eq%20'Work Order'");
        $allJobs = array_filter($jobsResponse->json(), function ($job) {
            return $job['active'] === 1;
        });

        foreach ($allJobs as $key => $serviceJob) {
            $job = new Job();
            $job['uuid'] = $serviceJob['uuid'];
            $job['siteAddress'] = $serviceJob['job_address'];
            $job['jobNumber'] = $serviceJob['generated_job_id'];
            $job['status'] = $serviceJob['status'];
            $job['workOrder'] = new DateTime($serviceJob['work_order_date']);
            if ($serviceJob['category_uuid'] === "") {
                $job['category'] = "Other";
            } else {
                $job['category'] = $categories[$serviceJob['category_uuid']];
            }
            $job['description'] = $serviceJob['job_description'];

            $companyUuid = $serviceJob['company_uuid'];
            if (!Customer::where('uuid', $companyUuid)->exists()) {

                $contacts = array_filter($companies, function ($company) use ($companyUuid) {
                    return $company['company_uuid'] === $companyUuid;
                });

                $customerData = new Customer();

                foreach ($contacts as $key => $contact) {
                    if (str_contains(strtolower($contact['type']), "report")) {
                        $customerData['nameOnReport'] = trim($contact['first']);
                    }

                    if (str_contains(strtolower($contact['type']), "billing")) {
                        $customerData['name'] = trim($contact['first'] . " " . $contact['last']);
                        $customerData['email'] = strtolower($contact['email']);
                        $customerData['phone'] = $contact['mobile'];
                    }
                }

                $customerData['uuid'] = $companyUuid;
                $customerData['billingAddress'] = $serviceJob['billing_address'];

                $customerData->save();

                $job['customer'] = $customerData['id'];
            } else {
                $customerData = Customer::where('uuid', $companyUuid)->first();
                $job['customer'] = $customerData['id'];
            }

            $job->save();
        }
    }
}
