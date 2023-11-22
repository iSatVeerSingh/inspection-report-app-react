<?php

namespace App\Http\Resources;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $customer = Customer::find($this['customer']);

        $job = [
            "id" => $this["id"],
            "jobNumber" => $this["jobNumber"],
            "category" => $this["category"],
            "customer" => [
                "nameOnReport" => $customer["nameOnReport"],
                "name" => $customer["name"],
                "email" => $customer["email"],
                "phone" => $customer["phone"]
            ],
            "siteAddress" => $this["siteAddress"],
            "startDate" => $this["startDate"]->format('d-m-Y h:i A'),
            "endDate" => $this["endDate"]->format('d-m-Y h:i A'),
            "status" => $this["status"],
            "completedAt" => $this["completedAt"],
            "description" => $this["description"],
        ];

        $inspector = User::find($this['inspector']);
        if ($inspector) {
            $job["inspector"] = $inspector["name"];
        } else {
            $job["inspector"] = "Not Assigned";
        }

        return $job;
    }
}
