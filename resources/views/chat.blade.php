<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>ワードッチ！</title>
        <link rel="icon" href="{{ asset('paint_capital_w.png') }}" type="image/png">
        @vite(['resources/js/app.js','resources/css/app.css'])
    </head>
    <body>
        <div class="">
            <div class="flex-grow">
                <div class="max-w-screen-md mx-auto p-4">
                    <div id="secret-area" class="mb-5 bg-green-100 p-4 rounded">
                        <!-- 現在の秘密の基準（表示用） -->
                        <div id="current-secret" class="mb-3 hidden">
                            <p id="display-secret">{{ $secretText }}</p>
                        </div>

                        <!-- 編集フォーム -->
                        <form id="secret-form" class="hidden">
                            <div id="secret-text-display" class="mb-2 text-lg font-semibold"></div> <!-- 保存されたテキストがここに表示 -->
                            <input type="text" id="secret-text" class="w-full p-2 border rounded" placeholder="秘密の基準を入力">
                            <button type="submit" id="save-secret" class="mt-2 bg-blue-500 text-white px-4 py-1 rounded">保存</button>
                        </form>

                        <!-- 編集/表示切替ボタン -->
                        <button id="toggle-secret" class="mt-2 bg-gray-500 text-white px-4 py-1 rounded hover:bg-red-600">秘密の基準</button>
                    </div>


                    <!-- 固定エリア -->
                    <div id="picked-up-area" class="mb-5 bg-yellow-100 p-4 rounded">
                        <div id="picked-messages">
                        </div>
                    </div>

                    <div>
                        <a href="{{ url('/rules') }}" class="rules-button">ルール説明</a>
                    </div>

                    <div class="word-container">
                        <input type="text" id="message" name="message" placeholder="ワードを書く">
                        <button id="send-button">送信</button>
                    </div>


                    <ul id="message-list">
                        @foreach ($messages as $message)
                            <div class="message-wrapper flex items-start space-x-4 mb-3" data-id="{{ $message->id }}">
                                <div class="w-96 bg-gray-100 p-2 rounded break-words">
                                    <li class="message whitespace-pre-wrap">{{ $message->message }}</li>
                                </div>
                                <div class="message-actions text-sm text-gray-500">
                                    <div>
                                        {{ $message->created_at->format('Y/m/d H:i:s') }}
                                    </div>
                                    <div class="other-buttons">
                                        <button class="pick-up-button mt-1 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-700">
                                            Pick Up
                                        </button>
                                        <button class="delete-button mt-1 bg-gray-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600">
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </body>
</html>
