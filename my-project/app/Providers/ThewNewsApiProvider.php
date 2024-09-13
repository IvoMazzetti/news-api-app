<?php

namespace App\Providers;

use App\ArticlesTrait;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class ThewNewsApiProvider extends ServiceProvider
{
    use ArticlesTrait;

    protected $baseUrl;
    protected $apiKey;
    protected $categories;

    public function __construct()
    {
        $this->baseUrl = env('THE_NEWS_API_URL');
        $this->apiKey = env('THE_NEWS_API_KEY');
        $this->categories = ['general', 'science', 'sports', 'business', 'health', 'entertainment', 'tech', 'politics', 'food', 'travel'];
    }

    public function fetchArticles()
    {
        foreach ($this->categories as $category) {
            $response = Http::get("{$this->baseUrl}/news/all", array_merge([
                'api_token' => $this->apiKey,
                'language' => 'en',
                'category' => $category,
            ]));

            if (isset($response['data'])) {
                $articles = $response['data'];

                foreach ($articles as $article) {
                    if (
                        (!isset($article['title']) ||
                            (empty($article['description']) )) ||
                        empty($article['image_url'])
                    ) {
                        continue;
                    }

                    $this->saveArticle($article, $category, $article['published_at']);
                }
            }
        }
    }
}
