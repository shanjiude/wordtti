<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function index()
    {
        // 最後の20件を取得
        $messages = Message::orderBy('created_at', 'desc')->take(20)->get();

        // ログに記録
        Log::info('ChatController@index: メッセージを取得しました。', [
            'message_count' => $messages->count(),
            'messages' => $messages->toArray()
        ]);

        $response = [
            'messages' => $messages
        ];

        return view('chat', $response);
    }
}
