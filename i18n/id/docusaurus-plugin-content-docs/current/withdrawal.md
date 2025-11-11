---
id: withdrawal
title: API Penarikan Dana
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Membuat Permintaan Penarikan

Mulai penarikan dana baru dari dompet tertentu ke akun penarikan yang sudah terdaftar.

**Endpoint:**  
`POST /api/v1/withdraw`

---

### Header Permintaan

| Header | Nilai | Wajib | Deskripsi |
|---------------------|---------------------|----------|-------------------------|
| `Content-Type` | `application/json` | ✅ | Tipe konten permintaan. |
| `X-MERCHANT-KEY` | `{merchant_key}` | ✅ | ID Merchant Anda. |
| `X-API-KEY` | `{api_key}` | ✅ | API Key Anda. |

---

### Body Permintaan

| Parameter | Tipe | Wajib | Deskripsi |
|--------------|--------|----------|------------------------------------------------------------------------------------------------|
| `account_id` | number | ✅ | ID akun penarikan. Gunakan ID yang diperoleh dari endpoint `Get Withdrawal Accounts`. |
| `wallet_id` | number | ✅ | ID dompet sumber dana. |
| `amount` | number | ✅ | Jumlah dana yang akan ditarik. |

---

### Contoh Kode

<Tabs
  defaultValue="curl"
  values={[
    {label: 'cURL', value: 'curl'},
    {label: 'PHP / Laravel', value: 'php'},
    {label: 'Node.js', value: 'node'},
    {label: 'Python', value: 'python'},
  ]}
>

<TabItem value="curl">

```bash
curl -X POST "{{ $activeDomain }}/api/v1/withdraw" \
  -H "Content-Type: application/json" \
  -H "X-MERCHANT-KEY: {merchant_key}" \
  -H "X-API-KEY: {api_key}" \
  -d '{"account_id": 2, "wallet_id": 2, "amount": 10000}'
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '{{ $activeDomain }}/api/v1';
$merchantKey = "merchant_key";
$apiKey = "api_key";
$withdrawalData = [
    'account_id' => 2,
    'wallet_id' => 2,
    'amount' => 10000,
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->post("{$baseUrl}/withdraw", $withdrawalData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '{{ $activeDomain }}/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const withdrawalData = {
    account_id: 2,
    wallet_id: 2,
    amount: 10000,
};

axios.post(`${baseUrl}/withdraw`, withdrawalData, {
    headers: {
        'Content-Type': 'application/json',
        'X-MERCHANT-KEY': merchantKey,
        'X-API-KEY': apiKey,
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error.response.data);
});
```

</TabItem>

<TabItem value="python">

```python
import requests

base_url = '{{ $activeDomain }}/api/v1'
merchant_key = 'merchant_key'
api_key = 'api_key'
withdrawal_data = {
    'account_id': 2,
    'wallet_id': 2,
    'amount': 10000,
}

headers = {
    'Content-Type': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.post(f"{base_url}/withdraw", headers=headers, json=withdrawal_data)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

---

### Respons Berhasil

**201 Created**

```json
{
    "message": "Withdrawal has been created.",
    "data": {
        "trx_id": "WTH-20250910-12345",
        "amount": 10000,
        "account_id": 2,
        "wallet_id": "1234567890"
    }
}
```

---

### Respons Galat

**Validasi Gagal — 422 Unprocessable Entity**

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "amount": ["The amount must be greater than zero."],
        "wallet_id": ["The selected wallet ID is invalid."]
    }
}
```

**Penarikan Dinonaktifkan — 422 Unprocessable Entity**

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "account_id": ["Withdrawals are not enabled for today."]
    }
}
```

**Mata Uang Tidak Sama — 422 Unprocessable Entity**

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "account_id": ["The currency of account and wallet must be the same."]
    }
}
```

