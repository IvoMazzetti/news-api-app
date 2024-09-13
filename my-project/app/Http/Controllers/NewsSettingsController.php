<?php

namespace App\Http\Controllers;

use App\Models\ArticleSettings;
use App\Models\UserPreferences;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsSettingsController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Retrieve id and value for 'category', 'author', and 'source_name' settings
        $categories = ArticleSettings::where('type', 'category')->pluck('value', 'id')->toArray();
        $authors = ArticleSettings::where('type', 'author')->pluck('value', 'id')->toArray();
        $sources = ArticleSettings::where('type', 'source_name')->pluck('value', 'id')->toArray();

        // Retrieve existing user preferences
        $userPreferences = UserPreferences::where('user_id', $userId)->first();

        // Initialize existing preferences as empty arrays if not found
        $categoriesArray = $userPreferences ? json_decode($userPreferences->preferred_categories, true) : [];
        $authorsArray = $userPreferences ? json_decode($userPreferences->preferred_authors, true) : [];
        $preferredSources = $userPreferences ? json_decode($userPreferences->preferred_sources, true) : [];

        // Format the settings data to an array of arrays for frontend consumption
        $preferredCategories = array_map(null, array_keys($categories), array_values($categories));
        $preferredAuthors = array_map(null, array_keys($authors), array_values($authors));
        $sourcesArray = array_map(null, array_keys($sources), array_values($sources));

        return Inertia::render('Profile/NewsUserSettings', [
            'categories' => [
                'available' => $preferredCategories,
                'selected' => $categoriesArray
            ],
            'authors' => [
                'available' => $preferredAuthors,
                'selected' => $authorsArray
            ],
            'sources' => [
                'available' => $sourcesArray,
                'selected' => $preferredSources
            ],
            'user_id' => $userId,
        ]);
    }


    public function update(Request $request)
    {


        $request->validate([
            'categories' => 'array',
            'authors' => 'array',
            'sources' => 'array',
        ]);

        $userId = $request->input('id');

        // Convert arrays to JSON strings for storage
        $categories = $request->input('categories');
        $authors = $request->input('authors');
        $sources = $request->input('sources');

        // Find or create user preferences
        UserPreferences::updateOrCreate(
            ['user_id' => $userId],
            [
                'preferred_categories' => json_encode($categories),
                'preferred_authors' => json_encode($authors),
                'preferred_sources' => json_encode($sources)
            ]
        );

        return response()->json(['message' => 'Preferences updated successfully.']);
    }
}
