<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibraryItemCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        "name"
    ];
}
