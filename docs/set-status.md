---
id: set-status
title: Payment Status Management
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Payment Status Management

> ⚠️ **Sandbox Only**  
> This feature is only available in sandbox/testing environments for development and testing purposes.

**Access the payment status management interface** via your merchant dashboard navigation: go to **Payment → Set Status**.

![Payment Status Management](/img/set-status-payment.png)

### Available Payment Status

| Status Code | Status Description                                  |
|-------------|-----------------------------------------------------|
| `pending`   | Transaction awaiting payment confirmation |
| `completed` | Payment process successfully finalized   |
| `failed`    | Payment process terminated due to error  |
| `cancelled` | Payment process cancelled by user action |
| `expired`   | Payment session exceeded time limit      |



---

## Check Transaction Status API

Use this endpoint to retrieve the current status of a transaction. This API allows you to query transaction details and status in real-time.

**Endpoint:**  
`GET /api/v1/check-status/{trxId}`

### Request Headers

| Header            | Value                | Required | Description                         |
|-------------------|---------------------|:--------:|-------------------------------------|
| `Accept`          | `application/json`   | ✅       | Specifies the response format. |
| `X-MERCHANT-KEY`  | `{merchant_key}`     | ✅       | Your Merchant ID.        |
| `X-API-KEY`       | `{api_key}`          | ✅       | Your API Key.            |

### Path Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|:--------:|------------------------------------|
| `trxId`   | string | ✅       | Unique transaction identifier |

### Code Examples

<Tabs groupId="status-language" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X GET "https://api.example.com/api/v1/check-status/TRX123456789" \
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
$trxId = 'TRX123456789';

$response = Http::timeout(60)->withHeaders([
    'Accept' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->get("{$baseUrl}/check-status/{$trxId}");

if ($response->successful()) {
    $result = $response->json();
    echo "Status: " . $result['status'] . PHP_EOL;
    echo "Message: " . $result['message'] . PHP_EOL;
} else {
    $error = $response->json();
    echo "Error: " . $error['message'];
}
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = 'https://api.example.com/api/v1';
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
    console.log('Message:', response.data.message);
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

base_url = 'https://api.example.com/api/v1'
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
    print(f"Message: {result['message']}")
else:
    error = response.json()
    print(f"Error: {error['message']}")
```

</TabItem>

</Tabs>

---

<Tabs groupId="status-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
    { label: '404 Not Found', value: 'not-found' },
    { label: '500 Internal Server Error', value: 'server-error' },
]}>

<TabItem value="success">

```json
{
    "status": "completed",
    "message": "Payment, request status checked successfully."
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

> ℹ️ **Note:** The status message will include the transaction type (e.g., "Payment, request status checked successfully" or "Withdrawal, request status checked successfully").


