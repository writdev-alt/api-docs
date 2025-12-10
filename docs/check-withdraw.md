---
id: check-withdraw
title: Check Withdrawal Status
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Check Withdrawal Status

Check the status of a withdrawal transaction by its transaction ID.

**Endpoint:**  
`GET /api/v1.1/check-withdraw/{trxID}`

---

### Path Parameters

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| `trxID`   | string | ✅       | The withdrawal transaction ID.       |

---

### Request Headers

| Header              | Value                | Required | Description             |
|---------------------|---------------------|----------|-------------------------|
| `Accept`            | `application/json`  | ✅       | Response content type.  |
| `X-MERCHANT-KEY`    | `{merchant_key}`    | ✅       | Your Merchant ID.       |
| `X-API-KEY`         | `{api_key}`         | ✅       | Your API Key.          |

---

### Code Examples

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
curl -X GET "/api/v1/check-withdraw/WTH-20250910-12345" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: {merchant_key}" \
  -H "X-API-KEY: {api_key}"
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v1';
$merchantKey = 'merchant_key';
$apiKey = 'api_key';
$trxID = 'WTH-20250910-12345';

$response = Http::timeout(60)->withHeaders([
    'Accept' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->get("{$baseUrl}/check-withdraw/{$trxID}");

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const trxID = 'WTH-20250910-12345';

axios.get(`${baseUrl}/check-withdraw/${trxID}`, {
    headers: {
        'Accept': 'application/json',
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

base_url = '/api/v1'
merchant_key = 'merchant_key'
api_key = 'api_key'
trx_id = 'WTH-20250910-12345'

headers = {
    'Accept': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.get(f"{base_url}/check-withdraw/{trx_id}", headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

---

### Responses

<Tabs
  defaultValue="success"
  values={[
    {label: 'Success — 200 OK', value: 'success'},
    {label: 'Not Found — 404', value: 'not_found'},
  ]}
>

<TabItem value="success">

```json
{
    "success": true,
    "code": "2000301",
    "message": "Withdrawal status retrieved successfully",
    "data": {
        "trx_id": "TRX-20250910-12345",
        "trx_reference": "TRXREF1234567890",
        "status": "completed",
        "amount": 10000,
        "account": {
            "account_number": "1234567890",
            "account_holder_name": "John Doe",
            "bank_code": "1",
            "bank_name": "BANK RAKYAT INDONESIA",
            "branch_name": "Jakarta Pusat",
            "country": "ID",
            "account_type": "savings"
        },
        "wallet": {
            "id": "1234567890",
            "currency": "IDR"
        },
        "created_at": "2025-01-15T10:30:00.000000Z",
        "updated_at": "2025-01-15T11:45:00.000000Z",
    }
}
```

</TabItem>

<TabItem value="not_found">

```json
{
    "success": false,
    "code": "4040003",
    "message": "Withdrawal transaction not found"
}
```

</TabItem>

</Tabs>

---

### Withdrawal Statuses

| Status                 | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `awaiting_fi_process`  | Withdrawal has been created and is waiting for the financial institution.   |
| `awaiting_pg_process`  | Withdrawal is queued at the payment gateway and will be processed shortly.  |
| `completed`            | Funds have been disbursed successfully.                                     |
| `failed`               | Withdrawal failed and funds remain in the wallet.                           |
| `refunded`             | Withdrawal was reversed and funds were returned to the wallet.              |
| `expired`              | Withdrawal expired before it could be completed.                            |

---

> **💡 Note**
>
> - Use this endpoint to check the current status of a withdrawal transaction
> - The transaction ID is returned when you create a withdrawal request
> - This endpoint can be polled periodically to track withdrawal progress

