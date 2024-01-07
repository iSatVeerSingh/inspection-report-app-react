<?php

namespace App\Console\Commands;

use App\Models\Customer;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\User;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SyncJobs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-jobs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync the jobs with ServiceM8 Api';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $servicem8Url = env('SERVICEM8_BASEURL');
        $username = env('SERVICEM8_EMAIL');
        $password = env('SERVICEM8_PASSWORD');


        $time = new DateTime("-1 hour");
        $lastUpdated = $time->format('Y-m-d h:i:00');

        $jobsResponse = Http::withBasicAuth($username, $password)
            ->get($servicem8Url . "/job.json?%24filter=edit_date%20gt%20'" . $lastUpdated . "'")
            ->json();

        $allJobs = array_filter($jobsResponse, function ($job) {
            return $job['status'] === "Work Order";
        });

        $itds = "";
        // check if the job exists or not
        foreach ($allJobs as $key => $serviceJob) {
            if (Job::where("uuid", $serviceJob['uuid'])->exists()) {
                if ($serviceJob['active'] === 0) {
                    // if job is deleted on service m8
                    $job = Job::where('uuid', $serviceJob['uuid'])->first();
                    $job->update(['active' => false]);
                } else {
                    // if job is not deleted on service m8
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
                        $job = Job::where("uuid", $serviceJob['uuid'])->first();

                        if ($job['inspector_id'] !== $inspector['id']) {
                            $job['inspector_id'] = $inspector['id'];
                        }
                        $job['startsAt'] = new DateTime($activities[0]["start_date"]);
                        $job->save();
                    }
                }
            } elseif ($serviceJob['active'] === 1) {

                $job = new Job();
                $job['uuid'] = $serviceJob['uuid'];
                $job['jobNumber'] = $serviceJob['generated_job_id'];
                if ($serviceJob['category_uuid'] !== "") {
                    $jobCategory = JobCategory::where('uuid', $serviceJob['category_uuid'])->first();
                    $job['category_id'] = $jobCategory['id'];
                }
                $job['siteAddress'] = $serviceJob['job_address'];
                $job['status'] = $serviceJob['status'];
                $job['description'] = $serviceJob['job_description'];

                if (!Customer::where('uuid', $serviceJob['company_uuid'])->exists()) {

                    // Get Customer or company contacts
                    $contacts = Http::withBasicAuth($username, $password)
                        ->get($servicem8Url . "/companycontact.json?%24filter=company_uuid%20eq%20'" . $serviceJob['company_uuid'] . "'")
                        ->json();

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

                    $customerData['uuid'] = $serviceJob['company_uuid'];
                    $customerData['billingAddress'] = $serviceJob['billing_address'];

                    $customerData->save();

                    $job['customer_id'] = $customerData['id'];
                } else {
                    $customerData = Customer::where('uuid', $serviceJob['company_uuid'])->first();
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
}
