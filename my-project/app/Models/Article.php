<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';

    protected $fillable = [
        'source_id',
        'source_name',
        'author',
        'title',
        'description',
        'category',
        'url',
        'url_to_image',
        'published_at',
        'content',
    ];

    protected $casts = [
        'published_at' => 'datetime:Y-m-d H:i',
    ];
}
