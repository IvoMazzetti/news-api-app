<?php

use App\Providers\ArticleProvider;
use App\Providers\TheGuardianProvider;
use App\Providers\ThewNewsApiProvider;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

//Images are causing issues
Artisan::command('fetch:the-news-articles', function (ThewNewsApiProvider $thewNewsApiProvider) {
    $message = $thewNewsApiProvider->fetchArticles();

    $this->info($message);
})->purpose('Fetch articles from NewsAPI and store them')->everyFourHours();

Artisan::command('fetch:articles', function (ArticleProvider $articleService) {
    $message = $articleService->fetchAndStoreTopHeadlines();

    $this->info($message);
})->purpose('Fetch articles from NewsAPI and store them')->everyMinute();
