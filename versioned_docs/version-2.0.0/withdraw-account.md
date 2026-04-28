---
id: withdraw-account-v2
slug: /withdraw-account
title: Create Withdrawal Account
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a new withdrawal account for the authenticated user. The bank account will be verified with the payment gateway in production environments.

**POST** `/api/v2/withdraw-accounts`

## Request Headers

| Header           | Value               | Required | Description             |
|------------------|---------------------|----------|-------------------------|
| `Content-Type` | `application/json` | ✅ | Request payload format. |
| `Accept` | `application/json` | ✅ | Expected response format. |
| `X-API-KEY` | `{apiKey}` | ✅ | API key credential. |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token. |

## Request Body

| Parameter             | Type    | Required | Description                                                         |
|-----------------------|---------|----------|---------------------------------------------------------------------|
| `type`           | string | ✅       | Withdrawal method from `BANK_TRANSFER`, `VIRTUAL_ACCOUNT`, `E_WALLET`.                     |
| `category`            | string  | ✅       | Account category. Must be either `Reconcile` or `Customer`.         |
| `accountNumber`      | string  | ✅       | Bank account number or e-wallet number (max 255 characters).        |
| `accountHolderName` | string  | ✅       | Account holder's full name (max 255 characters).                    |
| `bankCode`           | string  | ✅       | Bank or wallet code from the lists endpoint (max 255 characters).   |

## Code Examples

<Tabs groupId="withdraw-create-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X POST "/api/v2/withdraw-accounts" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: apiKey" \
  -d '{
    "methodId": 1,
    "accountNumber": "1234567890",
    "accountHolderName": "John Doe",
    "bankCode": "1",
  }'
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v2';
$apiKey = 'apiKey';
$accountData = [
    'methodId' => 1,
    'category' => 'Customer',
    'accountNumber' => '1234567890',
    'accountHolderName' => 'John Doe',
    'bankCode' => '1',
    'branchName' => 'Jakarta Pusat',
    'country' => 'ID',
    'accountType' => 'savings',
    'additionalInfo' => 'Primary account',
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'X-API-KEY' => $apiKey,
])->post("{$baseUrl}/withdraw-accounts", $accountData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v2';
const apiKey = 'apiKey';
const accountData = {
  methodId: 1,
  category: 'Customer',
  accountNumber: '1234567890',
  accountHolderName: 'John Doe',
  bankCode: '1',
  branchName: 'Jakarta Pusat',
  country: 'ID',
  accountType: 'savings',
  additionalInfo: 'Primary account',
};

axios
  .post(`${baseUrl}/withdraw-accounts`, accountData, {
    headers: {
      'Content-Type': 'application/json',
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

baseUrl = '/api/v2'
apiKey = 'apiKey'
accountData = {
    'methodId': 1,
    'category': 'Customer',
    'accountNumber': '1234567890',
    'accountHolderName': 'John Doe',
    'bankCode': '1',
    'branchName': 'Jakarta Pusat',
    'country': 'ID',
    'accountType': 'savings',
    'additionalInfo': 'Primary account',
}

headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': apiKey,
}

response = requests.post(f"{baseUrl}/withdraw-accounts", headers=headers, json=accountData)

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
    "userId": 123,
    "withdrawMethodId": 1,
    "name": "Bank Transfer",
    "category": "Customer",
    "accountNumber": "1234567890",
    "accountHolderName": "John Doe",
    "bankCode": "1",
    "bankName": "BANK RAKYAT INDONESIA",
    "branchName": "Jakarta Pusat",
    "country": "ID",
    "accountType": "savings",
    "additionalInfo": "Primary account",
    "createdAt": "2025-01-15T10:30:00.000000Z",
    "updatedAt": "2025-01-15T10:30:00.000000Z",
    "withdrawMethod": {
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
    "bankCode": [
      "Invalid bank account"
    ]
  }
}
```

</TabItem>

</Tabs>

> **⚠️ Important**  
> - In production, the bank account is verified with the payment gateway before creation.  
> - Use a valid `bankCode` from the [Get Banks and Wallets Lists](./banks-wallets) endpoint.  


