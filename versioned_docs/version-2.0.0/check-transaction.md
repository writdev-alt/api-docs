---
id: check-transaction-v2
slug: /transactions/check-status
title: Check Transaction Status
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Check Transaction Status

Retrieve the latest status and transaction details using a transaction ID.

**Endpoint:**  
`GET /api/v2/transactions/{trxId}`

## Overview

Use this endpoint to monitor transaction progress after creation for both payin and payout flows (for example QRIS and bank transfer).

Typical flow:
1. Store returned `trxId` after creating a transaction.
2. Call this endpoint from backend services for status checks.
3. Update your order or payout state based on `data.status`.

## Endpoint Details

| Item | Value |
|---|---|
| HTTP Method | `GET` |
| Endpoint | `/api/v2/transactions/{trxId}` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Supported Flows | Payin and Payout |

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `trxId` | string | ✅ | Unique transaction ID returned by transaction creation endpoints |

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Accept` | `application/json` | ✅ | Expected response format |
| `Content-Type` | `application/json` | ✅ | Request payload format |
| `X-API-KEY` | `{apiKey}` | ✅ | API key credential |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token |

### Code Example

<Tabs
  defaultValue="payin"
  values={[
    {label: 'Payin (QRIS) — cURL', value: 'payin'},
    {label: 'Payout (Withdraw) — cURL', value: 'payout'},
  ]}
>

<TabItem value="payin">

```bash
curl --location 'https://sandbox.ilonapay.com/api/v2/transactions/TRX-QRIS3-20260428-X05UTV9DLWAR' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Authorization: Bearer {token}'
```

</TabItem>

<TabItem value="payout">

```bash
curl --location 'https://sandbox.ilonapay.com/api/v2/transactions/TRX-WD-20260429-8X4K2P1' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Authorization: Bearer {token}'
```

</TabItem>

</Tabs>

## Response

### Responses

<Tabs
  defaultValue="successQris"
  values={[
    {label: 'Success QRIS — 200 OK', value: 'successQris'},
    {label: 'Success VA — 200 OK', value: 'successVa'},
    {label: 'Success Payout — 200 OK', value: 'successPayout'},
    {label: 'Not Found — 404', value: 'notFound'},
    {label: 'Unauthorized — 401', value: 'unauthorized'},
  ]}
>

<TabItem value="successQris">

```json
{
  "code": 2000000,
  "message": "success retrieve transaction",
  "data": {
    "trxId": "TRX-QRIS3-20260428-X05UTV9DLWAR",
    "trxReference": "897b0605-b9fa-49e2-bae6-eaadf35f2da8",
    "rrn": "fb96da8d931c",
    "amount": 100000,
    "netAmount": 91000,
    "fee": 900,
    "feeType": "MERCHANT",
    "currency": "IDR",
    "paymentChannel": "QRIS",
    "status": "pending",
    "expiredAt": "2026-04-28T18:00:17.192335563Z",
    "merchantInfo": {
      "merchantId": "3",
      "merchantName": "AURALINK DIGITAL STALL 44",
      "nmid": "ID1026497176242",
      "city": "TANGERANG"
    }
  }
}
```

</TabItem>

<TabItem value="successVa">

```json
{
  "code": 2000000,
  "message": "success retrieve transaction",
  "data": {
    "trxId": "TRX-VA-20260429-H8P2XK9Q1N",
    "trxReference": "3f5b7f60-8c95-428f-9680-65d3bc5f9f31",
    "amount": 12500,
    "netAmount": 12500,
    "fee": 0,
    "feeType": "CUSTOMER",
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

<TabItem value="successPayout">

```json
{
  "code": 2000000,
  "message": "success retrieve transaction",
  "data": {
    "trxId": "TRX-WD-20260429-8X4K2P1",
    "trxReference": "97df4f2f-4e71-42aa-9fdb-845ecf1f0f57",
    "amount": 250000,
    "netAmount": 248500,
    "fee": 1500,
    "feeType": "MERCHANT",
    "currency": "IDR",
    "paymentChannel": "BANK_TRANSFER",
    "status": "completed",
    "bankCode": "002",
    "accountNumber": "1040000008446",
    "accountHolderName": "RAIDY WIJAYA",
    "processedAt": "2026-04-29T09:31:44.000000Z"
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
| `data.paymentChannel` | string | Channel used for payment (for example `QRIS`, `BANK_TRANSFER`) |
| `data.status` | string | Current transaction status |
| `data.expiredAt` | string | Expiry timestamp for QRIS/VA transactions (ISO 8601) |
| `data.rrn` | string | Retrieval Reference Number from payment network (QRIS response) |
| `data.merchantInfo` | object | Merchant identity details attached to QRIS transaction |
| `data.merchantInfo.merchantId` | string | Merchant identifier |
| `data.merchantInfo.merchantName` | string | Merchant display name |
| `data.merchantInfo.nmid` | string | National Merchant ID (NMID) |
| `data.merchantInfo.city` | string | Merchant city |
| `data.vaNumber` | string | Virtual Account number (VA response) |
| `data.paymentType` | string | VA payment type/code (for example `BTNVA`) |
| `data.bankCode` | string | Destination bank code (payout response) |
| `data.accountNumber` | string | Destination account number (payout response) |
| `data.accountHolderName` | string | Destination account holder name (payout response) |
| `data.processedAt` | string | Processing completion timestamp (payout response, ISO 8601) |

## Status Lifecycle (Guideline)

Common status transitions:
- **Payin:** `pending` -> `paid` or `expired`/`failed`
- **Payout:** `pending` -> `completed` or `failed` -> `refund` (if failed, amount should be refunded to source balance)

## Operational Notes

- Keep polling intervals reasonable (for example every 15-30 seconds) to reduce unnecessary request load.
- Stop polling when status reaches a final state (`paid`, `completed`, `failed`, or `expired`).
- Perform server-side reconciliation using both `trxId` and `trxReference`.
