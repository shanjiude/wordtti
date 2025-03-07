<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>ワードッチ！</title>
        <link rel="icon" href="{{ asset('paint_capital_w.png') }}" type="image/png">
        @vite(['resources/js/app.js','resources/css/app.css','resources/scss/chat.scss'])
    </head>
    <body>
        <div class="flex">
            <div class="flex-grow">
                <div class="position: absolute top-20 left-10">
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
                        <input type="text" id="message" name="message" placeholder="ワードを書く">
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
                                    <div class="flex space-x-2">
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
            <div id="rules-section" class="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg ml-4">
                <h2 class="text-2xl font-bold text-center mb-4">ワードッチのルール</h2>
                <p class="text-lg font-semibold mb-2">ワードッチは3人から6人程度のパーティーゲームです！</p>
                <h3 class="text-xl font-bold mt-4">ルール</h3>
                <ol class="list-decimal list-inside text-lg leading-relaxed mt-2">
                    <li><span class="font-bold">親が基準を決める</span><br>
                        親は秘密の基準ボタンを押して、今回のゲームの基準を決める<br>
                        例：無人島にぜひ持って行きたいもの
                    </li>
                    <li class="mt-2"><span class="font-bold">最初の暫定チャンピオンを決める</span><br>
                        子はひとりひとつ適当な単語を投げかけ、親はそのうち一つを暫定チャンピオンとしてください<br>
                        暫定チャンピオンとした単語のPickupボタンを押して、投げかけるワードと戦わせます！
                    </li>
                    <li class="mt-2"><span class="font-bold">子は思いついたらワードを書く</span><br>
                        基準を探るため、子はワードを書いていってください。
                    </li>
                    <li class="mt-2"><span class="font-bold">2つのワードの勝敗を決める</span><br>
                        親は暫定チャンピオンのワードと子のワードを比較していって、子のワードが上回り次第Pick Upを更新してください！
                    </li>
                    <li class="mt-2"><span class="font-bold">決戦フェイズ</span><br>
                        ある程度、基準の想像がついたら決戦フェイズに移ります。<br>
                        一旦単語の比較を締め切り、ひとりひとワードを一斉にチャットしてください。<br>
                        今まで使ったワードは禁止です！<br>
                        一斉に出た単語を比較して、親は勝者を決めます。勝った人が次の親になります。
                    </li>
                </ol>
            </div>
        </div>
    </body>
</html>
