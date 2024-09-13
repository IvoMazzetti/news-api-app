<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\UserPreferences;
use App\Providers\ArticleProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ArticleController extends Controller
{
    protected $articleFilterService;

    public function index()
    {
        return Inertia::render('Dashboard', [
            'id' => Auth::id(),
        ]);
    }

    public function __construct(ArticleProvider $articleFilterService)
    {
        $this->articleFilterService = $articleFilterService;
    }

    public function getArticles(Request $request)
    {
        // Centralize input fetching
        $filters = $this->extractFilters($request);

        // Detect if any filters were provided by the user
        $hasFilters = $request->filled('q') ||
            $request->filled('sources') ||
            $request->filled('category') ||
            $request->filled('country') ||
            $request->filled('start_date') ||
            $request->filled('end_date');

        // Apply user preferences only if no filters are provided
        if (!$hasFilters && $request->filled('userId')) {
            $preferences = $this->fetchUserPreferences($request->input('userId'));

            // Use preferences if no specific inputs are provided for filters
            $filters['sources'] = $preferences['preferred_sources'] ?? null;
            $filters['category'] = $preferences['preferred_categories'] ?? null;
        }

        // Ensure 'category' is an array (handle comma-separated strings)
        if (isset($filters['category']) && !is_array($filters['category'])) {
            $filters['category'] = explode(',', $filters['category']);
        }

        // Ensure 'sources' is an array (handle comma-separated strings)
        if (isset($filters['sources']) && !is_array($filters['sources'])) {
            $filters['sources'] = explode(',', $filters['sources']);
        }

        // Fetch filtered articles
        $articles = $this->articleFilterService->filterArticles($filters);

        // Return the articles as JSON
        return response()->json([
            'message' => 'Articles retrieved successfully',
            'articles' => $articles
        ], 200);
    }


    // Helper method to centralize filter extraction
    private function extractFilters(Request $request)
    {
        return [
            'keyword'    => $request->input('q'),
            'country'    => $request->input('country'),
            'category'   => $request->input('category'),
            'start_date' => $request->input('start_date'),
            'end_date'   => $request->input('end_date'),
            'pageSize'   => $request->input('pageSize', 100),
            'page'       => $request->input('page', 1)
        ];
    }

    // Fetch user preferences and decode them
    private function fetchUserPreferences($userId)
    {
        $preferences = UserPreferences::where('user_id', $userId)
            ->first(['preferred_authors', 'preferred_categories', 'preferred_sources']);

        return [
            'preferred_authors' => $preferences ? ($preferences->preferred_authors ? json_decode($preferences->preferred_authors, true) : []) : [],
            'preferred_categories' => $preferences ? ($preferences->preferred_categories ? collect(json_decode($preferences->preferred_categories, true))
                ->map(fn($category) => trim($category[1]))->toArray() : []) : [],
            'preferred_sources' => $preferences ? ($preferences->preferred_sources ? collect(json_decode($preferences->preferred_sources, true))
                ->map(fn($source) => trim($source[1]))->toArray() : []) : []
        ];

    }
}
