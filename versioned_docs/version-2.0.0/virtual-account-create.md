---
id: virtual-account-create
slug: /virtual-account-create
title: Create Virtual Account
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a Virtual Account (VA) payment transaction for Indonesia domestic collections.

**Endpoint:**  
`POST /virtual-account/create`

## Overview

Use this endpoint to generate a VA payment instruction with a selected payment channel type (for example `BTNVA`).

Typical flow:
1. Select `paymentType` based on the enabled bank channel.
2. Submit transaction `amount` from your backend service.
3. Display returned VA details to the payer.
4. Reconcile payment status using your transaction monitoring process.

## Endpoint Details

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `/virtual-account/create` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Currency | `IDR` |

## Request

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Content-Type` | `application/json` | ✅ | Request payload format |
| `Accept` | `application/json` | ✅ | Expected response format |
| `X-API-KEY` | `{apiKey}` | ✅ | API key credential |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token |

### Request Body

| Parameter | Type | Required | Description |
|---|---|---|---|
| `paymentType` | string | ✅ | VA payment channel code (for example `BTNVA`) |
| `amount` | number | ✅ | Payment amount in IDR |

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `paymentType` | Required, must be a supported VA channel code |
| `amount` | Required, integer, greater than zero |

### Code Example

<Tabs groupId="virtual-account-create-code" defaultValue="curl" values={[
  { label: 'cURL', value: 'curl' },
]}>

<TabItem value="curl">

```bash
curl --location '/virtual-account/create' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "paymentType":"BTNVA",
    "amount":10000
  }'
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
    {label: 'Unauthorized — 401', value: 'unauthorized'},
  ]}
>

<TabItem value="success">

```json
{
  "code": 2000005,
  "message": "success",
  "data": {
    "trxId": "TRX-VA-20260429-H8P2XK9Q1N",
    "trxReference": "3f5b7f60-8c95-428f-9680-65d3bc5f9f31",
    "amount": 10000,
    "netAmount": 9800,
    "fee": 200,
    "feeType": "SELLER",
    "currency": "IDR",
    "paymentChannel": "VIRTUAL_ACCOUNT",
    "status": "pending",
    "vaNumber": "1234567890123456",
    "paymentType": "BTNVA",
    "expiredAt": "2026-04-29T23:59:59.000000Z"
  }
}
```

</TabItem>

<TabItem value="validation">

```json
{
  "code": 4220211,
  "message": "The given data was invalid.",
  "errors": {
    "amount": [
      "amount must be greater than 0"
    ]
  }
}
```

</TabItem>

<TabItem value="unauthorized">

```json
{
  "code": 4010001,
  "message": "Unauthenticated"
}
```

</TabItem>

</Tabs>

### Response Fields

| Field | Type | Description |
|---|---|---|
| `code` | number | Service response code |
| `message` | string | Human-readable response message |
| `data` | object | Present on success; VA transaction payload |
| `data.trxId` | string | System-generated VA transaction identifier |
| `data.trxReference` | string | Merchant or system reference for reconciliation |
| `data.amount` | number | Accepted collection amount |
| `data.netAmount` | number | Net amount after fees |
| `data.fee` | number | Applied fee amount |
| `data.feeType` | string | Fee assignment policy (for example `CUSTOMER` or `SELLER`) |
| `data.currency` | string | Currency code (for example `IDR`) |
| `data.paymentChannel` | string | Channel identifier (`VIRTUAL_ACCOUNT`) |
| `data.status` | string | Processing state (for example `pending` immediately after create) |
| `data.vaNumber` | string | Virtual account number shown to the payer |
| `data.paymentType` | string | VA channel code (matches `paymentType` in the request when applicable) |
| `data.expiredAt` | string | Deadline for payer transfer (ISO 8601) |
| `errors` | object | Present on validation failures; field names map to arrays of error messages |

## Virtual Account status lifecycle

After a successful create, `data.status` is usually **`pending`**: the payer must transfer to the issued VA before `expiredAt`. Poll [Check Transaction Status](./transactions/check-status) or consume [webhooks](./webhooks-v2) until the transaction reaches a **terminal** state, then stop polling and reconcile your order.

![VA status lifecycle: pending through processing to completed, or failed then refunded](/img/va.svg)

### Common `data.status` values (VA)

| Status | Meaning |
|--------|--------|
| `pending` | Awaiting bank transfer to the VA; valid until `expiredAt`. |
| `paid` | Payment confirmed (payin success; terminology may vary by integration). |
| `completed` | Sometimes used as the success terminal alongside or instead of `paid` (for example in notifications). |
| `expired` | No qualifying payment before `expiredAt`. |
| `failed` | Collection did not complete successfully. |

## Security and Reliability Notes

- Keep `X-API-KEY` and bearer token in secure server-side storage.
- Use HTTPS for non-local environments.
- Apply idempotency in your service layer when retrying create requests.
- Handle pending and expired states in your payment lifecycle logic.
