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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->boolean('active')->default(true)->index();
            $table->foreignId('job_id')->constrained('jobs');
            $table->string('type')->nullable();
            $table->json('inspectionNotes')->nullable(); // move to report
            $table->string('recommendation')->nullable(); // move to report
            $table->dateTime('completedAt')->nullable();
            $table->text('pdf')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
