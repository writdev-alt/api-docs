---
id: withdraw
title: Create Withdrawal
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Create Withdrawal

Create a new withdrawal request with direct bank account details.

**Endpoint:**  
`POST /api/v1.1/withdraw`

---

### Request Headers

| Header              | Value                | Required | Description             |
|---------------------|---------------------|----------|-------------------------|
| `Content-Type`      | `application/json`  | ✅       | Request content type.   |
| `X-MERCHANT-KEY`    | `{merchant_key}`    | ✅       | Your Merchant ID.       |
| `X-API-KEY`         | `{api_key}`         | ✅       | Your API Key.           |

---

### Request Body

| Parameter             | Type   | Required | Description                                                                                    |
|-----------------------|--------|----------|------------------------------------------------------------------------------------------------|
| `trx_ref`            | string | ✅       | Unique transaction reference.                                                                 |
| `bank_id`            | string | ✅       | Bank ID code.                                                                                  |
| `account_holder_name`| string | ✅       | Account holder's full name.                                                                    |
| `account_number`     | string | ✅       | Bank account number.                                                                           |
| `amount`             | string | ✅       | The amount to withdraw.                                                                        |
| `payment_method`     | string | ✅       | Payment method code (1 = Bank Card, 2 = VA Number, 3 = E-Wallet).                            |
| `description`        | string | ✅       | Transaction description.                                                                       |

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
curl -X POST "/api/v1.1/withdraw" \
  -H "Content-Type: application/json" \
  -H "X-MERCHANT-KEY: {merchant_key}" \
  -H "X-API-KEY: {api_key}" \
  -d '{
    "trx_ref": "12323",
    "bank_id": "2",
    "account_holder_name": "RAIDY WIJAYA",
    "account_number": "1040000008446",
    "amount": "4000000",
    "payment_method": "1",
    "description": "domestic transfer bni 0315747263 009 v2"
  }'
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v1.1';
$merchantKey = 'merchant_key';
$apiKey = 'api_key';
$withdrawalData = [
    'trx_ref' => '12323',
    'bank_id' => '2',
    'account_holder_name' => 'RAIDY WIJAYA',
    'account_number' => '1040000008446',
    'amount' => '4000000',
    'payment_method' => '1',
    'description' => 'domestic transfer bni 0315747263 009 v2',
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->post("{$baseUrl}/withdraw", $withdrawalData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1.1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const withdrawalData = {
    trx_ref: '12323',
    bank_id: '2',
    account_holder_name: 'RAIDY WIJAYA',
    account_number: '1040000008446',
    amount: '4000000',
    payment_method: '1',
    description: 'domestic transfer bni 0315747263 009 v2',
};

axios.post(`${baseUrl}/withdraw`, withdrawalData, {
    headers: {
        'Content-Type': 'application/json',
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

base_url = '/api/v1.1'
merchant_key = 'merchant_key'
api_key = 'api_key'
withdrawal_data = {
    'trx_ref': '12323',
    'bank_id': '2',
    'account_holder_name': 'RAIDY WIJAYA',
    'account_number': '1040000008446',
    'amount': '4000000',
    'payment_method': '1',
    'description': 'domestic transfer bni 0315747263 009 v2',
}

headers = {
    'Content-Type': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.post(f"{base_url}/withdraw", headers=headers, json=withdrawal_data)

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
    {label: 'Success — 201 Created', value: 'success'},
    {label: 'Validation Error — 422', value: 'validation'},
    {label: 'Not Found — 404', value: 'not_found'},
  ]}
>

<TabItem value="success">

```json
{
    "success": true,
    "code": "2010301",
    "message": "Withdrawal has been created.",
    "data": {
        "trx_id": "TRX-20250910-12345",
        "trx_ref": "12323",
        "amount": "4000000",
        "status": "pending"
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
        "account_number": [
            "The account number field is required."
        ],
        "amount": [
            "The amount must be greater than zero."
        ]
    }
}
```

</TabItem>

<TabItem value="not_found">

```json
{
    "success": false,
    "code": "4040003",
    "message": "Bank not found"
}
```

</TabItem>

</Tabs>

---

### Payment Method Codes

| Payment Method | Code | Description                    |
|----------------|------|--------------------------------|
| Bank Card      | `1`  | Bank card/account transfer     |
| VA Number      | `2`  | Virtual Account number         |
| E-Wallet       | `3`  | E-Wallet transfer              |

---

> **💡 Note**
>
> - Use `trx_ref` to track your withdrawal transaction
> - Ensure `bank_id` matches a valid bank code from the banks list
> - The `amount` should be provided as a string
> - `payment_method` determines the transfer type (1 = Bank, 2 = VA, 3 = E-Wallet)

