<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibraryItemCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Get all of the libraryItems for the LibraryItemCategory
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function libraryItems(): HasMany
    {
        return $this->hasMany(LibraryItem::class, 'category_id');
    }
}
