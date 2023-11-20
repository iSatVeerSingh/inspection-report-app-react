<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InspectionNote extends Model
{
    use HasFactory;


    protected $fillable = [
        "category",
        "text"
    ];
}
