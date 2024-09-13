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
        Schema::create('article_settings', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'source_name', 'author', or 'category'
            $table->string('value');
            $table->unique(['type', 'value']); // Ensure uniqueness across type and value
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_settings');
    }
};
