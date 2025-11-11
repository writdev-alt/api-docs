---
id: withdraw-account-management-banks-wallets
slug: /withdraw-account-management/banks-wallets
title: Get Banks and Wallets Lists
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Retrieve available banks and e-wallets from the payment gateway. Use these lists to get valid bank or wallet codes when creating withdrawal accounts.

**GET** `/api/v1/withdraw-accounts/lists`

## Request Headers

| Header           | Value               | Required | Description                      |
|------------------|---------------------|----------|----------------------------------|
| `Accept`         | `application/json`  | ✅       | Specifies the response format.   |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅       | Your Merchant ID.                |
| `X-API-KEY`      | `{api_key}`         | ✅       | Your API Key.                    |

## Code Examples

<Tabs groupId="withdraw-lists-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X GET "https://api.example.com/api/v1/withdraw-accounts/lists" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: merchant_key" \
  -H "X-API-KEY: api_key"
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = 'https://api.example.com/api/v1';
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

const baseUrl = 'https://api.example.com/api/v1';
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

base_url = 'https://api.example.com/api/v1'
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

> **💡 Note**  
> - Use the `bank_id` from the banks array as the `bank_code` parameter when creating bank withdrawal accounts.  
> - Use the `wallet_id` from the wallets array as the `bank_code` parameter when creating e-wallet withdrawal accounts.

