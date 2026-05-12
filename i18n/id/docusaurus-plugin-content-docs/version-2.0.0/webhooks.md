---
id: webhooks
slug: /webhooks-v2
title: Webhook
description: Konfigurasi pengiriman webhook, signature, retry, dan penanganan payload untuk pembaruan transaksi API v2.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook

Ilonapay mengirim notifikasi real-time ke URL IPN yang Anda tentukan ketika status pembayaran berubah. Ini memastikan Anda segera menerima informasi tentang pembayaran yang selesai, gagal, dan pembaruan status lainnya.

Konfigurasikan endpoint webhook Anda untuk menerima notifikasi pembayaran secara instan. Antarmuka konfigurasi webhook memungkinkan Anda mengatur URL endpoint, mengaktifkan atau menonaktifkan webhook, memverifikasi sertifikat SSL, dan menguji integrasi webhook.

![Antarmuka Konfigurasi Webhook](/img/webhook.png)

:::note Pengiriman Andal
Ilonapay melakukan retry pengiriman webhook yang gagal hingga 5 kali menggunakan exponential backoff.
:::

---

## Header Webhook

| Header      | Description                       | Example        |
|------------------------|-----------------------------------------------|---------------------------|
| `Content-Type`         | Selalu `application/json`          | `application/json`        |
| `x-signature`          | Signature HMAC-SHA256 untuk verifikasi | `a8b9c2d1e5f3...`         |

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

Contoh payload untuk pembaruan status pembayaran:

```json
{
  "event": "receivePayment",
  "data": {
    "trxId": "TRXJ0LFYU8CAT",
    "trxReference": "37c84bdb-e6b7-4893-9b02-e4931d90cdce",
    "rrn": "fb96da8d931c",
    "amount": "1000.00",
    "currencyCode": "IDR",
    "description": "Receive Payment from QRIS",
    "customerName": "John Doe",
    "customerEmail": "john@doe.com",
    "customerPhone": "62323232222",
    "merchantId": 1,
    "merchantName": "Demo Brand",
    "paymentMethod": "QRIS"
  },
  "message": "Receive Payment via QRIS",
  "status": "completed",
  "timestamp": 1762927877
}
```

</TabItem>

<TabItem value="withdraw">

Contoh payload untuk status penarikan dana:

```json
{
  "event": "withdraw",
  "data": {
    "trxId": "TRX-2025.11.14-1-BDH2JD8NNY170XO",
    "trxReference": "95a190c6-ee73-488b-a386-382310f2d0c1",
    "amount": 50000,
    "netAmount": 50000,
    "payableAmount": 54000,
    "currencyCode": "IDR",
    "status": "completed",
    "description": "Withdrawal request is completed by Bank Partner",
    "merchantId": 1,
    "merchantName": "Demo Brand",
    "withdrawalMethod": "Bank Transfer",
    "accountName": "John Doe",
    "accountHolderName": "John Doe",
    "accountBankName": "John Doe",
    "accountNumber": "123456789",
    "accountBankCode": "01",
    "trxFee": 2000,
    "remarks": "Withdrawal request is completed by Financial Institution",
    "environment": "production",
    "isSandbox": false
  },
  "message": "Withdrawal request is completed by Financial Institution",
  "timestamp": 1763101871
}
```

</TabItem>

</Tabs>

---

## Verifikasi Signature

Selalu verifikasi signature webhook untuk memastikan autentisitas dan mencegah request yang tidak sah. Gunakan API secret (spesifik per environment) untuk memverifikasi signature.

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
