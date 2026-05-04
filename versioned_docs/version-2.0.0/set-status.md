---
id: set-status-v2
title: Payment Status Management
sidebar_position: 10
---

## Payment Status Management

> ⚠️ **Sandbox Only**  
> This feature is only available in sandbox/testing environments for development and testing purposes.

**Access the payment status management interface** via this [endpoint](https://sandbox.ilonapay.com/payment/set-status).

![Payment Status Management](/img/set-status-payment.png)

### Available payment statuses

Statuses below can appear on the sandbox tool, in [webhooks](./webhooks-v2) payloads, and in `data.status` from **[Check Transaction Status](./transactions/check-status)**. Exact values depend on channel and flow.

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

Withdrawal-specific processing states (`awaiting_*`) are summarized in **[Create Withdrawal](./withdraw#available-withdraw-status)** alongside a payout-focused lifecycle diagram.

---

## Check transaction status (API)

In **API v2**, programmatic status lookup uses **`POST /api/v2/transactions`** with **`Authorization: Bearer {token}`** and **`X-API-KEY`**. You send JSON with `value` (for example your `trxId`) and **`Type`** set to **`TRX_ID`**. The response uses `code`, `message`, and `data` (including `data.status` and channel fields such as `paymentChannel`, `expiredAt`, or payout details).

Use the dedicated guide for full request and response schemas, error codes, and polling guidance: **[Check Transaction Status](./transactions/check-status)**.

For push-based updates instead of polling, configure **[Webhooks](./webhooks-v2)**.
