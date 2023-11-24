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
        Schema::create('inspection_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_id')->nullable()->constrained('library_items');
            $table->foreignId('job_id')->constrained('jobs');
            $table->foreignId('previous_job_id')->nullable()->constrained('jobs');
            $table->json('images');
            $table->string('note')->nullable();
            $table->boolean('isCustom')->default(false);
            $table->string('name')->nullable();
            $table->string('summary')->nullable();
            $table->string('openingParagraph')->nullable();
            $table->string('closingParagraph')->nullable();
            $table->text('embeddedImage')->nullable();
            $table->timestamps();
        });
    }

    /**library_items
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_items');
    }
};
