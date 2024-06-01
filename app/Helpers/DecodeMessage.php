<?php

namespace App\Helpers;

class DecodeMessage
{
    public static function decodeMessageFromUrl($whatsappUrl)
    {
        // Parse the WhatsApp URL to get the message parameter
        $urlParts = parse_url($whatsappUrl);
        parse_str($urlParts['query'], $queryParams);
        $message = isset($queryParams['text']) ? $queryParams['text'] : '';

        // WhatsApp messages are URL encoded, so we'll decode them
        $decodedMessage = urldecode($message);

        // Return the decoded message
        return $decodedMessage;
    }
}
