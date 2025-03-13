<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;
use Illuminate\Support\Facades\Log;


class ChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $messageId;

    /**
     * Create a new event instance.
     *
     * @param string|null $message
     * @param int|null $messageId
     */
    public function __construct($message = null, int $messageId)
    {
        $this->message = $message;
        $this->messageId = $messageId;  // messageIdを設定

        \Log::info('ChatEvent: ', ['message' => $message, 'messageId' => $messageId]);

    }


    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('channel-chat'),
        ];
    }
}
