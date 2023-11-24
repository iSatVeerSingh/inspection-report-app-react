<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InspectionNote extends Model
{
    use HasFactory;


    protected $fillable = [
        "text"
    ];

    // /**
    //  * Get the jobCategory that owns the InspectionNote
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    //  */
    // public function jobCategory(): BelongsTo
    // {
    //     return $this->belongsTo(JobCategory::class, 'category');
    // }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-m-Y h:i A');
    }
}
