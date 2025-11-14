---
id: generate-qris
title: Generate QRIS API
sidebar_position: 6
---
## Inisiasi Pembayaran QRIS

Buat permintaan pembayaran QRIS (Quick Response Code Indonesian Standard) yang terintegrasi dengan payment gateway. Endpoint ini mengembalikan informasi pembayaran yang diperlukan untuk pembuatan QRIS.

**Endpoint:**  
`POST /api/v1/initiate-payment-qris`

### Request Headers

| Header           | Value                | Required | Description               |
|------------------|---------------------|----------|---------------------------|
| Content-Type     | application/json     | ✅       | Request content type      |
| X-MERCHANT-KEY   | \{merchant_key\}     | ✅       | Your API Secret Key       |
| X-API-KEY        | \{api_key\}          | ✅       | Your API Key              |

### Request Parameters

| Parameter        | Type     | Required | Description                                                    |
|------------------|----------|----------|----------------------------------------------------------------|
| ref_trx          | string   | ✅       | Unique transaction reference (max 60 chars, must not exist in trx_reference) |
| currency_code    | string   | ✅       | Supported currency code. Allowed values: USD, IDR             |
| amount           | numeric  | ✅       | Payment amount (minimum 1)                                    |
| expiration_time  | integer  | ❌       | Expiration time in minutes (30-1440, default: 60)             |
| note             | string   | ❌       | Payment note (max 255 chars)                                  |
| description      | string   | ❌       | Payment description (max 255 chars)                           |
| customer_name    | string   | ❌       | Customer name for QRIS                                        |
| customer_phone   | string   | ❌       | Customer phone number                                         |

### Code Examples

#### cURL

```bash
# Basic cURL request for QRIS payment
curl -X POST "/api/v1/initiate-payment-qris" \
  -H "Content-Type: application/json" \
  -H "X-MERCHANT-KEY: your_merchant_key_here" \
  -H "X-API-KEY: your_api_key_here" \
  -d '{
    "ref_trx": "ORDER_12345",
    "currency_code": "IDR",
    "amount": 50000,
    "expiration_time": 60,
    "note": "Payment for Order #12345",
    "description": "Product Purchase",
    "customer_name": "John Doe",
    "customer_phone": "+6281234567890"
  }'
```

#### PHP/Laravel

```php
<?php

use Illuminate\Support\Facades\Http;

class QRISPaymentInitiator
{
    private string $merchantKey;
    private string $apiKey;
    private string $baseUrl;

    public function __construct(string $merchantKey, string $apiKey)
    {
        $this->merchantKey = $merchantKey;
        $this->apiKey = $apiKey;
        $this->baseUrl = '{{ $activeDomain }}/api/v1';
    }

    public function initiateQRISPayment(array $paymentData): array
    {
        try {
            $response = Http::timeout(60)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'X-MERCHANT-KEY' => $this->merchantKey,
                    'X-API-KEY' => $this->apiKey,
                ])
                ->post("{$this->baseUrl}/initiate-payment-qris", $paymentData);

            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'data' => $data,
                    'qris_data' => $data // Contains payment information for QRIS
                ];
            }

            return [
                'success' => false,
                'error' => 'HTTP ' . $response->status() . ': ' . $response->body(),
                'status_code' => $response->status()
            ];

        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}

// Usage Example
$qrisInitiator = new QRISPaymentInitiator(
    env('MERCHANT_KEY'),
    env('API_KEY')
);

$paymentData = [
    'ref_trx' => 'ORDER_' . time(),
    'currency_code' => 'IDR',
    'amount' => 50000,
    'expiration_time' => 60,
    'note' => 'Product Purchase',
    'description' => 'Online Shopping',
    'customer_name' => 'Jane Doe',
    'customer_phone' => '+6281234567890'
];

$result = $qrisInitiator->initiateQRISPayment($paymentData);

if ($result['success']) {
    $qrisInfo = $result['qris_data'];
    // Implement QRIS generation logic here
} else {
    echo "Error: " . $result['error'];
}
```

#### Node.js

```javascript
const axios = require('axios');

class QRISPaymentInitiator {
    constructor(merchantKey, apiKey) {
        this.merchantKey = merchantKey;
        this.apiKey = apiKey;
        this.baseUrl = '{{ $activeDomain }}/api/v1';
    }

    static getInstance(merchantKey, apiKey) {
        return new QRISPaymentInitiator(merchantKey, apiKey);
    }

    async initiateQRISPayment(paymentData) {
        try {
            const response = await axios.post(`${this.baseUrl}/initiate-payment-qris`, paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-MERCHANT-KEY': this.merchantKey,
                    'X-API-KEY': this.apiKey
                },
                timeout: 30000
            });

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data,
                    qrisData: response.data // Contains payment information for QRIS
                };
            }
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    error: error.response.data.message || `HTTP ${error.response.status}`,
                    statusCode: error.response.status
                };
            }
            return {
                success: false,
                error: error.message,
                type: 'network_error'
            };
        }
    }
}

// Usage Example
async function createQRISPayment() {
    const qrisInitiator = QRISPaymentInitiator.getInstance(
        process.env.MERCHANT_KEY,
        process.env.API_KEY
    );

    const paymentData = {
        ref_trx: `ORDER_${Date.now()}`,
        currency_code: 'IDR',
        amount: 50000,
        expiration_time: 60,
        note: 'Product Purchase',
        description: 'Online Shopping',
        customer_name: 'Jane Doe',
        customer_phone: '+6281234567890'
    };

    try {
        const result = await qrisInitiator.initiateQRISPayment(paymentData);

        if (result.success) {
            console.log('QRIS Data:', result.qrisData);
            // Implement QRIS generation using result.qrisData
        } else {
            console.error('QRIS initiation failed:', result.error);
        }
    } catch (error) {
        console.error('QRIS payment setup failed:', error.message);
    }
}

module.exports = { QRISPaymentInitiator, createQRISPayment };
```

### Success Response

```json
{
    "qrImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA6AAAAOgAQAAAAALviYcAAAOiklEQVR4Xu2bQZLdOA5E6fDCyzqCjqKjSUfTUXSEv6yFozDITJCSe9w9i2l1f0ZkLlwsEsDD32SA/OUW/4LaHzf..",
    "terminalId": "A01",
    "nmid": "ID1025434113102",
    "createdTs": "2025-11-12T13:10:33.108+07:00",
    "feeAmount": 7,
    "totalAmount": 1000,
    "merchantLocation": "JAKARTA PUSAT",
    "expiredTs": "2025-11-12T13:40:33.067+07:00",
    "invoiceId": "INV-M_svCltoL61762927833067ngO",
    "retailOutletData": null,
    "trxId": "TRX-2025.11.12-J0LFYU8CAT",
    "virtualAccountData": [],
    "statistic": [],
    "status": true,
    "netzmeSeamlessToken": "",
    "refTrx": "37c84bdb-e6b7-4893-9b02-e4931d90cdce"
}
```

### Error Response

```json
{
    "error": "Invalid or mismatched currency code."
}
```

> **ℹ️ Pembuatan QRIS:**  
> Gunakan data `additionalInfo` yang dikembalikan untuk menghasilkan kode QRIS untuk pemindaian pembayaran pelanggan.

> **⚠️ Waktu Kedaluwarsa:**  
> Pembayaran QRIS secara otomatis kedaluwarsa setelah waktu `expiration_time` yang ditentukan (dalam menit). Waktu kedaluwarsa default adalah 60 menit.
