---
id: withdraw-account-management-methods
slug: /withdraw-account-management/methods
title: Get Withdrawal Methods
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Retrieve all active withdrawal methods available for creating withdrawal accounts.

**GET** `/api/v1/withdraw-accounts/methods`

## Request Headers

| Header           | Value               | Required | Description                      |
|------------------|---------------------|----------|----------------------------------|
| `Accept`         | `application/json`  | ✅       | Specifies the response format.   |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅       | Your Merchant ID.                |
| `X-API-KEY`      | `{api_key}`         | ✅       | Your API Key.                    |

## Code Examples

<Tabs groupId="withdraw-methods-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X GET "/api/v1/withdraw-accounts/methods" \
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
])->get("{$baseUrl}/withdraw-accounts/methods");

$methods = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';

axios
  .get(`${baseUrl}/withdraw-accounts/methods`, {
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

response = requests.get(f"{base_url}/withdraw-accounts/methods", headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Responses

<Tabs groupId="withdraw-methods-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
]}>

<TabItem value="success">

```json
{
  "success": true,
  "code": "2000301",
  "message": "Withdrawal methods retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Bank Transfer",
      "logo": "/storage/logos/bank-transfer.png",
      "type": "auto",
      "method_code": "bank_transfer",
      "currency": "IDR",
      "currency_symbol": "Rp",
      "min_withdraw": 10000,
      "max_withdraw": 100000000,
      "charge": 2500,
      "charge_type": "fixed",
      "conversion_rate": "1.00",
      "processing_time": "1-3 business days",
      "status": true
    },
    {
      "id": 2,
      "name": "Virtual Account",
      "logo": "/storage/logos/virtual-account.png",
      "type": "auto",
      "method_code": "virtual_account",
      "currency": "IDR",
      "currency_symbol": "Rp",
      "min_withdraw": 10000,
      "max_withdraw": 100000000,
      "charge": 2500,
      "charge_type": "fixed",
      "conversion_rate": "1.00",
      "processing_time": "1-3 business days",
      "status": true
    },
    {
      "id": 3,
      "name": "E-Wallet",
      "logo": "/storage/logos/ewallet.png",
      "type": "auto",
      "method_code": "ewallet",
      "currency": "IDR",
      "currency_symbol": "Rp",
      "min_withdraw": 10000,
      "max_withdraw": 50000000,
      "charge": 1,
      "charge_type": "percent",
      "conversion_rate": "1.00",
      "processing_time": "Instant",
      "status": true
    }
  ]
}
```

</TabItem>

</Tabs>


