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
        'category',
        'name',
        'openingParagraph',
        'closingParagraph',
        'embeddedImage',
        'summary'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-m-Y h:i A');
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

    /**
     * Get the category that owns the LibraryItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function itemCategory(): BelongsTo
    {
        return $this->belongsTo(LibraryItemCategory::class, 'category');
    }
}
