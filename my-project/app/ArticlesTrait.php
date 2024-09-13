<?php

namespace App;

use App\Models\Article;
use App\Models\ArticleSettings;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

trait ArticlesTrait
{
    /**
     * Process and save the article data to the database.
     *
     * @param array $article
     * @param string $category
     * @param string|null $publishedAt
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveArticle(array $article, string $category, ?string $publishedAt = null): \Illuminate\Http\JsonResponse
    {
        $publishedAt = $this->treatPublishedAtArticle($publishedAt);

        $sourceName = is_array($article['source']) ? ($source['name'] ?? null) : $article['source'];

        Article::updateOrCreate(
            ['title' => $article['title']],
            [
                'source_id' => $article['source']['id'] ?? null,
                'source_name' => $sourceName,
                'author' => $article['author'] ?? null,
                'title' => $article['title'],
                'description' => $article['description'] ?? null,
                'category' => $category,
                'url' => $article['url'],
                'url_to_image' => $article['urlToImage'] ?? $article['image_url'] ?? null,
                'published_at' => $publishedAt,
                'content' => $article['content'] ?? null,
            ]
        );


        return response()->json([
            'message' => 'Articles fetched and stored successfully',
        ], 200);
    }

    public function treatPublishedAtArticle($publishedAt)
    {
        $publishedAt = $publishedAt ?? null;

        if ($publishedAt) {
            try {
                $publishedAt = Carbon::parse($publishedAt)->format('Y-m-d H:i:s');
            } catch (\Exception $e) {
                Log::error($e->getMessage());
                $publishedAt = null;
            }
        }
        return $publishedAt;
    }

    public function treatArticleSettings () {

        $uniqueSources = Article::distinct('source_name')->pluck('source_name');
        $uniqueAuthors = Article::distinct('author')->pluck('author');
        $uniqueCategories = Article::distinct('category')->pluck('category');

        // Function to insert unique values into article_settings table
        $this->insertUniqueValues($uniqueSources, 'source_name');
        $this->insertUniqueValues($uniqueAuthors, 'author');
        $this->insertUniqueValues($uniqueCategories, 'category');
    }

    private function insertUniqueValues($values, $type)
    {
        foreach ($values as $value) {
            if (!$value) continue;
            ArticleSettings::updateOrCreate(
                ['type' => $type, 'value' => $value],
                ['type' => $type, 'value' => $value]
            );
        }
    }
}
