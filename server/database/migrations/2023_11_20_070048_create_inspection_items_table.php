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
            $table->boolean('isCustom')->default(false);
            $table->foreignId('job')->constrained('jobs');
            $table->foreignId('library')->nullable()->constrained('library_items');
            $table->string('note')->nullable();
            $table->json('images')->nullable();
            $table->string('openingParagraph')->nullable();
            $table->string('closingParagraph')->nullable();
            $table->text('embeddedImage')->nullable();
            $table->foreignId('previousJob')->nullable()->constrained('jobs');
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
