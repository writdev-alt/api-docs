
---
id: withdrawal
title: Withdrawal API
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Create Withdrawal Request

Initiate a new withdrawal request from a specific wallet to a registered withdrawal account.

**Endpoint:**  
`POST /api/v1/withdraw`

---

### Request Headers

| Header              | Value                | Required | Description             |
|---------------------|---------------------|----------|-------------------------|
| `Content-Type`      | `application/json`  | ✅       | Request content type.   |
| `X-MERCHANT-KEY`    | `\\{merchant_key\\}`    | ✅       | Your Merchant ID.       |
| `X-API-KEY`         | `\\{api_key\\}`         | ✅       | Your API Key.           |

---

### Request Body

| Parameter    | Type   | Required | Description                                                                                    |
|--------------|--------|----------|------------------------------------------------------------------------------------------------|
| `account_id` | number | ✅       | The ID of the withdrawal account. Use the ID from the `Get Withdrawal Accounts` endpoint.      |
| `wallet_id`  | number | ✅       | The ID of the wallet from which to withdraw funds.                                             |
| `amount`     | number | ✅       | The amount to withdraw.                                                                        |

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
curl -X POST "/api/v1/withdraw" \
  -H "Content-Type: application/json" \
  -H "X-MERCHANT-KEY: \\{merchant_key\\}" \
  -H "X-API-KEY: \\{api_key\\}" \
  -d '{"account_id": 2, "wallet_id": 2, "amount": 10000}'
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v1';
$merchantKey = "merchant_key";
$apiKey = "api_key";
$withdrawalData = [
    'account_id' => 2,
    'wallet_id' => 2,
    'amount' => 10000,
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

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const withdrawalData = {
    account_id: 2,
    wallet_id: 2,
    amount: 10000,
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

base_url = '/api/v1'
merchant_key = 'merchant_key'
api_key = 'api_key'
withdrawal_data = {
    'account_id': 2,
    'wallet_id': 2,
    'amount': 10000,
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
    {label: 'Validation Failed — 422', value: 'validation_failed'},
    {label: 'Withdrawals Disabled — 422', value: 'withdrawals_disabled'},
    {label: 'Currency Mismatch — 422', value: 'currency_mismatch'},
    {label: 'Amount Out of Limits — 422', value: 'amount_out_of_limits'},
  ]}
>

<TabItem value="success">

```json
{
    "message": "Withdrawal has been created.",
    "data": {
        "trx_id": "WTH-20250910-12345",
        "amount": 10000,
        "account_id": 2,
        "wallet_id": "1234567890"
    }
}
```

</TabItem>

<TabItem value="validation_failed">

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "amount": ["The amount must be greater than zero."],
        "wallet_id": ["The selected wallet ID is invalid."]
    }
}
```

</TabItem>

<TabItem value="withdrawals_disabled">

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "account_id": ["Withdrawals are not enabled for today."]
    }
}
```

</TabItem>

<TabItem value="currency_mismatch">

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "account_id": ["The currency of account and wallet must be the same."]
    }
}
```

</TabItem>

<TabItem value="amount_out_of_limits">

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "account_id": ["Amount is not within the allowed limits."]
    }
}
```

</TabItem>

</Tabs>

---

> **⚠️ Important Validations**
>
> - Withdrawals must be enabled for the current day based on the withdrawal schedule
> - The wallet and withdrawal account must use the same currency
> - The withdrawal amount must be within the method's min/max limits
> - The wallet must have sufficient balance
> - The withdrawal account must belong to the authenticated user

---

> **💡 Note**
>
> - Pay attention to the `payment_method` parameter of the transfer interface and the card verification interface:
>     - If the receiving account is a bank card, pass `1`
>     - If the receiving account is a VA number, pass `2`
>     - If the receiving account is an e-wallet, pass `3`
> - Note that for the `bank_id` parameter of the transfer interface and the card verification interface, the value-taking interfaces are different for different payment methods.

---

### Payment Method Examples

