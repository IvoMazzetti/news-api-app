<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class FetchArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch articles from NewsAPI and store them in the databas';

    protected $articleFetcher;

    public function __construct(ArticleFetcher $articleFetcher)
    {
        parent::__construct();
        $this->articleFetcher = $articleFetcher;
    }

    public function handle()
    {
        info('Command runs every minute.');
        /*$result = $this->articleFetcher->fetchAndStoreArticles();
        $this->info($result); */
    }
}
