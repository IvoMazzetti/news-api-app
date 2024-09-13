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
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id();
            $table->text('preferred_sources')->nullable();
            $table->text('preferred_categories')->nullable();
            $table->text('preferred_authors')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });

    }

    public function down(): void
    {

        Schema::dropIfExists('user_preferences');
    }
};