| Payment Method Name | payment_method | channel | bank_id | account_number     | account_holder_name               |
|---------------------|---------------|---------|---------|--------------------|-----------------------------------|
| Bank Card           | 1             | BRI     | 1       | 888801000157508    | Dummy                             |
| VA Number           | 2             | MANDIRI | 2       | 8730700000000001   | Andohar Erwin Juniarta            |
| E-Wallet            | 3             | OVO     | 164     | 8000000000         | DUMMY VA                          |
| E-Wallet            | 3             | DANA    | 165     | 81650000000        | DAVID BECKHAM DAVID BECKHAM DA    |
| E-Wallet            | 3             | GoPay   | 167     | 81670000000        | ANDY SUHNO                        |

---

## Check Withdrawal Status

Check the status of a withdrawal transaction. This is a public endpoint that allows you to query the current status of any withdrawal request using the transaction ID.

**Endpoint:**  
`GET /api/v1/withdraw/status/{trxId}`

---

### Path Parameters

| Parameter  | Type   | Required | Description                                   |
|------------|--------|----------|-----------------------------------------------|
| `trxId`    | string | ✅       | The transaction ID of the withdrawal request. |

---

### Code Examples

<Tabs
  defaultValue="curl-status"
  values={[
    {label: 'cURL', value: 'curl-status'},
    {label: 'PHP / Laravel', value: 'php-status'},
    {label: 'Node.js', value: 'node-status'},
    {label: 'Python', value: 'python-status'},
  ]}
>

<TabItem value="curl-status">

```bash
curl -X GET "/api/v1/withdraw/status/WTH-20250910-12345"
```

</TabItem>

<TabItem value="php-status">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v1';
$trxId = 'WTH-20250910-12345';

$response = Http::timeout(60)->get("{$baseUrl}/withdraw/status/{$trxId}");

if ($response->successful()) {
    $result = $response->json();
    echo "Status: " . $result['status'];
    echo "Message: " . $result['message'];
} else {
    echo "Error: Transaction not found";
}
```

</TabItem>

<TabItem value="node-status">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const trxId = 'WTH-20250910-12345';

axios.get(`${baseUrl}/withdraw/status/${trxId}`)
.then(response => {
    console.log('Status:', response.data.status);
    console.log('Message:', response.data.message);
    if (response.data.cancel_redirect) {
        console.log('Cancel URL:', response.data.cancel_redirect);
    }
    if (response.data.success_redirect) {
        console.log('Success URL:', response.data.success_redirect);
    }
})
.catch(error => {
    if (error.response) {
        console.error('Error:', error.response.data.message);
    } else {
        console.error('Error:', error.message);
    }
});
```

</TabItem>

<TabItem value="python-status">

```python
import requests

base_url = '/api/v1'
trx_id = 'WTH-20250910-12345'

response = requests.get(f"{base_url}/withdraw/status/{trx_id}")

if response.status_code == 200:
    result = response.json()
    print(f"Status: {result['status']}")
    print(f"Message: {result['message']}")
    if result.get('cancel_redirect'):
        print(f"Cancel URL: {result['cancel_redirect']}")
    if result.get('success_redirect'):
        print(f"Success URL: {result['success_redirect']}")
else:
    print(f"Error: {response.json()['message']}")
```

</TabItem>

</Tabs>

---

### Responses

<Tabs
  defaultValue="status-success"
  values={[
    {label: 'Success — 200 OK', value: 'status-success'},
    {label: 'Not Found — 404', value: 'status-not-found'},
  ]}
>

<TabItem value="status-success">

```json
{
    "status": "completed",
    "message": "Withdrawal request status checked successfully.",
    "cancel_redirect": "https://yoursite.com/cancel",
    "success_redirect": "https://yoursite.com/success"
}
```

</TabItem>

<TabItem value="status-not-found">

```json
{
    "status": "error",
    "message": "Withdrawal request not found."
}
```

</TabItem>

</Tabs>

---

> **ℹ️ Note:**  
> This is a public endpoint that doesn't require authentication. You can use this to poll for transaction status updates.

---

### Possible Status Values

| Status      | Description                                 |
|-------------|---------------------------------------------|
| `pending`   | Withdrawal request is pending approval.     |
| `completed` | Withdrawal has been successfully processed. |
| `canceled`  | Withdrawal request was canceled.            |
| `failed`    | Withdrawal request failed.                  |
| `rejected`  | Withdrawal request was rejected.            |


