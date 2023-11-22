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

        $customer = $this->getCustomer;

        $job = [
            "id" => $this['id'],
            "jobNumber" => $this['jobNumber'],
            "category" => $this['category'] === null ? "N/A" : $this->jobCategory['name'],
            "customer" => [
                "nameOnReport" => $customer["nameOnReport"],
                "name" => $customer["name"],
                "email" => $customer["email"],
                "phone" => $customer["phone"]
            ],
            "siteAddress" => $this['siteAddress'],
            "startDate" => $this['startDate']->format('d-m-Y h:i A'),
            "endDate" => $this['endDate']->format('d-m-Y h:i A'),
            "status" => $this['status'],
            "completedAt" => $this['completedAt'] === null ? null : $this['completedAt']->format('d-m-Y h:i A'),
            "description" => $this["description"],
            "inspector" => $this['inspector'] === null ? "Not Assigned" : $this->getInspector['name']
        ];

        return $job;
    }
}
