---
id: withdraw
title: Create Withdrawal
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Create Withdrawal

Create a withdrawal transaction from merchant balance to a destination account.
This endpoint is intended for server-to-server usage in payout workflows.

**Endpoint:**  
`POST /api/v2/withdraw`

## Overview

Use this endpoint when your system needs to disburse funds to a bank account, virtual account destination, or e-wallet destination based on the selected payment method.

Typical flow:

1. Validate recipient and amount in your application.
2. Submit withdrawal request with a unique `trxReference`.
3. Store the returned `trxId` for reconciliation and status tracking.
4. Poll or subscribe to status updates using your transaction monitoring process.

## Endpoint Details

| Item | Value |
|------|-------|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/withdraw` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Idempotency Hint | Reuse-safe reference via unique `trxReference` |

## Request

### Request Headers

| Header              | Value                | Required | Description             |
|---------------------|---------------------|----------|-------------------------|
| `Content-Type`      | `application/json`  | ✅       | Request payload format |
| `Accept`            | `application/json`  | ✅       | Expected response format |
| `Authorization`     | `Bearer {token}`    | ✅       | Bearer access token |
| `X-API-KEY`         | `{apiKey}`          | ✅       | API key credential |

### Request Body

| Parameter             | Type   | Required | Description                                                                                    |
|-----------------------|--------|----------|------------------------------------------------------------------------------------------------|
| `trxReference`             | string | ✅       | Unique merchant-side reference for idempotency and tracking |
| `bankCode`             | string | ✅       | Bank identifier/code (refer to [Banks List](./banks/list-v2)) |
| `accountHolderName` | string | ✅       | Beneficiary full name |
| `accountNumber`      | string | ✅       | Destination account number |
| `amount`              | number | ✅       | Withdrawal amount as numeric (e.g. `4000000`) |
| `paymentMethod`      | string | ✅       | Method code `EWALLET`, `VIRTUAL_ACCOUNT`, `BANK_TRANSFER`  |
| `description`         | string | ❌       | Optional transaction description/reference note |
| `walletReference`     | string | ❌       | Optional wallet/e-wallet reference identifier |

### Validation Rules (Recommended)

| Field | Rule |
|------|------|
| `trxReference` | Required, unique per merchant transaction |
| `bankCode` | Required, must exist in [Banks List](./banks/list-v2) |
| `accountHolderName` | Required, non-empty, normalized text |
| `accountNumber` | Required, numeric/alphanumeric as per channel rule |
| `amount` | Required, numeric , greater than zero |
| `paymentMethod` | Required, allowed values: `EWALLET`, `VIRTUAL_ACCOUNT`, `BANK_TRANSFER` |
| `description` | Optional, if provided should be non-empty and within max length policy |
| `walletReference` | Optional, include when reconciliation with wallet reference is needed |

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
curl -X POST "/api/v2/withdraw" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -H "X-API-KEY: {apiKey}" \
  -d '{
    "trxReference": "12323",
    "bankCode": "2",
    "accountHolderName": "RAIDY WIJAYA",
    "accountNumber": "1040000008446",
    "amount": "4000000",
    "paymentMethod": "BANK_TRANSFER",
    "description": "domestic transfer bni 0315747263 009 v2",
    "walletReference": "WALLET-REF-001"
  }'
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v2';
$token = 'yourBearerToken';
$apiKey = 'apiKey';
$withdrawalData = [
    'trxReference' => '12323',
    'bankCode' => '2',
    'accountHolderName' => 'RAIDY WIJAYA',
    'accountNumber' => '1040000008446',
    'amount' => 4000000,
    'paymentMethod' => '1',
    'description' => 'domestic transfer bni 0315747263 009 v2',
    'walletReference' => 'WALLET-REF-001', // Optional
];

$response = Http::timeout(60)->withHeaders([
    'Content-Type' => 'application/json',
    'Authorization' => "Bearer {$token}",
    'X-API-KEY' => $apiKey,
])->post("{$baseUrl}/withdraw", $withdrawalData);

$result = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v2';
const token = 'yourBearerToken';
const apiKey = 'apiKey';
const withdrawalData = {
    trxReference: '12323',
    bankCode: '2',
    accountHolderName: 'RAIDY WIJAYA',
    accountNumber: '1040000008446',
    amount: 4000000,
    paymentMethod: '1',
    description: 'domestic transfer bni 0315747263 009 v2',
    walletReference: 'WALLET-REF-001', // Optional
};

axios.post(`${baseUrl}/withdraw`, withdrawalData, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

baseUrl = '/api/v2'
token = 'yourBearerToken'
apiKey = 'apiKey'
withdrawalData = {
    'trxReference': '12323',
    'bankCode': '2',
    'accountHolderName': 'RAIDY WIJAYA',
    'accountNumber': '1040000008446',
    'amount': 4000000,
    'paymentMethod': '1',
    'description': 'domestic transfer bni 0315747263 009 v2',
    'walletReference': 'WALLET-REF-001',  # Optional
}

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {token}',
    'X-API-KEY': apiKey,
}

response = requests.post(f"{baseUrl}/withdraw", headers=headers, json=withdrawalData)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Response

### Responses

<Tabs
  defaultValue="success"
  values={[
    {label: 'Success — 201 Created', value: 'success'},
    {label: 'Validation Error — 422', value: 'validation'},
    {label: 'Not Found — 404', value: 'notFound'},
  ]}
>

<TabItem value="success">

```json
{
    "code": 2000005,
    "message": "success",
    "data": {
        "trxId": "TRXWITH3UW664W52Y5DF9BDKE",
        "trxReference": "a91d385c-b11f-4ac4-b1d2-0f6e04d66e35",
        "trxType": "withdraw",
        "provider": "PAYLABS",
        "walletReference": "798055915",
        "amount": 10000,
        "netAmount": 10000,
        "fee": 0,
        "feeType": "SELLER",
        "currency": "IDR",
        "paymentChannel": "EWALLET",
        "status": "completed",
        "bankCode": "165",
        "accountNumber": "628123456789",
        "accountHolderName": "Tria",
        "processedAt": "2026-05-05T02:54:24.225194456Z"
    }
}
```

</TabItem>

<TabItem value="validation">

```json
{
  "code": 4220601,
  "message": "Validation failed",
  "errors": {
    "accountNumber": [
      "The account number field is required."
    ],
    "amount": [
      "The amount must be greater than zero."
    ]
  }
}
```

</TabItem>

<TabItem value="notFound">

```json
{
  "code": 4040003,
  "message": "Bank not found"
}
```

</TabItem>

</Tabs>

### Response Fields

| Field | Type | Description |
|------|------|-------------|
| `code` | number | Service response code |
| `message` | string | Human-readable status message |
| `data` | object | Present on success; withdrawal transaction payload |
| `data.trxId` | string | System-generated withdrawal transaction identifier |
| `data.trxReference` | string | Merchant reference submitted in the request |
| `data.trxType` | string | Transaction type (for example `withdraw`) |
| `data.provider` | string | Processing partner or rail identifier |
| `data.walletReference` | string | Wallet reference when applicable (may be omitted for some channels) |
| `data.amount` | number | Withdrawal amount |
| `data.netAmount` | number | Net amount after fees |
| `data.fee` | number | Applied withdrawal fee |
| `data.feeType` | string | Fee assignment policy (for example `SELLER` or `CUSTOMER`) |
| `data.currency` | string | Currency code (for example `IDR`) |
| `data.paymentChannel` | string | Payout channel (for example `EWALLET`, `BANK_TRANSFER`, `VIRTUAL_ACCOUNT`) |
| `data.status` | string | Processing state (for example `pending` or `completed`) |
| `data.bankCode` | string | Destination bank or institution code when applicable |
| `data.accountNumber` | string | Destination account or wallet identifier when applicable |
| `data.accountHolderName` | string | Beneficiary name when applicable |
| `data.processedAt` | string | Timestamp when the payout reached a processed state (ISO 8601), if returned |
| `errors` | object | Present on validation failures; field names map to arrays of error messages |

## Payment Method Codes

| Payment Method | Code | Description                    |
|----------------|------|--------------------------------|
| Bank Transfer      | `BANK_TRANSFER`  | Bank card/account transfer     |
| VA Number      | `VIRTUAL_ACCOUNT`  | Virtual Account number         |
| E-Wallet       | `EWALLET`  | E-Wallet transfer              |

## Withdrawal status lifecycle

After a successful create, the withdrawal is usually `pending`, then moves through one or more processing states while the gateway or bank works the payout. It ends in **`completed`** when money has left the platform successfully, or in **`failed`** when the attempt stops; in the failure case the amount is typically reconciled back and the transaction may show as **`refunded`**.

![Withdrawal status lifecycle: pending through processing to completed, or failed then refunded](/img/withdraw.svg)

### Available withdraw Status

| Status Code               | Category      | Status Description                      |
|---------------------------|---------------|----------------------------------------------------------|
| `pending`                 | `withdraw`    | Transaction awaiting payment confirmation                |
| `awaiting_fi_process`     |  `withdraw`    | Awaiting processing by the financial institution         |
| `awaiting_pg_process`     |  `withdraw`    | Queued at the payment gateway for further processing     |
| `awaiting_user_action`    |  `withdraw`    | Merchant/customer must perform an action to proceed      |
| `awaiting_admin_approval` |  `withdraw`    | Waiting for manual approval from an administrator        |
| `completed`               | `withdraw`    | Payment process successfully finalized                   |
| `failed`                  | `withdraw`    | Payment process terminated due to error                  |
| `refunded`                |  `withdraw`    | Funds returned to the payer after completion             |
| `expired`                 | `withdraw`    | Payment session exceeded time limit and can’t continue   |

## Security and Reliability Notes

- Generate truly unique `trxReference` values to prevent duplicate payout submissions.
- Validate destination account and amount on your server before sending requests.
- Keep API keys in secure server-side secret storage; never expose them to frontend clients.
- Use HTTPS for all non-local environments.
- Implement retry policy only for safe/transient failures, and never retry blindly for business rejections.

## Operational Notes

- Use `trxReference` and returned `trxId` together for reconciliation.
- Prefer asynchronous status tracking for final payout state confirmation.
- Map `code` values using the v2 Response Code reference for deterministic client behavior.

