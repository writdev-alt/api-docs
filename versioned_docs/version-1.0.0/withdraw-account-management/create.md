---
id: withdraw-account-management-create
slug: /withdraw-account-management/create
title: Create Withdrawal Account
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a new withdrawal account for the authenticated user. The bank account will be verified with the payment gateway in production environments.

**POST** `/api/v1/withdraw-accounts`

## Request Headers

| Header           | Value               | Required | Description             |
|------------------|---------------------|----------|-------------------------|
| `Content-Type`   | `application/json`  | ✅       | Request content type.   |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅       | Your Merchant ID.       |
| `X-API-KEY`      | `{api_key}`         | ✅       | Your API Key.           |

## Request Body

| Parameter             | Type    | Required | Description                                                         |
|-----------------------|---------|----------|---------------------------------------------------------------------|
| `method_id`           | integer | ✅       | Withdrawal method ID from the methods endpoint.                     |
| `category`            | string  | ✅       | Account category. Must be either `Reconcile` or `Customer`.         |
| `account_number`      | string  | ✅       | Bank account number or e-wallet number (max 255 characters).        |
| `account_holder_name` | string  | ✅       | Account holder's full name (max 255 characters).                    |
| `bank_code`           | string  | ✅       | Bank or wallet code from the lists endpoint (max 255 characters).   |
| `branch_name`         | string  | ❌       | Bank branch name (max 255 characters). Optional for banks.          |
| `country`             | string  | ✅       | Country code (e.g., ID, US, SG) (max 10 characters).                |
| `account_type`        | string  | ❌       | Account type (e.g., savings, checking) (max 50 characters).         |
| `additional_info`     | string  | ❌       | Any additional information (max 1000 characters).                   |

## Code Examples

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
  "success": true,
  "code": "2010301",
  "message": "Withdrawal account has been created.",
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
  "code": "4220601",
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

> **⚠️ Important**  
> - In production, the bank account is verified with the payment gateway before creation.  
> - Use a valid `bank_code` from the [Get Banks and Wallets Lists](./banks-wallets) endpoint.  


