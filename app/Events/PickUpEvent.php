<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PickUpEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $messageId;
    public $message;

    /**
     * Create a new event instance.
     *
     * @param int $messageId
     * @param string $message
     */
    public function __construct($messageId, $message)
    {
        $this->messageId = $messageId;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn()
    {
        return new Channel('channel-chat'); // メッセージ一覧と同じチャンネルを使用
    }

    /**
     * データを返す（フロントエンドで受け取れる内容）
     */
    public function broadcastWith()
    {
        return [
            'messageId' => $this->messageId,
            'message' => $this->message,
        ];
    }
}
