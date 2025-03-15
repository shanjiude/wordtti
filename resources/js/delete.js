document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('message-list');

    if (!messageList) {
        console.warn('message-list が見つかりません');
        return; // ここで処理を中断
    }

    messageList.addEventListener('click', (event) => {
        if (event.target.matches('.delete-button')) {
            const messageElement = event.target.closest('.message-wrapper');
            const messageId = messageElement?.getAttribute('data-id');

            if (messageId) {
                axios.post('/delete-message', { id: messageId })
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

        if (event.target.matches('.pick-up-button')) {
            const messageElement = event.target.closest('.message-wrapper');
            const messageContent = messageElement.querySelector('.message')?.textContent;

            if (!messageContent) {
                console.warn('メッセージ内容が取得できません');
                return;
            }

            const pickedArea = document.getElementById('picked-messages');
            if (!pickedArea) {
                console.warn('picked-messages が見つかりません');
                return;
            }

            pickedArea.innerHTML = ''; // 既存の固定メッセージをクリア
            const pickedMessage = document.createElement('div');
            pickedMessage.classList.add('picked-message', 'mb-2', 'p-2', 'rounded', 'bg-yellow-200');
            pickedMessage.textContent = messageContent;
            pickedArea.appendChild(pickedMessage);
        }
    });
});
