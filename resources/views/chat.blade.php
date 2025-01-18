<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>簡易チャット</title>
        @vite(['resources/js/app.js','resources/css/app.css','resources/scss/chat.scss'])
    </head>
    <body>
        <div class="position: absolute top-20 left-10">
            <div>
                <input type="text" id="message" name="message" placeholder="メッセージを書く">
                <button id="send-button">送信</button>
            </div>
            <ul id="message-list">
                @foreach ($messages as $message)
                    <div class="message-wrapper flex items-start space-x-4 mb-3" data-id="{{ $message->id }}">
                        <div class="w-96 bg-gray-100 p-2 rounded break-words">
                            <li class="message whitespace-pre-wrap">{{ $message->message }}</li>
                        </div>
                        <div class="flex flex-col items-start text-sm text-gray-500">
                            <div>
                                {{ $message->created_at->format('Y/m/d H:i') }}
                            </div>
                            <button class="delete-button mt-1 bg-gray-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600">
                                削除
                            </button>
                        </div>
                    </div>
                @endforeach
            </ul>
        </div>
    </body>
</html>
