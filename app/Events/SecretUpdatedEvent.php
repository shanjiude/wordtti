<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SecretUpdatedEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $secretText;

    public function __construct($secretText)
    {
        $this->secretText = $secretText;
    }

    public function broadcastOn()
    {
        return new Channel('secret-channel');
    }
}
