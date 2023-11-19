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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('nameOnReport')->nullable();
            $table->string('name')->default('');
            $table->string('email')->default('');
            $table->string('phone')->default('');
            $table->string('billingAddress')->nullable();
            $table->timestamps();

            // $table->uuid('uuid')->unique();
            // $table->string('nameOnReport')->default("");
            // $table->string('name')->default("");
            // $table->string('email')->default("");
            // $table->string('phone')->default("");
            // $table->string('builder')->nullable();
            // $table->string('builderEmail')->nullable();
            // $table->string('builderPhone')->nullable();
            // $table->string('builderCompany')->nullable();
            // $table->string('builderCompanyEmail')->nullable();
            // $table->string('builderCompanyPhone')->nullable();
            // $table->string('address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
