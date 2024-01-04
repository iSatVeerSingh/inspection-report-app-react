<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'active',
        'job_id',
        'type',
        'inspectionNotes',
        'recommendation',
        'pdf',
    ];

    protected $casts = [
        'active' => 'boolean',
        'inspectionNotes' => 'array',
    ];
}
