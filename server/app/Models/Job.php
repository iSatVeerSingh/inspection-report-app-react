<?php

namespace App\Models;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
