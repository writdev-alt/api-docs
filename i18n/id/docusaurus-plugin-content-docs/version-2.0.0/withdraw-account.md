---
id: withdraw-account-v2
slug: /withdraw-account
title: Buat Akun Withdrawal
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Buat akun withdrawal baru untuk pengguna yang terautentikasi. Rekening bank akan diverifikasi dengan payment gateway pada environment production.

**Endpoint:**  
`POST /api/v2/withdraw-accounts`

## Ringkasan

Gunakan endpoint ini untuk mendaftarkan akun tujuan yang dapat dipakai pada alur payout.

Alur umum:
1. Pilih `type` dan `category`.
2. Kirim detail akun tujuan dan `bankCode`.
3. Simpan `id` akun yang dikembalikan untuk request withdrawal berikutnya.

## Detail Endpoint

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/withdraw-accounts` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |

## Request

### Request Headers

| Header           | Value               | Required | Description             |
|------------------|---------------------|----------|-------------------------|
| `Content-Type` | `application/json` | ✅ | Format payload request. |
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan. |
| `X-API-KEY` | `{apiKey}` | ✅ | Kredensial API key. |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token. |

### Request Body

| Parameter             | Type    | Required | Description                                                         |
|-----------------------|---------|----------|---------------------------------------------------------------------|
| `type`           | string | ✅       | Metode withdrawal: `BANK_TRANSFER`, `VIRTUAL_ACCOUNT`, `E_WALLET`.                     |
| `category`            | string  | ✅       | Kategori akun. Harus `Reconcile` atau `Customer`.         |
| `accountNumber`      | string  | ✅       | Nomor rekening bank atau nomor e-wallet (maks 255 karakter).        |
| `accountHolderName` | string  | ✅       | Nama lengkap pemilik akun (maks 255 karakter).                    |
| `bankCode`           | string  | ✅       | Kode bank atau wallet dari endpoint list (maks 255 karakter).   |

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `type` | Required, allowed values: `BANK_TRANSFER`, `VIRTUAL_ACCOUNT`, `E_WALLET` |
| `category` | Required, allowed values: `Reconcile`, `Customer` |
| `accountNumber` | Required, non-empty string |
| `accountHolderName` | Required, non-empty string |
| `bankCode` | Required, valid code from [Banks List](./banks/list-v2) |

### Contoh Kode

<Tabs groupId="withdraw-create-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X POST "/api/v2/withdraw-accounts" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}" \
  -H "X-API-KEY: apiKey" \
  -d '{
    "type": "BANK_TRANSFER",
    "category": "Customer",
    "accountNumber": "1234567890",
    "accountHolderName": "John Doe",
    "bankCode": "1"
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
$accountData = [
    'type' => 'BANK_TRANSFER',
    'category' => 'Customer',
    'accountNumber' => '1234567890',
    'accountHolderName' => 'John Doe',
    'bankCode' => '1',
    'branchName' => 'Jakarta Pusat',
    'country' => 'ID',
    'accountType' => 'savings',
    'additionalInfo' => 'Primary account',
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => "Bearer {$token}",
    'X-API-KEY' => $apiKey,
])->post("{$baseUrl}/withdraw-accounts", $accountData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v2';
const token = 'yourBearerToken';
const apiKey = 'apiKey';
const accountData = {
  type: 'BANK_TRANSFER',
  category: 'Customer',
  accountNumber: '1234567890',
  accountHolderName: 'John Doe',
  bankCode: '1',
  branchName: 'Jakarta Pusat',
  country: 'ID',
  accountType: 'savings',
  additionalInfo: 'Primary account',
};

axios
  .post(`${baseUrl}/withdraw-accounts`, accountData, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-API-KEY': apiKey,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response?.data || error.message);
  });
```

</TabItem>

<TabItem value="python">

```python
import requests

baseUrl = '/api/v2'
token = 'yourBearerToken'
apiKey = 'apiKey'
accountData = {
    'type': 'BANK_TRANSFER',
    'category': 'Customer',
    'accountNumber': '1234567890',
    'accountHolderName': 'John Doe',
    'bankCode': '1',
    'branchName': 'Jakarta Pusat',
    'country': 'ID',
    'accountType': 'savings',
    'additionalInfo': 'Primary account',
}

headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': f'Bearer {token}',
    'X-API-KEY': apiKey,
}

response = requests.post(f"{baseUrl}/withdraw-accounts", headers=headers, json=accountData)

if response.status_code == 201:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Response

### Responses

<Tabs groupId="withdraw-create-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
    { label: 'Validation Error', value: 'validation' },
]}>

<TabItem value="success">

```json
{
  "success": true,
  "code": "2010301",
  "message": "Withdrawal account has been created.",
  "data": {
    "id": 1,
    "userId": 123,
    "withdrawMethodId": 1,
    "name": "Bank Transfer",
    "category": "Customer",
    "accountNumber": "1234567890",
    "accountHolderName": "John Doe",
    "bankCode": "1",
    "bankName": "BANK RAKYAT INDONESIA",
    "branchName": "Jakarta Pusat",
    "country": "ID",
    "accountType": "savings",
    "additionalInfo": "Primary account",
    "createdAt": "2025-01-15T10:30:00.000000Z",
    "updatedAt": "2025-01-15T10:30:00.000000Z",
    "withdrawMethod": {
      "id": 1,
      "name": "Bank Transfer",
      "currency": "IDR"
    }
  }
}
```

</TabItem>

<TabItem value="validation">

```json
{
  "success": false,
  "code": "4220601",
  "message": "Validation failed",
  "errors": {
    "bankCode": [
      "Invalid bank account"
    ]
  }
}
```

</TabItem>

</Tabs>

### Field Respons

| Field | Type | Description |
|---|---|---|
| `success` | boolean | Penanda hasil operasi |
| `code` | string | Kode respons layanan |
| `message` | string | Pesan respons yang mudah dibaca |
| `data.id` | number | Identifier akun withdrawal |
| `data.withdrawMethodId` | number | ID metode withdrawal internal |
| `data.category` | string | Kategori akun (`Customer` atau `Reconcile`) |
| `data.accountNumber` | string | Nomor akun tujuan |
| `data.accountHolderName` | string | Nama pemilik akun tujuan |
| `data.bankCode` | string | Kode bank atau wallet |
| `data.bankName` | string | Nama bank hasil resolusi |
| `data.createdAt` | string | Timestamp pembuatan (ISO 8601) |
| `data.updatedAt` | string | Timestamp pembaruan terakhir (ISO 8601) |

## Catatan Keamanan dan Keandalan

- Di production, kepemilikan/validitas rekening bank diverifikasi oleh payment gateway sebelum pembuatan.
- Selalu resolve `bankCode` dari [Banks List](./banks/list-v2) sebelum mengirim request.
- Simpan API key dan bearer token pada penyimpanan server-side yang aman.
