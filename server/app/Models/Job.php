<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'jobNumber',
        'category_id',
        'customer_id',
        'inspector_id',
        'startsAt',
        'endsAt',
        'siteAddress',
        'status',
        'completedAt',
        'description',
        'inspectionNotes',
        'recommendation'
    ];

    protected $casts = [
        'startsAt' => 'datetime',
        'endsAt' => 'datetime',
        'completedAt' => 'datetime',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-m-Y h:i A');
    }

    /**
     * Perform any actions required after the model boots.
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::addGlobalScope('inspector', function (Builder $builder) {
            if (Auth::user()['role'] === "Inspector") {
                $builder->where('inspector_id', Auth::id());
                return;
            }
        });
    }


    /**
     * Get the category that owns the Job
     * category_id belongs to JobCategory Model
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(JobCategory::class, 'category_id')->withDefault([
            'name' => "N/A"
        ]);
    }

    /**
     * Get the customer that owns the Job
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    /**
     * Get the inspector that owns the Job
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function inspector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'inspector_id')->withDefault([
            'name' => 'Not Assigned'
        ]);
    }
}
