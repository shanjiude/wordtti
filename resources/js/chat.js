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
    console.log(e);
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
        <div class="flex space-x-2"><button class="pick-up-button mt-1 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-700">Pick Up</button>
        <button class="delete-button mt-1 bg-gray-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600">削除</button></div>
    `;

    messageWrapper.appendChild(metaContainer);
    ul.prepend(messageWrapper);
});
