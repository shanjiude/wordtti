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
    <div id="rules-section" class="bg-gray-100 p-4 rounded-lg shadow-lg ml-4">
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
<div class="text-center">
    <a href="{{ url('/') }}" class="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
        戻る
    </a>
</div>
</body>
</html>
