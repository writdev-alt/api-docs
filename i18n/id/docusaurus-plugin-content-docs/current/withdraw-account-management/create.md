---
id: withdraw-account-management-create
slug: /withdraw-account-management/create
title: Buat Akun Penarikan
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Buat akun penarikan baru untuk pengguna yang terautentikasi. Akun bank akan diverifikasi dengan gateway pembayaran di lingkungan produksi.

**POST** `/api/v1/withdraw-accounts`

## Header Permintaan

| Header           | Value               | Wajib | Deskripsi                  |
|------------------|---------------------|-------|----------------------------|
| `Content-Type`   | `application/json`  | ✅    | Tipe konten permintaan.    |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅    | ID Merchant Anda.           |
| `X-API-KEY`      | `{api_key}`         | ✅    | API Key Anda.               |

## Body Permintaan

| Parameter             | Tipe    | Wajib | Deskripsi                                                         |
|-----------------------|---------|-------|-------------------------------------------------------------------|
| `method_id`           | integer | ✅    | ID metode penarikan dari endpoint methods.                        |
| `category`            | string  | ✅    | Kategori akun. Harus `Reconcile` atau `Customer`.                 |
| `account_number`      | string  | ✅    | Nomor rekening bank atau nomor e-wallet (maks 255 karakter).     |
| `account_holder_name` | string  | ✅    | Nama lengkap pemegang akun (maks 255 karakter).                  |
| `bank_code`           | string  | ✅    | Kode bank atau dompet dari endpoint lists (maks 255 karakter).   |
| `branch_name`         | string  | ❌    | Nama cabang bank (maks 255 karakter). Opsional untuk bank.      |
| `country`             | string  | ✅    | Kode negara (contoh: ID, US, SG) (maks 10 karakter).             |
| `account_type`        | string  | ❌    | Tipe akun (contoh: savings, checking) (maks 50 karakter).         |
| `additional_info`     | string  | ❌    | Informasi tambahan apa pun (maks 1000 karakter).                 |

## Contoh Kode

<Tabs groupId="withdraw-create-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X POST "/api/v1/withdraw-accounts" \
  -H "Content-Type: application/json" \
  -H "X-MERCHANT-KEY: merchant_key" \
  -H "X-API-KEY: api_key" \
  -d '{
    "method_id": 1,
    "category": "Customer",
    "account_number": "1234567890",
    "account_holder_name": "John Doe",
    "bank_code": "1",
    "branch_name": "Jakarta Pusat",
    "country": "ID",
    "account_type": "savings",
    "additional_info": "Primary account"
  }'
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v1';
$merchantKey = 'merchant_key';
$apiKey = 'api_key';
$accountData = [
    'method_id' => 1,
    'category' => 'Customer',
    'account_number' => '1234567890',
    'account_holder_name' => 'John Doe',
    'bank_code' => '1',
    'branch_name' => 'Jakarta Pusat',
    'country' => 'ID',
    'account_type' => 'savings',
    'additional_info' => 'Primary account',
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->post("{$baseUrl}/withdraw-accounts", $accountData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const accountData = {
  method_id: 1,
  category: 'Customer',
  account_number: '1234567890',
  account_holder_name: 'John Doe',
  bank_code: '1',
  branch_name: 'Jakarta Pusat',
  country: 'ID',
  account_type: 'savings',
  additional_info: 'Primary account',
};

axios
  .post(`${baseUrl}/withdraw-accounts`, accountData, {
    headers: {
      'Content-Type': 'application/json',
      'X-MERCHANT-KEY': merchantKey,
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

base_url = '/api/v1'
merchant_key = 'merchant_key'
api_key = 'api_key'
account_data = {
    'method_id': 1,
    'category': 'Customer',
    'account_number': '1234567890',
    'account_holder_name': 'John Doe',
    'bank_code': '1',
    'branch_name': 'Jakarta Pusat',
    'country': 'ID',
    'account_type': 'savings',
    'additional_info': 'Primary account',
}

headers = {
    'Content-Type': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.post(f"{base_url}/withdraw-accounts", headers=headers, json=account_data)

if response.status_code == 201:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Responses

<Tabs groupId="withdraw-create-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
    { label: 'Validation Error', value: 'validation' },
]}>

<TabItem value="success">

```json
{
  "data": {
    "id": 1,
    "user_id": 123,
    "withdraw_method_id": 1,
    "name": "Bank Transfer",
    "category": "Customer",
    "account_number": "1234567890",
    "account_holder_name": "John Doe",
    "bank_code": "1",
    "bank_name": "BANK RAKYAT INDONESIA",
    "branch_name": "Jakarta Pusat",
    "country": "ID",
    "account_type": "savings",
    "additional_info": "Primary account",
    "created_at": "2025-01-15T10:30:00.000000Z",
    "updated_at": "2025-01-15T10:30:00.000000Z",
    "withdraw_method": {
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
  "message": "Validation failed",
  "errors": {
    "bank_code": [
      "Invalid bank account"
    ]
  }
}
```

</TabItem>

</Tabs>

> **⚠️ Penting**  
> - Di produksi, akun bank diverifikasi dengan gateway pembayaran sebelum dibuat.  
> - Gunakan `bank_code` yang valid dari endpoint [Dapatkan Daftar Bank dan Dompet](./banks-wallets).  
> - Untuk akun e-wallet, setel `category` ke `ewallet`.

