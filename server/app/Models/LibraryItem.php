<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibraryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'summary',
        'openingParagraph',
        'closingParagraph',
        'embeddedImage'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-m-Y h:i A');
    }


    /**
     * Get the category that owns the LibraryItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(LibraryItemCategory::class, 'category_id');
    }

    /**
     * Get all of the inspectionItems for the LibraryItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function inspectionItems(): HasMany
    {
        return $this->hasMany(InspectionItem::class, 'libraryItem');
    }
}
