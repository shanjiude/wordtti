<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>簡易チャット</title>
        @vite(['resources/js/app.js','resources/scss/chat.scss'])
    </head>
    <body>
        <div>
            <input type="text" id="message" name="message" placeholder="メッセージを書く">
            <button id="send-button">送信</button>
        </div>
        <ul id="message-list">
            @foreach ($messages as $message)
                <li class="message">{{ $message->message }}</li>
            @endforeach
        </ul>
    </body>
</html>