**Jumlah Di Luar Batas — 422 Unprocessable Entity**

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "account_id": ["Amount is not within the allowed limits."]
    }
}
```

---

> **⚠️ Validasi Penting**
>
> - Penarikan hanya dapat dilakukan jika jadwal penarikan hari tersebut aktif.
> - Dompet dan akun penarikan harus menggunakan mata uang yang sama.
> - Jumlah penarikan harus berada dalam batas minimum/maksimum metode yang digunakan.
> - Saldo dompet harus mencukupi.
> - Akun penarikan harus milik pengguna yang terautentikasi.

---

> **💡 Catatan**
>
> - Perhatikan parameter `payment_method` pada antarmuka transfer dan verifikasi kartu:
>     - Jika rekening penerima berupa kartu bank, gunakan nilai `1`.
>     - Jika rekening penerima berupa nomor VA, gunakan nilai `2`.
>     - Jika rekening penerima berupa e-wallet, gunakan nilai `3`.
> - Parameter `bank_id` pada antarmuka transfer dan verifikasi kartu mengambil nilai dari endpoint yang berbeda tergantung metode pembayaran.

---

### Contoh Metode Pembayaran

| Nama Metode Pembayaran | payment_method | channel | bank_id | account_number | account_holder_name |
|------------------------|----------------|---------|---------|----------------|---------------------|
| Kartu Bank | 1 | BRI | 1 | 888801000157508 | Dummy |
| Nomor VA | 2 | MANDIRI | 2 | 8730700000000001 | Andohar Erwin Juniarta |
| E-Wallet | 3 | OVO | 164 | 8000000000 | DUMMY VA |
| E-Wallet | 3 | DANA | 165 | 81650000000 | DAVID BECKHAM DAVID BECKHAM DA |
| E-Wallet | 3 | GoPay | 167 | 81670000000 | ANDY SUHNO |

---

## Mengecek Status Penarikan

Periksa status transaksi penarikan. Endpoint publik ini memungkinkan Anda mengecek status penarikan berdasarkan ID transaksi.

**Endpoint:**  
`GET /api/v1/withdraw/status/{trxId}`

---

### Parameter Path

| Parameter | Tipe | Wajib | Deskripsi |
|------------|--------|----------|-----------------------------------------------|
| `trxId` | string | ✅ | ID transaksi permintaan penarikan. |

---

### Contoh Kode

<Tabs
  defaultValue="curl-status"
  values={[
    {label: 'cURL', value: 'curl-status'},
    {label: 'PHP / Laravel', value: 'php-status'},
    {label: 'Node.js', value: 'node-status'},
    {label: 'Python', value: 'python-status'},
  ]}
>

<TabItem value="curl-status">

```bash
curl -X GET "{{ $activeDomain }}/api/v1/withdraw/status/WTH-20250910-12345"
```

</TabItem>

<TabItem value="php-status">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '{{ $activeDomain }}/api/v1';
$trxId = 'WTH-20250910-12345';

$response = Http::timeout(60)->get("{$baseUrl}/withdraw/status/{$trxId}");

if ($response->successful()) {
    $result = $response->json();
    echo "Status: " . $result['status'];
    echo "Message: " . $result['message'];
} else {
    echo "Error: Transaction not found";
}
```

</TabItem>

<TabItem value="node-status">

```javascript
const axios = require('axios');

const baseUrl = '{{ $activeDomain }}/api/v1';
const trxId = 'WTH-20250910-12345';

axios.get(`${baseUrl}/withdraw/status/${trxId}`)
.then(response => {
    console.log('Status:', response.data.status);
    console.log('Message:', response.data.message);
    if (response.data.cancel_redirect) {
        console.log('Cancel URL:', response.data.cancel_redirect);
    }
    if (response.data.success_redirect) {
        console.log('Success URL:', response.data.success_redirect);
    }
})
.catch(error => {
    if (error.response) {
        console.error('Error:', error.response.data.message);
    } else {
        console.error('Error:', error.message);
    }
});
```

</TabItem>

<TabItem value="python-status">

```python
import requests

base_url = '{{ $activeDomain }}/api/v1'
trx_id = 'WTH-20250910-12345'

response = requests.get(f"{base_url}/withdraw/status/{trx_id}")

if response.status_code == 200:
    result = response.json()
    print(f"Status: {result['status']}")
    print(f"Message: {result['message']}")
    if result.get('cancel_redirect'):
        print(f"Cancel URL: {result['cancel_redirect']}")
    if result.get('success_redirect'):
        print(f"Success URL: {result['success_redirect']}")
else:
    print(f"Error: {response.json()['message']}")
```

</TabItem>

</Tabs>

---

### Respons Berhasil

**200 OK**

```json
{
    "status": "completed",
    "message": "Withdrawal request status checked successfully.",
    "cancel_redirect": "https://yoursite.com/cancel",
    "success_redirect": "https://yoursite.com/success"
}
```

---

### Respons Galat

**404 Not Found**

```json
{
    "status": "error",
    "message": "Withdrawal request not found."
}
```

---

> **ℹ️ Catatan:**  
> Endpoint ini bersifat publik dan tidak memerlukan autentikasi. Anda dapat menggunakannya untuk melakukan polling status transaksi.

---

### Nilai Status yang Mungkin

| Status | Deskripsi |
|-------------|---------------------------------------------|
| `pending` | Permintaan penarikan masih menunggu persetujuan. |
| `completed` | Penarikan berhasil diproses. |
| `canceled` | Permintaan penarikan dibatalkan. |
| `failed` | Permintaan penarikan gagal. |
| `rejected` | Permintaan penarikan ditolak. |
