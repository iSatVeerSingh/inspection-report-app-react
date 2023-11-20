<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InspectionItem extends Model
{
    use HasFactory;

    protected $fillable = [
        "isCustom",
        "job",
        "library",
        "note",
        "images",
        "openingParagraph",
        "closingParagraph",
        "embeddedImage",
        "previousJob",
    ];

    protected $casts = [
        'images' => 'array',
        'isCustom' => 'boolean'
    ];

    /**
     * Get the job that owns the InspectionItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job');
    }

    /**
     * Get the libraryItem that owns the InspectionItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function libraryItem(): BelongsTo
    {
        return $this->belongsTo(LibraryItem::class, 'library');
    }
}
