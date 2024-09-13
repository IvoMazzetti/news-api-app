<?php

namespace App\Providers;

use App\ArticlesTrait;
use App\Models\Article;
use App\NewsServiceInterface;
use Carbon\Carbon;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use jcobhams\NewsApi\NewsApi;
use jcobhams\NewsApi\NewsApiException;

class ArticleProvider extends ServiceProvider implements NewsServiceInterface
{
    use ArticlesTrait;

    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = env('NEWS_API_URL'); // Define your base URL in config/services.php
        $this->apiKey = env('NEWS_API_KEY'); // Define your API key in config/services.php
    }

    public function fetchAndStoreTopHeadlines($keyword = null, $sources = null, $country = 'us', $category = null, $page_size = 100, $page = 1)
    {
        $page_size = min($page_size, 100);
        $categories = $category ? [$category] : $this->getAvailableCategories();

        foreach ($categories as $category) {
            $response = $this->fetchArticles([
                'q' => $keyword,
                'sources' => $sources,
                'country' => $country,
                'category' => $category,
                'pageSize' => $page_size,
                'page' => $page
            ]);

            if (isset($response['articles'])) {
                $articles = $response['articles'];

                foreach ($articles as $article) {
                    if (
                        isset($article['source']['name']) && $article['source']['name'] === '[Removed]' ||
                        empty($article['urlToImage'])
                    ) {
                        continue;
                    }

                    $publishedAt = $article['publishedAt'] ?? null;

                    if ($publishedAt) {
                        try {
                            $publishedAt = Carbon::parse($publishedAt)->format('Y-m-d H:i:s');
                        } catch (\Exception $e) {
                            Log::error($e->getMessage());
                            $publishedAt = null;
                        }
                    }

                    $this->saveArticle($article, $category, $publishedAt);
                }

            } else {
                Log::error('Failed to fetch articles from NewsCred', $response);
                return response()->json([
                    'error' => 'Failed to fetch articles',
                    'details' => $response
                ], 500);
            }
        }

        $this->treatArticleSettings();

        return response()->json([
            'message' => 'Articles fetched and stored successfully',
        ], 200);
    }

    public function fetchArticles(array $params): array
    {
        $response = Http::get("{$this->baseUrl}/top-headlines", array_merge($params, [
            'apiKey' => $this->apiKey
        ]));

        if ($response->successful()) {
            return $response->json();
        } else {
            Log::error('Failed to fetch articles from NewsCred', $response->json());
            return [];
        }
    }
    public function getAvailableCategories()
    {
        return ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    }

    public function filterArticles($filters)
    {
        $query = Article::query();

        // Apply keyword filter
        if (!empty($filters['keyword'])) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['keyword']}%")
                    ->orWhere('description', 'like', "%{$filters['keyword']}%");
            });
        }

        // Apply sources filter (ensure array format)
        if (!empty($filters['sources'])) {
            $sourcesArray = is_array($filters['sources']) ? $filters['sources'] : explode(',', $filters['sources']);
            $query->whereIn('source_name', $sourcesArray);
        }

        // Apply category filter (ensure array format)
        if (!empty($filters['category'])) {
            $categoriesArray = is_array($filters['category']) ? $filters['category'] : explode(',', $filters['category']);
            $query->whereIn('category', $categoriesArray);
        }

        // Apply date range filter
        if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
            $query->whereBetween('published_at', [$filters['start_date'], $filters['end_date']]);
        }

        // Paginate the result
        return $query->paginate(
            $filters['pageSize'] ?? 100,  // Default to 100 if 'pageSize' not provided
            ['*'],
            'page',
            $filters['page'] ?? 1          // Default to page 1 if 'page' not provided
        );
    }


}
