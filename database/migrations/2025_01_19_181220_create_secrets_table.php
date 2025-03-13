<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSecretsTable extends Migration
{
    public function up()
    {
        Schema::create('secrets', function (Blueprint $table) {
            $table->id(); // 自動インクリメントのID
            $table->text('text'); // 秘密の基準を格納するtext型カラム
            $table->timestamps(); // created_at と updated_at を自動で管理
        });
    }

    public function down()
    {
        Schema::dropIfExists('secrets');
    }
}
