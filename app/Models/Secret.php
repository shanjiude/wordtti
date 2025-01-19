<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Secret extends Model
{
    // マスアサインメントを許可するカラムを指定
    protected $fillable = ['text'];
}
