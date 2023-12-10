<?php

namespace App\Http\Resources;

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

        $customer = $this->customer;

        $job = [
            "id" => $this['id'],
            "jobNumber" => $this['jobNumber'],
            "category_id" => $this['category_id'],
            "category" => $this->category['name'],
            "customer" => [
                "nameOnReport" => $customer["nameOnReport"],
                "name" => $customer["name"],
                "email" => $customer["email"],
                "phone" => $customer["phone"]
            ],
            "siteAddress" => $this['siteAddress'],
            "startsAt" => $this['startsAt'],
            "endsAt" => $this['endsAt'],
            "status" => $this['status'],
            "completedAt" => $this['completedAt'] === null ? null : $this['completedAt'],
            "description" => $this["description"],
            "inspector" => $this->inspector['name'],
            "inspector_id" => $this['inspector_id']
        ];

        return $job;
    }
}
