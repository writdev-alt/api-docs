---
id: set-status-v2
slug: /set-status-v2
title: Set transaction status (sandbox)
description: Sandbox-only API to simulate transaction status transitions for testing. Production is not supported.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Use this flow in **sandbox only** to force or simulate a transaction status (for example moving a test QRIS transaction to `completed`) without waiting for real bank or network settlement.

:::warning Sandbox only
The **Set transaction status** API (`POST /api/v2/transaction-set-status`) is available **only** on the sandbox base URL. It is **not** exposed on production. Do not call this endpoint in live environments.
:::

## Set transaction status (API)

### Endpoint

| Item | Value (sandbox) |
|---|---|
| HTTP method | `POST` |
| URL | `https://sandbox.ilonapay.com/api/v2/transaction-set-status` |
| Auth | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |

### Request headers

| Header | Value | Required |
|---|---|---|
| `Accept` | `application/json` | Yes |
| `Content-Type` | `application/json` | Yes |
| `X-API-KEY` | `{apiKey}` | Yes |
| `Authorization` | `Bearer {token}` | Yes |

### Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `trxId` | string | Yes | Transaction ID to update (for example the `trxId` returned when creating QRIS, VA, or other flows) |
| `status` | string | Yes | Target status value (see [Available status values](#available-status-values)) |

### Code example

<Tabs groupId="set-status-examples" defaultValue="curl" values={[
  { label: 'cURL', value: 'curl' },
]}>

<TabItem value="curl">

```bash
curl --location 'https://sandbox.ilonapay.com/api/v2/transaction-set-status' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Authorization: Bearer {token}' \
  --data '{
  "trxId": "TRXQRIS3B2XHYDVK7OMRSSSSI",
  "status": "completed"
}'
```

</TabItem>

</Tabs>

:::tip Testing flow
Create a transaction in sandbox (for example [Create QRIS](/docs/qris-create)), copy `data.trxId` from the response, then call this endpoint with the desired `status` to exercise webhooks or [Check Transaction Status](/docs/transactions/check-status) polling.
:::

### Response

#### Success (`200 OK`)

```json
{
  "code": 2000203,
  "message": "Transaction status updated",
  "data": {
    "status": "completed",
    "trxId": "TRXQRIS3B2XHYDVK7OMRSSSSI",
    "updatedAt": "2026-05-09T12:26:16Z"
  }
}
```

| Field | Type | Description |
|---|---|---|
| `code` | number | Application response code |
| `message` | string | Result message |
| `data.status` | string | Status after the update (matches the `status` you sent when accepted) |
| `data.trxId` | string | Transaction identifier |
| `data.updatedAt` | string | Time the status was updated (ISO 8601) |

### Available status values

Statuses below can appear from this sandbox API, in [webhooks](/docs/webhooks-v2) payloads, and in `data.status` from **[Check Transaction Status](/docs/transactions/check-status)**. Exact values depend on channel and flow.

| Status code | Category | Description |
|-------------|----------|-------------|
| `pending` | `receive_payment`, `withdraw` | Awaiting payer action or initial processing |
| `paid` | `receive_payment` | Pay-in successfully settled (often used in polling responses) |
| `awaiting_fi_process` | `withdraw` | Awaiting processing by the financial institution |
| `awaiting_pg_process` | `withdraw` | Queued at the payment gateway |
| `awaiting_user_action` | `withdraw` | Merchant or customer action required |
| `awaiting_admin_approval` | `withdraw` | Waiting for administrator approval |
| `completed` | `receive_payment`, `withdraw` | Flow successfully finalized (also common in webhook payloads for pay-ins) |
| `canceled` | `receive_payment`, `withdraw` | Canceled by user or system |
| `failed` | `receive_payment`, `withdraw` | Terminated with an error |
| `refunded` | `withdraw` | Funds returned after completion or reversal |
| `expired` | `receive_payment`, `withdraw` | Pay-in session or validity window elapsed |

Withdrawal-specific processing states (`awaiting_*`) are summarized in **[Create Withdrawal](/docs/withdraw#available-withdraw-status)** alongside a payout-focused lifecycle diagram.

---

## Check transaction status (read)

In **API v2**, programmatic status **lookup** (not mutation) uses **`POST /api/v2/transactions`** with **`Authorization: Bearer {token}`** and **`X-API-KEY`**. Send JSON with `value` (for example your `trxId`) and **`Type`** set to **`TRX_ID`**.

Use the full schema and polling guidance: **[Check Transaction Status](/docs/transactions/check-status)**.

For push-based updates instead of polling, configure **[Webhooks](/docs/webhooks-v2)**.
