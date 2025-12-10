---
id: withdraw-account-management-update
slug: /withdraw-account-management/update
title: Perbarui Akun Penarikan
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Perbarui akun penarikan yang ada. Akun bank akan diverifikasi ulang dengan gateway pembayaran di lingkungan produksi.

**PUT** `/api/v1/withdraw-accounts/{id}`

## Path Parameters

| Parameter | Tipe    | Wajib | Deskripsi                              |
|-----------|---------|-------|----------------------------------------|
| `id`      | integer | ✅    | ID akun penarikan yang akan diperbarui. |

## Header Permintaan

| Header           | Value               | Wajib | Deskripsi                  |
|------------------|---------------------|-------|----------------------------|
| `Content-Type`   | `application/json`  | ✅    | Tipe konten permintaan.    |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅    | ID Merchant Anda.           |
| `X-API-KEY`      | `{api_key}`         | ✅    | API Key Anda.               |

## Body Permintaan

Parameter yang sama seperti yang dijelaskan di [Buat Akun Penarikan](./create).

## Contoh Kode

<Tabs groupId="withdraw-update-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X PUT "/api/v1/withdraw-accounts/1" \
  -H "Content-Type: application/json" \
  -H "X-MERCHANT-KEY: merchant_key" \
  -H "X-API-KEY: api_key" \
  -d '{
    "method_id": 1,
    "category": "Customer",
    "account_number": "9876543210",
    "account_holder_name": "John Doe Updated",
    "bank_code": "2",
    "branch_name": "Jakarta Selatan",
    "country": "ID",
    "account_type": "checking",
    "additional_info": "Updated account"
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
$accountId = 1;
$accountData = [
    'method_id' => 1,
    'category' => 'Customer',
    'account_number' => '9876543210',
    'account_holder_name' => 'John Doe Updated',
    'bank_code' => '2',
    'branch_name' => 'Jakarta Selatan',
    'country' => 'ID',
    'account_type' => 'checking',
    'additional_info' => 'Updated account',
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->put("{$baseUrl}/withdraw-accounts/{$accountId}", $accountData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const accountId = 1;
const accountData = {
  method_id: 1,
  category: 'Customer',
  account_number: '9876543210',
  account_holder_name: 'John Doe Updated',
  bank_code: '2',
  branch_name: 'Jakarta Selatan',
  country: 'ID',
  account_type: 'checking',
  additional_info: 'Updated account',
};

axios
  .put(`${baseUrl}/withdraw-accounts/${accountId}`, accountData, {
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
account_id = 1
account_data = {
    'method_id': 1,
    'category': 'Customer',
    'account_number': '9876543210',
    'account_holder_name': 'John Doe Updated',
    'bank_code': '2',
    'branch_name': 'Jakarta Selatan',
    'country': 'ID',
    'account_type': 'checking',
    'additional_info': 'Updated account',
}

headers = {
    'Content-Type': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.put(f"{base_url}/withdraw-accounts/{account_id}", headers=headers, json=account_data)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Responses

<Tabs groupId="withdraw-update-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
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
    "account_number": "9876543210",
    "account_holder_name": "John Doe Updated",
    "bank_code": "2",
    "bank_name": "BANK MANDIRI",
    "branch_name": "Jakarta Selatan",
    "country": "ID",
    "account_type": "checking",
    "additional_info": "Updated account",
    "created_at": "2025-01-15T10:30:00.000000Z",
    "updated_at": "2025-01-15T11:45:00.000000Z",
    "withdraw_method": {
      "id": 1,
      "name": "Bank Transfer",
      "currency": "IDR"
    }
  }
}
```

</TabItem>

</Tabs>

