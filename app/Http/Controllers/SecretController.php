<?php

namespace App\Http\Controllers;

use App\Models\Secret;
use App\Events\SecretUpdatedEvent;
use Illuminate\Http\Request;

class SecretController extends Controller
{
    public function getSecret()
    {
        $secret = Secret::first(); // 最初のレコードを取得
        return response()->json([
            'secretText' => $secret ? $secret->text : '' // 保存されたテキストを返す
        ]);
    }

    // 秘密の基準を保存または更新
    public function saveSecret(Request $request)
    {
        $request->validate([
            'secret_text' => 'required|string|max:255',
        ]);

        $secret = Secret::first();
        if ($secret) {
            $secret->text = $request->secret_text;
            $secret->save();
        } else {
            Secret::create(['text' => $request->secret_text]);
        }

        // イベントを発火して、秘密の基準の変更をリアルタイムで通知
        broadcast(new SecretUpdatedEvent($request->secret_text));

        return response()->json(['message' => '秘密の基準が更新されました']);
    }
}
