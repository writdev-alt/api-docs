---
id: withdraw-account-management-banks-wallets
slug: /withdraw-account-management/banks-wallets
title: Dapatkan Daftar Bank dan Dompet
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ambil bank dan e-wallet yang tersedia dari gateway pembayaran. Gunakan daftar ini untuk mendapatkan kode bank atau dompet yang valid saat membuat akun penarikan.

**GET** `/api/v1/withdraw-accounts/lists`

## Header Permintaan

| Header           | Value               | Wajib | Deskripsi                      |
|------------------|---------------------|-------|--------------------------------|
| `Accept`         | `application/json`  | ✅    | Menentukan format respons.     |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅    | ID Merchant Anda.              |
| `X-API-KEY`      | `{api_key}`         | ✅    | API Key Anda.                  |

## Contoh Kode

<Tabs groupId="withdraw-lists-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X GET "/api/v1/withdraw-accounts/lists" \
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
])->get("{$baseUrl}/withdraw-accounts/lists");

$lists = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';

axios
  .get(`${baseUrl}/withdraw-accounts/lists`, {
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

response = requests.get(f"{base_url}/withdraw-accounts/lists", headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Responses

<Tabs groupId="withdraw-lists-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
]}>

<TabItem value="success">

```json
{
  "data": {
    "banks": [
      {
        "bank_id": "1",
        "bank_name": "BANK RAKYAT INDONESIA"
      },
      {
        "bank_id": "2",
        "bank_name": "BANK MANDIRI"
      },
      {
        "bank_id": "6",
        "bank_name": "BANK Central Asia"
      }
    ],
    "wallets": [
      {
        "wallet_id": "164",
        "wallet_name": "OVO"
      },
      {
        "wallet_id": "165",
        "wallet_name": "DANA"
      },
      {
        "wallet_id": "167",
        "wallet_name": "GoPay"
      }
    ]
  }
}
```

</TabItem>

<TabItem value="error">

```json
{
  "message": "Error retrieving bank and wallet lists"
}
```

</TabItem>

</Tabs>

> **💡 Catatan**  
> - Gunakan `bank_id` dari array banks sebagai parameter `bank_code` saat membuat akun penarikan bank.  
> - Gunakan `wallet_id` dari array wallets sebagai parameter `bank_code` saat membuat akun penarikan e-wallet.

