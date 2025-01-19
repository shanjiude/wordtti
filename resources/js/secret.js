// 初期状態で秘密の基準をロード
function loadSecret() {
    axios.get('/get-secret') // サーバーから現在の秘密の基準を取得
        .then((response) => {
            const secretText = response.data.secretText;
            const secretTextDisplay = document.getElementById('display-secret');
            const currentSecret = document.getElementById('current-secret');

            if (secretText) {
                // 保存された秘密の基準を表示
                secretTextDisplay.textContent = secretText;
            }
        })
        .catch((error) => {
            console.error('秘密の基準の取得エラー:', error);
        });
}

// 「秘密の基準を見る」ボタンのクリック処理
document.getElementById('toggle-secret').addEventListener('click', () => {
    const secretForm = document.getElementById('secret-form');
    const currentSecret = document.getElementById('current-secret');

    // 表示/編集モードを切り替え
    if (currentSecret.classList.contains('hidden')) {
        // 「秘密の基準を見る」を押すと、表示部分とフォームが表示される
        currentSecret.classList.remove('hidden');
        secretForm.classList.remove('hidden');
    } else {
        // 再度非表示にする
        currentSecret.classList.add('hidden');
        secretForm.classList.add('hidden');
    }
});

// フォーム送信時の処理（保存ボタン）
document.getElementById('secret-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const secretText = document.getElementById('secret-text').value; // 入力値を取得
    const displaySecret = document.getElementById('display-secret'); // <p> 要素を取得

    // サーバーに秘密の基準を送信して保存
    axios.post('/save-secret', { secret_text: secretText }).then(() => {
            console.log('秘密の基準が保存されました');
            displaySecret.textContent = secretText;
            document.getElementById('secret-text').value = '';
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                console.log('バリデーションエラー:', error.response.data.errors);
            }
            console.error('保存に失敗しました:', error);
        });
});

Echo.channel('secret-channel').listen('SecretUpdatedEvent', (event) => {
        console.log('秘密の基準が更新されました:', event.secretText);

        // 秘密の基準が更新された時、フロントエンドの表示を更新
        const secretTextDisplay = document.getElementById('display-secret');
        if (secretTextDisplay) {
            secretTextDisplay.textContent = event.secretText;
        }
    });

// 初期表示で秘密の基準をロード
loadSecret();
