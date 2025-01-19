document.getElementById('message-list').addEventListener('click', (event) => {
    if (event.target.matches('.delete-button')) {
        // 親要素から data-id を取得
        const messageElement = event.target.closest('.message-wrapper');
        const messageId = messageElement?.getAttribute('data-id');

        if (messageId) {
            // サーバーに削除リクエストを送信
            axios.post('/delete-message', { id: messageId }) // ペイロードに含める
                .then((response) => {
                    console.log('サーバー応答:', response.data);
                    if (response.data.success) {
                        messageElement.remove();
                    } else {
                        alert('削除に失敗しました');
                    }
                })
                .catch((error) => {
                    console.error('削除リクエストエラー:', error);
                    alert('サーバーエラーが発生しました');
                });
        } else {
            console.error('メッセージIDが取得できません');
        }
    }
});


Echo.channel('channel-chat').listen('DeletedEvent', (e) => {
        const messageId = e.messageId;

        // 削除されたメッセージをDOMから削除
        const messageElement = document.querySelector(`[data-id="${messageId}"]`);
        if (messageElement) {
            messageElement.remove();
        }
    });

    document.getElementById('message-list').addEventListener('click', (event) => {
    if (event.target.matches('.pick-up-button')) {
        // ピックアップ対象のメッセージ要素を取得
        const messageElement = event.target.closest('.message-wrapper');
        const messageContent = messageElement.querySelector('.message').textContent;

        // 固定エリアにメッセージを追加
        const pickedArea = document.getElementById('picked-messages');
        const pickedMessage = document.createElement('div');
        pickedMessage.classList.add('picked-message', 'mb-2', 'p-2', 'rounded', 'bg-yellow-200');
        pickedMessage.textContent = messageContent;

        // すでに固定されたメッセージがある場合、置き換える（1件だけ表示する仕様）
        pickedArea.innerHTML = '';
        pickedArea.appendChild(pickedMessage);
    }

    if (event.target.matches('.delete-button')) {
        // ここは削除ボタンの既存処理
        const messageElement = event.target.closest('.message-wrapper');
        const messageId = messageElement.getAttribute('data-id');

        if (messageId) {
            axios.post('/delete-message', { id: messageId })
                .then((response) => {
                    if (response.data.success) {
                        messageElement.remove();
                    } else {
                        alert('削除に失敗しました');
                    }
                })
                .catch((error) => {
                    console.error('削除リクエストエラー:', error);
                });
        } else {
            console.error('メッセージIDが取得できません');
        }
    }
});
