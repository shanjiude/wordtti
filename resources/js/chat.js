/**
 * Send a message to the server
 */
document.getElementById('send-button').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    if (message) {
      axios.post('/', { message: message }).then(() => {
        document.getElementById('message').value = '';
      });
    }
  });

  /**
   * Listen for events on the channel-chat channel
   */
  Echo.channel('channel-chat').listen('ChatEvent', (e) => {
    console.log("受信したイベント:", e);  // ここでeを確認
    const ul = document.getElementById('message-list');

    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper', 'flex', 'items-start', 'space-x-4', 'mb-3');
    messageWrapper.setAttribute('data-id', e.messageId);

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('w-96', 'bg-gray-100', 'p-2', 'rounded', 'break-words');

    const newMessage = document.createElement('li');
    newMessage.classList.add('message', 'whitespace-pre-wrap');
    newMessage.textContent = e.message;

    messageContainer.appendChild(newMessage);
    messageWrapper.appendChild(messageContainer);

    const metaContainer = document.createElement('div');
    metaContainer.classList.add('flex', 'flex-col', 'items-start', 'text-sm', 'text-gray-500');
    metaContainer.innerHTML = `
        <div>${new Date().toLocaleString()}</div>
        <button class="mt-1 bg-gray-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600">削除</button>
    `;

    messageWrapper.appendChild(metaContainer);
    ul.prepend(messageWrapper);
});

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
