<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'jobNumber',
        'category',
        'orderedAt',
        'customer',
        'inspector',
        'siteAddress',
        'startDate',
        'endDate',
        'status',
        'completedAt',
        'description'
    ];

    protected $casts = [
        'orderedAt' => 'datetime',
        'startDate' => 'datetime',
        'endDate' => 'datetime',
        'completedAt' => 'datetime',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-m-Y h:i A');
    }

    /**
     * Get the customer that owns the Job
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer');
    }

    /**
     * Get the inspector that owns the Job
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function inspector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'inspector');
    }

    /**
     * Get all of the inspectionItems for the Job
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function inspectionItems(): HasMany
    {
        return $this->hasMany(InspectionItem::class, 'job');
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
                $builder->where('inspector', Auth::id());
                return;
            }
        });
    }
}
