<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'nameOnReport',
        'name',
        'email',
        'phone',
        'billingAddress',
        'builder',
        'builderEmail',
        'builderPhone',
        'supervisor',
        'supervisorEmail',
        'supervisorPhone'
    ];

    /**
     * Get all of the jobs for the Customer
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class, 'customer_id');
    }
}
