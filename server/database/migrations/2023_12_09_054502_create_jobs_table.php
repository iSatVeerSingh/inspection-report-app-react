<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->boolean('active')->default(true)->index();
            $table->uuid('uuid')->unique()->nullable();
            $table->string('jobNumber')->unique();
            $table->foreignId('category_id')->nullable()->constrained('job_categories');
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('inspector_id')->nullable()->constrained('users');
            $table->dateTime('startsAt')->nullable();
            $table->string('siteAddress');
            $table->string('status');
            $table->dateTime('completedAt')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
