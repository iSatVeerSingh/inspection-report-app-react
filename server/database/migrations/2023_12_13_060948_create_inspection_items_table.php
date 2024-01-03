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
            $table->uuid()->unique();
            $table->boolean('active')->default(true)->index();
            $table->foreignId('job_id')->constrained('jobs');
            $table->foreignId('library_item_id')->nullable()->constrained('library_items');
            $table->json('images')->nullable();
            $table->string('note')->nullable();
            // if custom item
            $table->string('name')->nullable();
            $table->text('openingParagraph')->nullable();
            $table->text('closingParagraph')->nullable();
            $table->text('embeddedImage')->nullable();

            // is this belongs to previous item
            $table->boolean('isPreviousItem')->default(false);
            $table->foreignId('previous_item_id')->constrained('inspection_items');
            // $table->foreignId('previous_job_id')->nullable()->constrained('jobs');
            // $table->boolean('isCustom')->default(false);
            // $table->string('summary')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_items');
    }
};
