---
id: withdraw
slug: /withdraw
title: Buat Withdrawal
description: Buat transaksi payout dari saldo merchant ke tujuan bank, virtual account, atau e-wallet.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Buat Withdrawal

Buat transaksi withdrawal dari saldo merchant ke akun tujuan.
Endpoint ini ditujukan untuk penggunaan server-to-server pada alur payout.

**Endpoint:**  
`POST /api/v2/withdraw`

## Ringkasan

Gunakan endpoint ini ketika sistem Anda perlu mendisburse dana ke rekening bank, tujuan virtual account, atau tujuan e-wallet berdasarkan metode pembayaran yang dipilih.

Alur umum:

1. Validasi penerima dan jumlah di aplikasi Anda.
2. Kirim request withdrawal dengan `trxReference` yang unik.
3. Simpan `trxId` yang dikembalikan untuk rekonsiliasi dan pelacakan status.
4. Lakukan polling atau subscribe pembaruan status melalui proses monitoring transaksi Anda.

## Detail Endpoint

| Item | Value |
|------|-------|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/withdraw` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Idempotency Hint | Referensi aman untuk reuse melalui `trxReference` yang unik |

## Request

### Request Headers

| Header              | Value                | Required | Description             |
|---------------------|---------------------|----------|-------------------------|
| `Content-Type`      | `application/json`  | ✅       | Format payload request |
| `Accept`            | `application/json`  | ✅       | Format respons yang diharapkan |
| `Authorization`     | `Bearer {token}`    | ✅       | Bearer access token |
| `X-API-KEY`         | `{apiKey}`          | ✅       | Kredensial API key |

### Request Body

| Parameter             | Type   | Required | Description                                                                                    |
|-----------------------|--------|----------|------------------------------------------------------------------------------------------------|
| `trxReference`             | string | ✅       | Referensi unik di sisi merchant untuk idempotensi dan tracking |
| `bankCode`             | string | ✅       | Identifier/kode bank (lihat [Banks List](./banks/list-v2)) |
| `accountHolderName` | string | ✅       | Nama lengkap penerima |
| `accountNumber`      | string | ✅       | Nomor akun tujuan |
| `amount`              | number | ✅       | Jumlah withdrawal (mis. `4000000`) |
| `paymentMethod`      | string | ✅       | Kode metode: `EWALLET`, `VIRTUAL_ACCOUNT`, `BANK_TRANSFER`  |
| `description`         | string | ❌       | Opsional deskripsi transaksi/catatan referensi |
| `walletReference`     | string | ❌       | Opsional identifier referensi wallet/e-wallet |

### Validation Rules (Recommended)

| Field | Rule |
|------|------|
| `trxReference` | Required, unique per merchant transaction |
| `bankCode` | Required, must exist in [Banks List](./banks/list-v2) |
| `accountHolderName` | Required, non-empty, normalized text |
| `accountNumber` | Required, numeric/alphanumeric as per channel rule |
| `amount` | Required, numeric , greater than zero |
| `paymentMethod` | Required, allowed values: `EWALLET`, `VIRTUAL_ACCOUNT`, `BANK_TRANSFER` |
| `description` | Optional, if provided should be non-empty and within max length policy |
| `walletReference` | Optional, include when reconciliation with wallet reference is needed |

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
curl -X POST "/api/v2/withdraw" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -H "X-API-KEY: {apiKey}" \
  -d '{
    "trxReference": "12323",
    "bankCode": "2",
    "accountHolderName": "RAIDY WIJAYA",
    "accountNumber": "1040000008446",
    "amount": "4000000",
    "paymentMethod": "BANK_TRANSFER",
    "description": "domestic transfer bni 0315747263 009 v2",
    "walletReference": "WALLET-REF-001"
  }'
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v2';
$token = 'yourBearerToken';
$apiKey = 'apiKey';
$withdrawalData = [
    'trxReference' => '12323',
    'bankCode' => '2',
    'accountHolderName' => 'RAIDY WIJAYA',
    'accountNumber' => '1040000008446',
    'amount' => 4000000,
    'paymentMethod' => 'BANK_TRANSFER',
    'description' => 'domestic transfer bni 0315747263 009 v2',
    'walletReference' => 'WALLET-REF-001', // Optional
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'Authorization' => "Bearer {$token}",
    'X-API-KEY' => $apiKey,
])->post("{$baseUrl}/withdraw", $withdrawalData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v2';
const token = 'yourBearerToken';
const apiKey = 'apiKey';
const withdrawalData = {
    trxReference: '12323',
    bankCode: '2',
    accountHolderName: 'RAIDY WIJAYA',
    accountNumber: '1040000008446',
    amount: 4000000,
    paymentMethod: 'BANK_TRANSFER',
    description: 'domestic transfer bni 0315747263 009 v2',
    walletReference: 'WALLET-REF-001', // Optional
};

axios.post(`${baseUrl}/withdraw`, withdrawalData, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

baseUrl = '/api/v2'
token = 'yourBearerToken'
apiKey = 'apiKey'
withdrawalData = {
    'trxReference': '12323',
    'bankCode': '2',
    'accountHolderName': 'RAIDY WIJAYA',
    'accountNumber': '1040000008446',
    'amount': 4000000,
    'paymentMethod': 'BANK_TRANSFER',
    'description': 'domestic transfer bni 0315747263 009 v2',
    'walletReference': 'WALLET-REF-001',  # Optional
}

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {token}',
    'X-API-KEY': apiKey,
}

response = requests.post(f"{baseUrl}/withdraw", headers=headers, json=withdrawalData)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Response

### Responses

<Tabs
  defaultValue="success"
  values={[
    {label: 'Success — 201 Created', value: 'success'},
    {label: 'Validation Error — 422', value: 'validation'},
    {label: 'Not Found — 404', value: 'notFound'},
  ]}
>

<TabItem value="success">

```json
{
    "code": 2000005,
    "message": "success",
    "data": {
        "trxId": "TRXWITH3UW664W52Y5DF9BDKE",
        "trxReference": "a91d385c-b11f-4ac4-b1d2-0f6e04d66e35",
        "trxType": "withdraw",
        "provider": "PAYLABS",
        "walletReference": "798055915",
        "amount": 10000,
        "netAmount": 10000,
        "fee": 0,
        "feeType": "SELLER",
        "currency": "IDR",
        "paymentChannel": "EWALLET",
        "status": "completed",
        "bankCode": "165",
        "accountNumber": "628123456789",
        "accountHolderName": "Tria",
        "processedAt": "2026-05-05T02:54:24.225194456Z"
    }
}
```

</TabItem>

<TabItem value="validation">

```json
{
  "code": 4220601,
  "message": "Validation failed",
  "errors": {
    "accountNumber": [
      "The account number field is required."
    ],
    "amount": [
      "The amount must be greater than zero."
    ]
  }
}
```

</TabItem>

<TabItem value="notFound">

```json
{
  "code": 4040003,
  "message": "Bank not found"
}
```

</TabItem>

</Tabs>

### Field Respons

| Field | Type | Description |
|------|------|-------------|
| `code` | number | Kode respons layanan |
| `message` | string | Pesan status yang mudah dibaca |
| `data` | object | Ada pada sukses; payload transaksi withdrawal |
| `data.trxId` | string | Identifier transaksi withdrawal yang dibuat sistem |
| `data.trxReference` | string | Referensi merchant yang dikirim pada request |
| `data.trxType` | string | Tipe transaksi (misalnya `withdraw`) |
| `data.provider` | string | Partner/rail pemrosesan |
| `data.walletReference` | string | Referensi wallet jika berlaku (bisa tidak ada untuk beberapa channel) |
| `data.amount` | number | Jumlah withdrawal |
| `data.netAmount` | number | Jumlah bersih setelah fee |
| `data.fee` | number | Fee withdrawal yang diterapkan |
| `data.feeType` | string | Kebijakan pembebanan biaya (misalnya `SELLER` atau `CUSTOMER`) |
| `data.currency` | string | Kode mata uang (misalnya `IDR`) |
| `data.paymentChannel` | string | Channel payout (misalnya `EWALLET`, `BANK_TRANSFER`, `VIRTUAL_ACCOUNT`) |
| `data.status` | string | Status proses (misalnya `pending` atau `completed`) |
| `data.bankCode` | string | Kode bank/institusi tujuan jika berlaku |
| `data.accountNumber` | string | Nomor akun/wallet tujuan jika berlaku |
| `data.accountHolderName` | string | Nama penerima jika berlaku |
| `data.processedAt` | string | Timestamp saat payout mencapai status processed (ISO 8601), jika dikembalikan |
| `errors` | object | Ada pada kegagalan validasi; nama field memetakan array pesan error |

## Payment Method Codes

| Payment Method | Code | Description                    |
|----------------|------|--------------------------------|
| Bank Transfer      | `BANK_TRANSFER`  | Transfer rekening/kartu bank     |
| VA Number      | `VIRTUAL_ACCOUNT`  | Nomor Virtual Account         |
| E-Wallet       | `EWALLET`  | Transfer E-Wallet              |

## Withdrawal status lifecycle

Setelah create berhasil, withdrawal biasanya berstatus `pending`, lalu berpindah melalui satu atau lebih status pemrosesan saat gateway/bank memproses payout. Transaksi berakhir pada **`completed`** saat dana berhasil keluar dari platform, atau **`failed`** ketika proses terhenti; pada kasus gagal, jumlah biasanya direkonsiliasi kembali dan transaksi bisa tampil sebagai **`refunded`**.

![Siklus status withdrawal: pending melalui pemrosesan ke completed, atau failed lalu refunded](/img/withdraw.svg)

### Available withdraw Status

| Status Code               | Category      | Status Description                      |
|---------------------------|---------------|----------------------------------------------------------|
| `pending`                 | `withdraw`    | Transaksi menunggu konfirmasi pembayaran                |
| `awaiting_fi_process`     |  `withdraw`    | Menunggu pemrosesan oleh institusi keuangan         |
| `awaiting_pg_process`     |  `withdraw`    | Masuk antrean di payment gateway untuk proses lanjutan     |
| `awaiting_user_action`    |  `withdraw`    | Merchant/customer harus melakukan aksi untuk melanjutkan      |
| `awaiting_admin_approval` |  `withdraw`    | Menunggu persetujuan manual dari administrator        |
| `completed`               | `withdraw`    | Proses pembayaran selesai dengan sukses                   |
| `failed`                  | `withdraw`    | Proses pembayaran berakhir karena error                  |
| `refunded`                |  `withdraw`    | Dana dikembalikan ke pembayar setelah selesai             |
| `expired`                 | `withdraw`    | Sesi pembayaran melewati batas waktu dan tidak dapat dilanjutkan   |

## Catatan Keamanan dan Keandalan

- Buat `trxReference` yang benar-benar unik untuk mencegah pengajuan payout duplikat.
- Validasi akun tujuan dan jumlah di server Anda sebelum mengirim request.
- Simpan API key pada penyimpanan secret server-side yang aman; jangan pernah mengeksposnya ke client frontend.
- Gunakan HTTPS untuk semua environment non-lokal.
- Terapkan kebijakan retry hanya untuk kegagalan yang aman/transien, dan jangan pernah retry secara buta untuk penolakan bisnis.

## Catatan Operasional

- Gunakan `trxReference` dan `trxId` yang dikembalikan bersama untuk rekonsiliasi.
- Utamakan pelacakan status asinkron untuk konfirmasi status payout final.
- Mapping nilai `code` menggunakan referensi Response Code v2 untuk perilaku client yang deterministik.
