<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SecretController;
use App\Events\ChatEvent;
use App\Events\PickUpEvent;
use App\Events\ClearPickUpEvent;
use App\Models\Message;


Route::get('/', [ChatController::class, 'index']);

# ポスト用ルーティング
Route::post('/', function (Request $request) {
    // メッセージを保存
    $message = new Message();
    $message->message = $request->message;
    $message->save();

    // メッセージIDを取得
    $messageId = $message->id;

    // メッセージIDとメッセージをイベントに渡してブロードキャスト
    ChatEvent::dispatch($request->message, $messageId);

    return response()->json(['message' => 'success!']);
});

Route::post('/delete-message', [ChatController::class, 'deleteMessage'])->name('messages.delete');

Route::post('/pick-up-message', function (Request $request) {
    $messageId = $request->id; // ピックアップされたメッセージのID
    $message = $request->message; // ピックアップされたメッセージ内容

    // PickUpEventをブロードキャスト
    PickUpEvent::dispatch($messageId, $message);

    return response()->json(['success' => true]);
})->name('messages.pickup');

Route::post('/clear-pick-up', function () {
    ClearPickUpEvent::dispatch();
    return response()->json(['message' => 'Pick Up解除がブロードキャストされました']);
});


Route::get('/get-secret', [SecretController::class, 'getSecret']);

// 秘密の基準を保存
Route::post('/save-secret', [SecretController::class, 'saveSecret']);
