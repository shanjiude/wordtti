<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Events\ChatEvent;

Route::get('/', [ChatController::class, 'index']);

# ポスト用ルーティング
Route::post('/', function (Request $request) {
    ChatEvent::dispatch($request->message);
    return response()->json(['message' => 'success!']);
});
