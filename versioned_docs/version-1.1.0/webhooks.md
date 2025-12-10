---
id: webhooks
title: Webhooks
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhooks

Ilonapay sends real-time notifications to your specified IPN URL when payment status changes. This ensures you're immediately notified of payment completions, failures, and other status updates.

Configure your webhook endpoint to receive instant payment notifications. The webhook configuration interface allows you to set up your endpoint URL, enable or disable webhooks, verify SSL certificates, and test your webhook integration.

![Webhook Configuration Interface](/img/webhook.png)

> **Reliable Delivery**  
> Ilopay implements retry logic for failed webhook deliveries. We'll retry up to 5 times with exponential backoff.

---

## Webhook Headers

| Header      | Description                       | Example        |
|------------------------|-----------------------------------------------|---------------------------|
| `Content-Type`         | Always `application/json`          | `application/json`        |
| `x-signature`          | HMAC-SHA256 signature for verification | `a8b9c2d1e5f3...`         |

---

## Payload Webhook

<Tabs
  defaultValue="receive-payment"
  values={[
    {label: 'Status Pembayaran', value: 'receive-payment'},
    {label: 'Status Penarikan Dana', value: 'withdraw'},
  ]}
>

<TabItem value="receive-payment">

Example payload for an updated payment status:

```json
{
  "event": "receive_payment",
  "data": {
    "trx_id": "TRXJ0LFYU8CAT",
    "trx_reference": "37c84bdb-e6b7-4893-9b02-e4931d90cdce",
    "rrn": "fb96da8d931c",
    "amount": "1000.00",
    "currency_code": "IDR",
    "description": "Receive Payment from QRIS",
    "customer_name": "John Doe",
    "customer_email": "john@doe.com",
    "customer_phone": "62323232222",
    "merchant_id": 1,
    "merchant_name": "Demo Brand",
    "payment_method": "QRIS"
  },
  "message": "Receive Payment via QRIS",
  "status": "completed",
  "timestamp": 1762927877
}
```

</TabItem>

<TabItem value="withdraw">

Example payload for withdrawal status:

```json
{
  "event": "withdraw",
  "data": {
    "trx_id": "TRX-2025.11.14-1-BDH2JD8NNY170XO",
    "trx_reference": "95a190c6-ee73-488b-a386-382310f2d0c1",
    "amount": 50000,
    "net_amount": 50000,
    "payable_amount": 54000,
    "currency_code": "IDR",
    "status": "completed",
    "description": "Withdrawal request is completed by Bank Partner",
    "merchant_id": 1,
    "merchant_name": "Demo Brand",
    "withdrawal_method": "Bank Transfer",
    "account_name": "John Doe",
    "account_holder_name": "John Doe",
    "account_bank_name": "John Doe",
    "account_number": "123456789",
    "account_bank_code": "01",
    "trx_fee": 2000,
    "remarks": "Withdrawal request is completed by Financial Institution",
    "environment": "production",
    "is_sandbox": false
  },
  "message": "Withdrawal request is completed by Financial Institution",
  "timestamp": 1763101871
}
```

</TabItem>

</Tabs>

---

## Signature Verification

Always verify webhook signatures to ensure authenticity and prevent unauthorized requests. Use your API secret (environment-specific) to verify signatures.

<Tabs groupId="webhook-language" defaultValue="php" values={[
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python (Django)', value: 'python' },
]}>

<TabItem value="php">

```php
<?php
// Laravel Webhook Handler
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentGatewayWebhookController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        $signature = $request->header('x-signature');
        $secret = config('payment_gateway.webhook_secret');

        if (!$this->verifySignature($request->getContent(), $signature, $secret)) {
            Log::warning('Webhook signature verification failed');
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $payload = $request->json()->all();
        return $this->handleWebhook($payload);
    }

    private function verifySignature(string $payload, ?string $signature, string $secret): bool
    {
        if (empty($signature)) {
            return false;
        }

        $expectedSignature = hash_hmac('sha256', $payload, $secret);
        return hash_equals($expectedSignature, $signature);
    }

    private function handleWebhook(array $payload): JsonResponse
    {
        Log::info('Processing webhook', $payload);

        // Your logic here
        // Fulfill orders, send confirmation emails, etc.

        return response()->json(['status' => 'processed']);
    }
}
```

</TabItem>

<TabItem value="node">

```javascript
const crypto = require('crypto');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/api/webhooks', async (req, res) => {
    const signature = req.headers['x-signature'];
    const secret = process.env.WEBHOOK_SECRET;

    if (!verifySignature(JSON.stringify(req.body), signature, secret)) {
        console.warn('Webhook signature verification failed');
        return res.status(401).json({ error: 'Invalid signature' });
    }

    const payload = req.body;

    try {
        await handleWebhook(payload);
        res.json({ status: 'processed' });
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Processing failed' });
    }
});

function verifySignature(payload, signature, secret) {
    if (!signature || !secret) {
        return false;
    }

    const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(signature)
    );
}

async function handleWebhook(payload) {
    console.log('Processing webhook:', payload);

    // Your logic here
    // Fulfill orders, send confirmation emails, etc.
}
```

</TabItem>

<TabItem value="python">

```python
import hmac
import hashlib
import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST"])
def webhook(request):
    signature = request.headers.get('x-signature', '')
    secret = get_secret_key()

    if not verify_signature(request.body, signature, secret):
        logger.warning('Webhook signature verification failed')
        return JsonResponse({'error': 'Invalid signature'}, status=401)

    try:
        payload = json.loads(request.body)
        handle_webhook(payload)
        return JsonResponse({'status': 'processed'})

    except Exception as exc:
        logger.error('Webhook processing error: %s', exc)
        return JsonResponse({'error': 'Processing failed'}, status=500)

def get_secret_key():
    from django.conf import settings
    return settings.WEBHOOK_SECRET

def verify_signature(payload, signature, secret):
    if not signature or not secret:
        return False

    expected_signature = 'sha256=' + hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(expected_signature, signature)

def handle_webhook(payload):
    logger.info('Processing webhook', extra={'payload': payload})

    # Your logic here
    # Fulfill orders, send confirmation emails, etc.
```

</TabItem>

</Tabs>

