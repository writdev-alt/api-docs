---
id: qris-create-v2
slug: /qris-create
title: Create QRIS
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Generate a dynamic QRIS payment transaction for Indonesia domestic payments.
Use this endpoint when your system needs to create a payable QR code for checkout or bill settlement workflows.

**Endpoint:**  
`POST api/v2/qris/create`

## Overview

This endpoint creates a QRIS payment request and returns transaction data that can be used to display a QR code to customers.

Typical flow:
1. Generate a unique `trxReference` in your backend.
2. Submit transaction amount and fee policy (`CUSTOMER` or `SELLER`).
3. Render the returned QRIS payload/image in your checkout UI.
4. Monitor payment status asynchronously until settlement is final.

## Endpoint Details

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `api/v2/qris/create` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Currency | `IDR` |

## Request

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Content-Type` | `application/json` | ✅ | Request payload format. |
| `Accept` | `application/json` | ✅ | Expected response format. |
| `X-API-KEY` | `{apiKey}` | ✅ | API key credential. |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token. |

### Request Body

| Parameter | Type | Required | Description |
|---|---|---|---|
| `amount` | number | ✅ | Payment amount in IDR (integer, greater than 0). |
| `trxReference` | string | ✅ | Unique merchant reference for idempotency and reconciliation. |
| `feeType` | string | ✅ | Fee assignment policy: `CUSTOMER` or `SELLER`. |

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `amount` | Required, integer, minimum `1` |
| `trxReference` | Required, unique per transaction |
| `feeType` | Required, allowed values: `CUSTOMER`, `SELLER` |

### Code Example

<Tabs groupId="qris-create-code" defaultValue="curl" values={[
  { label: 'cURL', value: 'curl' },
]}>

<TabItem value="curl">

```bash
curl --location '/api/v2/qris/create' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "amount": 1000,
    "trxReference": "d73c0f1a-993f-4968-815c-0daf9510ab23",
    "feeType": "CUSTOMER"
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
  "code": 2013001,
  "message": "success retrieve data QRIS",
  "data": {
    "trxId": "TRXQRIS3991PZZH3A7J5C6YE8",
    "trxReference": "897b0605-b9fa-49e2-bae6-eaadf35f2da8",
    "merchantId": "3",
    "amount": 100900,
    "netAmount": 100000,
    "fee": 900,
    "feeType": "CUSTOMER",
    "currency": "IDR",
    "status": "pending",
    "paymentChannel": "QRIS",
    "expiredAt": "2026-04-28T18:00:17.192335563Z",
    "payload": "00020101021226670016COM.....",
    "imageUrl": "https://sandbox.ilonapay.com/qris/view/TRXQRIS3991PZZH3A7J5C6YE8",
    "imageBase64": "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX.....",
    "provider": {
      "name": "Nobu",
      "referenceId": "TRXQRIS3991PZZH3A7J5C6YE8",
      "status": "success"
    },
    "merchantInfo": {
      "MerchantID": "936005031260000068",
      "MerchantName": "Merchant Name",
      "NMID": "ID1026497176242",
      "City": "TANGERANG"
    }
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
      "amount must be between Rp 100.000 and Rp 5.000.000"
    ]
  }
}
```

</TabItem>

<TabItem value="unauthorized">

```json
{
  "success": false,
  "code": "4010001",
  "message": "Unauthenticated"
}
```

</TabItem>

</Tabs>

### Response Fields

| Field | Type | Description |
|---|---|---|
| `code` | number or string | Service response code (often numeric on success or validation errors; may be a string on some auth errors) |
| `message` | string | Human-readable status message |
| `success` | boolean | Optional; may appear on error payloads (for example `false` when unauthenticated) |
| `data` | object | Present on successful create; contains the QRIS transaction and display fields |
| `data.trxId` | string | System-generated QRIS transaction identifier |
| `data.trxReference` | string | Merchant reference submitted in the request |
| `data.merchantId` | string | Merchant identifier on the platform |
| `data.amount` | number | Gross amount charged (includes customer-paid fee when `feeType` is `CUSTOMER`) |
| `data.netAmount` | number | Net settlement amount after fees |
| `data.fee` | number | Applied transaction fee amount |
| `data.feeType` | string | Fee assignment policy (`CUSTOMER` or `SELLER`) |
| `data.currency` | string | Currency code (for example `IDR`) |
| `data.status` | string | Processing state (for example `pending` after create) |
| `data.paymentChannel` | string | Channel identifier (for example `QRIS`) |
| `data.expiredAt` | string | QRIS validity end time (ISO 8601) |
| `data.payload` | string | EMV QR string for rendering or scanning |
| `data.imageUrl` | string | URL to a hosted QR image for this transaction |
| `data.imageBase64` | string | Base64-encoded QR image (PNG) |
| `data.provider` | object | Acquirer/provider metadata for the issued QR |
| `data.provider.name` | string | Provider display name |
| `data.provider.referenceId` | string | Provider-side reference (often matches `trxId`) |
| `data.provider.status` | string | Provider operation outcome for QR issuance |
| `data.merchantInfo` | object | Merchant identity on the QR payload (field casing as returned by the API) |
| `data.merchantInfo.MerchantID` | string | Merchant identifier on the QR network |
| `data.merchantInfo.MerchantName` | string | Merchant display name |
| `data.merchantInfo.NMID` | string | National Merchant ID |
| `data.merchantInfo.City` | string | Merchant city |
| `errors` | object | Present on validation failures; field names map to arrays of error messages |

## QRIS status lifecycle

After a successful create, `data.status` is usually **`pending`**: the QR is valid until `expiredAt` and the payer has not finished checkout yet. Poll [Check Transaction Status](./transactions/check-status) or consume [webhooks](./webhooks-v2) until the transaction reaches a **terminal** state, then stop polling and finalize your order.

![QRIS status lifecycle: pending through processing to completed, or failed then refunded](/img/qris.svg)

### Common `data.status` values (QRIS)

| Status | Meaning |
|--------|--------|
| `pending` | Awaiting customer payment; QR is still valid before `expiredAt`. |
| `paid` | Payment confirmed (payin success; terminology may vary by integration). |
| `completed` | Sometimes used as the success terminal alongside or instead of `paid` (for example in notifications). |
| `expired` | Customer did not pay before `expiredAt`. |
| `failed` | Payment attempt did not complete successfully. |

## Security and Reliability Notes

- Generate truly unique `trxReference` values to prevent duplicate transactions.
- Keep token and API key in secure server-side secret storage.
- Use HTTPS for non-local environments.
- Set an internal timeout for pending QRIS and handle expiration gracefully.
