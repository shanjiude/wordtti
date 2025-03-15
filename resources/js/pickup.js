document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('message-list');
    const pickedMessagesContainer = document.getElementById('picked-messages');

    if (!messageList) {
        console.warn("message-list が見つかりません");
        return;
    }

    if (!pickedMessagesContainer) {
        console.warn("picked-messages が見つかりません");
        return;
    }

    // Pick Upボタンをクリックしたときの処理
    messageList.addEventListener('click', (event) => {
        if (event.target.matches('.pick-up-button')) {
            const messageElement = event.target.closest('.message-wrapper');
            if (!messageElement) return;

            const messageId = messageElement.getAttribute('data-id');
            const messageContent = messageElement.querySelector('.message')?.textContent;

            if (!messageId || !messageContent) {
                console.warn("メッセージIDまたは内容が取得できません");
                return;
            }

            // サーバーにピックアップリクエストを送信
            axios.post('/pick-up-message', { id: messageId, message: messageContent })
                .then((response) => {
                    console.log('ピックアップリクエスト成功:', response.data);
                })
                .catch((error) => {
                    console.error('ピックアップリクエストエラー:', error);
                });
        }
    });

    // リアルタイムにPickUpEventを反映
    Echo.channel('channel-chat').listen('PickUpEvent', (e) => {
        console.log('PickUpEventを受信:', e);

        pickedMessagesContainer.innerHTML = `
            <div class="picked-message mb-2 p-2 rounded bg-yellow-200 flex justify-between items-center">
                <span>${e.message}</span>
                <button id="clear-pick-up-button" class="ml-4 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-700">
                    解除
                </button>
            </div>
        `;
    });

    // 消去ボタンをクリックしたときの処理（解除リクエスト送信）
    pickedMessagesContainer.addEventListener('click', (event) => {
        if (event.target.matches('#clear-pick-up-button')) {
            axios.post('/clear-pick-up')
                .then((response) => {
                    console.log(response.data.message);
                })
                .catch((error) => {
                    console.error('Pick Up解除リクエストエラー:', error);
                });
        }
    });

    // ClearPickUpEventをリッスンしてリアルタイム反映
    Echo.channel('channel-chat').listen('ClearPickUpEvent', () => {
        pickedMessagesContainer.innerHTML = ''; // 固定エリアをクリア
    });
});
