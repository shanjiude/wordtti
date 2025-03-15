/**
 * Send a message to the server
 */
document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            const message = document.getElementById('message').value;
            if (message) {
                axios.post('/', { message: message }).then(() => {
                    document.getElementById('message').value = '';
                });
            }
        });
    } else {
        console.warn("send-button が見つかりません");
    }
});

/**
 * Listen for events on the channel-chat channel
 */
Echo.channel('channel-chat').listen('ChatEvent', (e) => {
    console.log(e);
    const ul = document.getElementById('message-list');

    if (!ul) {
        console.warn("message-list が見つかりません");
        return;
    }

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

    // `.message-actions` を適用
    const metaContainer = document.createElement('div');
    metaContainer.classList.add('message-actions', 'text-sm', 'text-gray-500', 'flex', 'items-center', 'gap-2');

    const timeContainer = document.createElement('div');
    timeContainer.textContent = new Date().toLocaleString();

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('other-buttons', 'flex', 'space-x-2');

    const pickUpButton = document.createElement('button');
    pickUpButton.classList.add('pick-up-button', 'mt-1', 'bg-blue-500', 'text-white', 'px-2', 'py-1', 'text-xs', 'rounded', 'hover:bg-blue-700');
    pickUpButton.textContent = 'Pick Up';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button', 'mt-1', 'bg-gray-500', 'text-white', 'px-2', 'py-1', 'text-xs', 'rounded', 'hover:bg-red-600');
    deleteButton.textContent = '削除';

    // ボタンをボタンコンテナに追加
    buttonContainer.appendChild(pickUpButton);
    buttonContainer.appendChild(deleteButton);

    // `metaContainer` に時刻とボタンを追加
    metaContainer.appendChild(timeContainer);
    metaContainer.appendChild(buttonContainer);

    // `messageWrapper` に追加
    messageWrapper.appendChild(metaContainer);
    ul.prepend(messageWrapper);
});
