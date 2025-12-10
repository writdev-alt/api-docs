---
id: withdraw-account-management-list
slug: /withdraw-account-management/list
title: Daftar Akun Penarikan
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ambil semua akun penarikan untuk pengguna yang terautentikasi. Opsional filter berdasarkan mata uang dompet.

**GET** `/api/v1/withdraw-accounts`

## Header Permintaan

| Header           | Value               | Wajib | Deskripsi                      |
|------------------|---------------------|-------|--------------------------------|
| `Accept`         | `application/json`  | ✅    | Menentukan format respons.     |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅    | ID Merchant Anda.               |
| `X-API-KEY`      | `{api_key}`         | ✅    | API Key Anda.                   |

## Parameter Query

| Parameter   | Tipe    | Wajib | Deskripsi                                                                 |
|-------------|---------|-------|---------------------------------------------------------------------------|
| `wallet_id` | integer | ❌    | Filter akun berdasarkan mata uang dompet. Hanya mengembalikan akun yang sesuai dengan mata uang dompet. |

## Contoh Kode

<Tabs groupId="withdraw-accounts-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X GET "/api/v1/withdraw-accounts?wallet_id=2" \
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

$response = Http::timeout(60)->withHeaders([
    'Accept' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->get("{$baseUrl}/withdraw-accounts", [
    'wallet_id' => 2,
]);

$accounts = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';

axios
  .get(`${baseUrl}/withdraw-accounts`, {
    params: { wallet_id: 2 },
    headers: {
      Accept: 'application/json',
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

headers = {
    'Accept': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

params = {'wallet_id': 2}

response = requests.get(f"{base_url}/withdraw-accounts", headers=headers, params=params)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Responses

<Tabs groupId="withdraw-accounts-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
]}>

<TabItem value="success">

```json
{
  "data": [
    {
      "id": 1,
      "user_id": 123,
      "withdraw_method_id": 1,
      "name": "Bank Transfer",
      "category": "bank",
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
  ]
}
```

</TabItem>

</Tabs>

