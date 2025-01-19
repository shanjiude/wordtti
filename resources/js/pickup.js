// Pick Upボタンをクリックしたときの処理
document.getElementById('message-list').addEventListener('click', (event) => {
    if (event.target.matches('.pick-up-button')) {
        const messageElement = event.target.closest('.message-wrapper');
        const messageId = messageElement.getAttribute('data-id');
        const messageContent = messageElement.querySelector('.message').textContent;

        // サーバーにピックアップリクエストを送信
        axios.post('/pick-up-message', {
            id: messageId,
            message: messageContent
        }).then((response) => {
            console.log('ピックアップリクエスト成功:', response.data);
        }).catch((error) => {
            console.error('ピックアップリクエストエラー:', error);
        });
    }
});

// リアルタイムにPickUpEventを反映
Echo.channel('channel-chat').listen('PickUpEvent', (e) => {
    console.log('PickUpEventを受信:', e);

    // 固定エリアにピックアップされたメッセージを表示
    const pickedArea = document.getElementById('picked-messages');
    pickedArea.innerHTML = `
        <div class="picked-message mb-2 p-2 rounded bg-yellow-200 flex justify-between items-center">
            <span>${e.message}</span>
            <button id="clear-pick-up-button" class="ml-4 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-700">
                解除
            </button>
        </div>
    `;
});

// 消去ボタンをクリックしたときの処理（解除リクエスト送信）
document.getElementById('picked-messages').addEventListener('click', (event) => {
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
    const pickedMessagesContainer = document.getElementById('picked-messages');
    pickedMessagesContainer.innerHTML = ''; // 固定エリアをクリア
});
