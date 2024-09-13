<?php

namespace App;

interface NewsServiceInterface
{
    public function fetchAndStoreTopHeadlines($keyword = null, $sources = null, $country = 'us', $category = null, $page_size = 100, $page = 1);
    public function fetchArticles(array $params): array;
}
