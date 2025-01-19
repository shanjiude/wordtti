<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Secret;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Events\DeletedEvent;

class ChatController extends Controller
{
    public function index()
    {
        // 最後の20件を取得
        $messages = Message::orderBy('created_at', 'desc')->take(20)->get();

        // 秘密の基準を取得（最初のレコード）
        $secret = Secret::first();
        $secretText = $secret ? $secret->text : ''; // 秘密の基準があれば取得、なければ空文字

        $response = [
            'messages' => $messages,
            'secretText' => $secretText,
        ];

        return view('chat', $response);
    }

    public function deleteMessage(Request $request)
    {
        $id = $request->input('id');

        Log::info("削除対象メッセージID: " . $id); // IDをログに出力

        // メッセージが見つかるか確認
        $message = Message::find($id);
        if (!$message) {
            // メッセージが見つからなかった場合
            Log::error("メッセージが見つかりません: " . $id);
            return response()->json(['success' => false, 'message' => 'メッセージが見つかりません'], 404);
        }

        try {
            $message->delete();  // メッセージを削除
            DeletedEvent::dispatch($id);
            Log::info("メッセージ削除成功: " . $id);
            return response()->json(['success' => true, 'message' => 'メッセージが削除されました']);

        } catch (\Exception $e) {
            // 削除時にエラーが発生した場合
            Log::error("メッセージ削除失敗: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => '削除中にエラーが発生しました'], 500);
        }
    }
}
