<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'siteAddress',
        'jobNumber',
        'status',
        'workOrder',
        'completed_at',
        'category',
        'description'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-m-Y h:i A');
    }

    /**
     * Get the customer that owns the Job
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer');
    }
}
