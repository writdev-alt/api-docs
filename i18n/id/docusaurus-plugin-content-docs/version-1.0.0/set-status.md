---
id: set-status
title: Manajemen Status Pembayaran
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Manajemen Status Pembayaran

> ⚠️ **Hanya Sandbox**  
> Fitur ini hanya tersedia di lingkungan sandbox/pengujian untuk kebutuhan development dan testing.

**Akses antarmuka manajemen status pembayaran** melalui navigasi dasbor merchant: buka **Payment → Set Status**.

![Payment Status Management](/img/set-status-payment.png)

### Status Pembayaran yang Tersedia

| Status Code               | Kategori                         | Deskripsi Status                                              |
|---------------------------|----------------------------------|---------------------------------------------------------------|
| `pending`                 | `receive_payment`                | Transaksi menunggu konfirmasi pembayaran                     |
| `awaiting_fi_process`     | `withdraw`                       | Menunggu diproses oleh institusi keuangan                    |
| `awaiting_pg_process`     | `withdraw`                       | Dalam antrean gateway pembayaran untuk diproses lebih lanjut |
| `awaiting_user_action`    | `withdraw`                       | Merchant/pelanggan harus melakukan tindakan lanjutan         |
| `awaiting_admin_approval` | `withdraw`                       | Menunggu persetujuan manual dari administrator               |
| `completed`               | `receive_payment`, `withdraw`    | Proses pembayaran berhasil diselesaikan                      |
| `canceled`                | `receive_payment`, `withdraw`    | Proses pembayaran dibatalkan oleh pengguna atau sistem       |
| `failed`                  | `receive_payment`, `withdraw`    | Proses pembayaran gagal karena kesalahan                     |
| `refunded`                | `withdraw`                       | Dana dikembalikan ke pembayar setelah proses selesai         |
| `expired`                 | `receive_payment`, `withdraw`    | Sesi pembayaran melewati batas waktu dan tidak dapat lanjut  |

---

## API Cek Status Transaksi

Gunakan endpoint ini untuk mengambil status terkini sebuah transaksi secara real-time sekaligus detail transaksi terkait.

**Endpoint:**  
`GET /api/v1/check-status/{trxId}`

### Header Permintaan

| Header            | Nilai                | Wajib | Deskripsi                               |
|-------------------|---------------------|:-----:|-----------------------------------------|
| `Accept`          | `application/json`  | ✅    | Format respons yang diharapkan.         |
| `X-MERCHANT-KEY`  | `{merchant_key}`    | ✅    | ID Merchant Anda.                       |
| `X-API-KEY`       | `{api_key}`         | ✅    | API Key Anda.                           |

### Parameter Path

| Parameter | Tipe   | Wajib | Deskripsi                       |
|-----------|--------|:-----:|---------------------------------|
| `trxId`   | string | ✅    | Identitas unik transaksi        |

### Contoh Kode

<Tabs groupId="status-language" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X GET "/api/v1/check-status/TRX123456789" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: merchant_key" \
  -H "X-API-KEY: api_key"
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v1';
$merchantKey = 'merchant_key';
$apiKey = 'api_key';
$trxId = 'TRX123456789';

$response = Http::timeout(60)->withHeaders([
    'Accept' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->get("{$baseUrl}/check-status/{$trxId}");

if ($response->successful()) {
    $result = $response->json();
    echo "Status: " . $result['status'] . PHP_EOL;
    echo "Pesan: " . $result['message'] . PHP_EOL;
} else {
    $error = $response->json();
    echo "Error: " . $error['message'];
}
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const trxId = 'TRX123456789';

axios
  .get(`${baseUrl}/check-status/${trxId}`, {
    headers: {
      Accept: 'application/json',
      'X-MERCHANT-KEY': merchantKey,
      'X-API-KEY': apiKey,
    },
  })
  .then((response) => {
    console.log('Status:', response.data.status);
    console.log('Pesan:', response.data.message);
  })
  .catch((error) => {
    if (error.response) {
      console.error('Error:', error.response.data.message);
    } else {
      console.error('Error:', error.message);
    }
  });
```

</TabItem>

<TabItem value="python">

```python
import requests

base_url = '/api/v1'
merchant_key = 'merchant_key'
api_key = 'api_key'
trx_id = 'TRX123456789'

headers = {
    'Accept': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.get(f"{base_url}/check-status/{trx_id}", headers=headers)

if response.status_code == 200:
    result = response.json()
    print(f"Status: {result['status']}")
    print(f"Pesan: {result['message']}")
else:
    error = response.json()
    print(f"Error: {error['message']}")
```

</TabItem>

</Tabs>

---

<Tabs groupId="status-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
    { label: 'Pending', value: 'pending' },
    { label: '404 Not Found', value: 'not-found' },
    { label: '500 Internal Server Error', value: 'server-error' },
]}>

<TabItem value="success">

```json
{
    "status": "completed",
    "message": "receive_payment, request status checked successfully.",
    "data": {
        "trx_id": "TRX-2025.11.18-CBBTFMQ8CI",
        "trx_reference": "1e3ff45c-3fab-4894-a2b0-2cf0180a8234",
        "rrn": "9889cdc74976",
        "amount": 1000,
        "currency_code": null,
        "status": "completed"
    }
}
```

</TabItem>

<TabItem value="pending">

```json
{
    "status": "pending",
    "message": "receive_payment, request status checked successfully.",
    "data": {
        "trx_id": "TRX-2025.11.19-XXEAJ4MTLW",
        "trx_reference": "39bb5912-135a-421a-b947-33a0f0754ee9",
        "rrn": null,
        "amount": 1000,
        "currency_code": null,
        "status": "pending"
    }
}
```

</TabItem>

<TabItem value="not-found">

```json
{
    "success": false,
    "message": "Transaction not found."
}
```

</TabItem>

<TabItem value="server-error">

```json
{
    "success": false,
    "message": "Failed to check transaction status.",
    "error": "Error details here"
}
```

</TabItem>

</Tabs>

---

> ℹ️ **Catatan:** Pesan status akan memuat jenis transaksi (misal, "Payment, request status checked successfully" atau "Withdrawal, request status checked successfully").


