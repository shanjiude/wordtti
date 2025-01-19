
// 初期状態で保存されている秘密の基準を表示
function loadSecret() {
    axios.get('/get-secret') // サーバーから現在の秘密の基準を取得
        .then((response) => {
            const secretText = response.data.secretText;
            const secretTextDisplay = document.getElementById('secret-text-display');
            const displaySecret = document.getElementById('display-secret');

            if (secretText) {
                // 保存された秘密の基準をフォームに表示
                secretTextDisplay.textContent = secretText;
                displaySecret.textContent = secretText;
            }
        })
        .catch((error) => {
            console.error('秘密の基準の取得エラー:', error);
        });
}

// フォーム送信時の処理（保存ボタン）
document.getElementById('secret-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const secretText = document.getElementById('secret-text').value;
    const displaySecret = document.getElementById('display-secret');

    // サーバーに秘密の基準を送信して保存
    axios.post('/save-secret', { secret_text: secretText })
        .then((response) => {
            console.log('保存完了');

            // 保存されたテキストを表示
            displaySecret.textContent = secretText;

            // フォームを非表示にし、現在の秘密の基準を表示
            document.getElementById('secret-form').classList.add('hidden');
            document.getElementById('current-secret').classList.remove('hidden');

            // 「秘密の基準を見る」ボタンに切り替え
            document.getElementById('toggle-secret').textContent = '編集';
        })
        .catch((error) => {
            console.error('秘密の基準保存エラー:', error);
        });
});

// 初期表示で秘密の基準をロード
loadSecret();

Echo.channel('secret-channel')
    .listen('SecretUpdated', (event) => {
        console.log('秘密の基準が更新されました:', event.secretText);

        // 秘密の基準が更新された時、フロントエンドの表示を更新
        const secretArea = document.getElementById('secret-area');
        const currentSecret = secretArea.querySelector('#current-secret');
        if (currentSecret) {
            currentSecret.textContent = event.secretText;
        }
    });
