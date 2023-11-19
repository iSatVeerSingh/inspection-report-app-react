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
            $table->uuid('uuid')->unique();
            $table->string('jobNumber')->unique();
            $table->string('category');
            $table->dateTime('orderedAt');
            $table->foreignId('customer')->constrained('customers');
            $table->foreignId('inspector')->constrained('users');
            $table->string('siteAddress');
            $table->string('status');
            $table->dateTime('completedAt')->nullable();
            $table->text('description')->nullable();
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
