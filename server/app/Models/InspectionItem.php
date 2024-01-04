<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InspectionItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'active',
        'report_id',
        'library_item_id',
        'images',
        'note',
        'name',
        'openingParagraph',
        'closingParagraph',
        'embeddedImage',
        'isPreviousItem',
        'previous_item_id'
    ];

    protected $casts = [
        'active' => 'boolean',
        'images' => 'array',
        'isPreviousItem' => 'boolean'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d');
    }
}
