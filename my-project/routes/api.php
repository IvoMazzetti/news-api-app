<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\NewsSettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/articles/top-headlines', [ArticleController::class, 'getArticles'])->name('articles.top-headlines');
Route::post('/save-preferences', [NewsSettingsController::class, 'update'])->name('user-preferences');

