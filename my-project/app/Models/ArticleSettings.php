<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleSettings extends Model
{

    protected $fillable = [
        'type',
        'value',
    ];
}
