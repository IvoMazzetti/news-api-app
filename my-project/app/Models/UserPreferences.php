<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferences extends Model
{
    protected $table = 'user_preferences';
    protected $fillable = ['preferred_sources', 'preferred_categories', 'preferred_authors', 'user_id'];
}
