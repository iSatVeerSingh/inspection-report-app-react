<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InspectionItem extends Model
{
    use HasFactory;

    protected $fillable = [
        "library_id",
        "job_id",
        "previous_job_id",
        "images",
        "note",
        "isCustom",
        "name",
        "summary",
        "openingParagraph",
        "closingParagraph",
        "embeddedImage"
    ];

    protected $casts = [
        'images' => 'array',
        'isCustom' => 'boolean'
    ];

    /**
     * Get the libraryItem that owns the InspectionItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function libraryItem(): BelongsTo
    {
        return $this->belongsTo(LibraryItem::class, 'library_id');
    }

    /**
     * Get the job that owns the InspectionItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job_id');
    }

    /**
     * Get the previousJob that owns the InspectionItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function previousJob(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'previous_job_id');
    }
}
