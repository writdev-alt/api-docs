---
id: check-transaction-v2
slug: /transactions/check-status
title: Check Transaction Status
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Check Transaction Status

Retrieve the latest status and details of a transaction by transaction ID.

**Endpoint:**  
`GET /api/v2/transactions/{trxId}`

## Overview

Use this endpoint to monitor transaction progress after creation (for example QRIS or Virtual Account transactions).

Typical flow:
1. Store returned `trxId` after creating a transaction.
2. Call this endpoint from backend services for status checks.
3. Update your order/payment state based on `data.status`.

## Endpoint Details

| Item | Value |
|---|---|
| HTTP Method | `GET` |
| Endpoint | `/api/v2/transactions/{trxId}` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |

## Request Specification

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `trxId` | string | ✅ | Unique transaction ID returned by create transaction endpoints |

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Accept` | `application/json` | ✅ | Expected response format |
| `Content-Type` | `application/json` | ✅ | Request payload format |
| `X-API-KEY` | `{apiKey}` | ✅ | API key credential |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token |

### Code Example

<Tabs
  defaultValue="curl"
  values={[
    {label: 'cURL', value: 'curl'},
  ]}
>

<TabItem value="curl">

```bash
curl --location 'https://sandbox.ilonapay.com/api/v2/transactions/TRX-QRIS3-20260428-X05UTV9DLWAR' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Authorization: Bearer {token}'
```

</TabItem>

</Tabs>

## Response Specification

### Responses

<Tabs
  defaultValue="success"
  values={[
    {label: 'Success — 200 OK', value: 'success'},
    {label: 'Not Found — 404', value: 'notFound'},
    {label: 'Unauthorized — 401', value: 'unauthorized'},
  ]}
>

<TabItem value="success">

```json
{
  "code": 2000000,
  "message": "success retrieve transaction",
  "data": {
    "trxId": "TRX-QRIS3-20260428-X05UTV9DLWAR",
    "trxReference": "897b0605-b9fa-49e2-bae6-eaadf35f2da8",
    "amount": 100900,
    "netAmount": 100000,
    "fee": 900,
    "feeType": "CUSTOMER",
    "currency": "IDR",
    "paymentChannel": "QRIS",
    "status": "pending",
    "expiredAt": "2026-04-28T18:00:17.192335563Z"
  }
}
```

</TabItem>

<TabItem value="notFound">

```json
{
  "code": 4040001,
  "message": "transaction not found"
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
| `data.trxId` | string | System-generated transaction identifier |
| `data.trxReference` | string | Merchant transaction reference |
| `data.amount` | number | Gross transaction amount |
| `data.netAmount` | number | Net amount after fee calculation |
| `data.fee` | number | Applied transaction fee |
| `data.feeType` | string | Fee assignment policy (`CUSTOMER` or `MERCHANT`) |
| `data.currency` | string | Currency code (`IDR`) |
| `data.paymentChannel` | string | Channel used for payment (for example `QRIS`) |
| `data.status` | string | Current transaction status |
| `data.expiredAt` | string | Expiry timestamp (ISO 8601) |

## Operational Notes

- Keep polling intervals reasonable (for example every 15-30 seconds) to reduce unnecessary request load.
- Stop polling when status reaches final states (such as `paid`, `failed`, or `expired`).
- Perform server-side reconciliation using `trxId` and `trxReference`.
