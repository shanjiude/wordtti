document.addEventListener('DOMContentLoaded', () => {
    const toggleSecretButton = document.getElementById('toggle-secret');
    const secretForm = document.getElementById('secret-form');
    const currentSecret = document.getElementById('current-secret');
    const displaySecret = document.getElementById('display-secret');
    const secretTextInput = document.getElementById('secret-text');

    // 必要な要素が見つからない場合は処理を中断
    if (!toggleSecretButton || !secretForm || !currentSecret || !displaySecret || !secretTextInput) {
        console.error("必要な要素が見つかりません。HTMLにIDが正しく設定されているか確認してください。");
        return;
    }

    // **初期状態で非表示にする**
    currentSecret.classList.add('hidden');
    secretForm.classList.add('hidden');

    // 初期状態で秘密の基準をロード
    function loadSecret() {
        axios.get('/get-secret')
            .then((response) => {
                const secretText = response.data.secretText;
                if (secretText) {
                    displaySecret.textContent = secretText;
                }
            })
            .catch((error) => {
                console.error('秘密の基準の取得エラー:', error);
            });
    }

    // 「秘密の基準を見る」ボタンのクリック処理
    toggleSecretButton.addEventListener('click', () => {
        // 表示・非表示を切り替える
        currentSecret.classList.toggle('hidden');
        secretForm.classList.toggle('hidden');
    });

    // フォーム送信時の処理（保存ボタン）
    secretForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const secretText = secretTextInput.value.trim();
        if (!secretText) {
            alert("秘密の基準を入力してください。");
            return;
        }

        axios.post('/save-secret', { secret_text: secretText })
            .then(() => {
                console.log('秘密の基準が保存されました');
                displaySecret.textContent = secretText;
                secretTextInput.value = '';
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    console.log('バリデーションエラー:', error.response.data.errors);
                    alert("入力に誤りがあります。");
                } else {
                    console.error('保存に失敗しました:', error);
                    alert("保存に失敗しました。");
                }
            });
    });

    // SecretUpdatedEvent をリッスン
    Echo.channel('secret-channel').listen('SecretUpdatedEvent', (event) => {
        console.log('秘密の基準が更新されました:', event.secretText);
        if (displaySecret) {
            displaySecret.textContent = event.secretText;
        }
    });

    // 初期表示で秘密の基準をロード
    loadSecret();
});
