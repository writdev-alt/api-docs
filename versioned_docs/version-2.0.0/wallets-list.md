---
id: wallets-list-v2
slug: /wallets/list-v2
title: Wallets List
sidebar_position: 4
---

## Wallets List

Retrieve all wallets owned by the authenticated merchant account.

**Endpoint:**  
`GET /api/v2/wallets`

## Overview

This endpoint returns the complete wallet portfolio for the authenticated merchant, including balances, hold balances, currency, and status metadata.

Use this data to power account dashboards, balance checks, and transaction pre-validation logic.

## Endpoint Details

| Item | Value |
|------|-------|
| HTTP Method | `GET` |
| Endpoint | `/api/v2/wallets` |
| Auth Required | Yes (`Bearer` token) |
| Content Type | `application/json` |

### Request Headers

| Header | Value | Required | Description |
|--------|-------|:--------:|-------------|
| `Authorization` | `Bearer {token}` | ✅ | Access token from login endpoint |
| `Accept` | `application/json` | ✅ | Expected response format |

---

## Request Specification

This endpoint does not require a request body.

## Example cURL Request

```bash
curl --location 'http://localhost:8080/api/v2/wallets' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer token'
```

## Response Specification

### Success Response (`200 OK`)

```json
{
  "code": 2000006,
  "message": "Wallets retrieved successfully",
  "data": [
    {
      "walletId": "415664176",
      "currencyCode": "USD",
      "balance": 0,
      "holdBalance": 0,
      "status": true,
      "createdAt": "2025-09-12T12:36:53Z",
      "updatedAt": "2025-09-12T12:36:53Z"
    },
    {
      "walletId": "798055915",
      "currencyCode": "IDR",
      "balance": 866000,
      "holdBalance": 0,
      "status": true,
      "createdAt": "2025-09-12T11:55:49Z",
      "updatedAt": "2026-02-27T06:14:29Z"
    }
  ]
}
```

### Error Responses

#### `401 Unauthorized`

```json
{
  "code": 4010122,
  "message": "Invalid token"
}
```

#### `500 Internal Server Error`

```json
{
  "code": 5001655,
  "message": "Internal server error"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Composite application response code |
| `message` | string | Human-readable response message |
| `data` | array | List of merchant wallets |
| `data[].walletId` | string | Unique wallet identifier |
| `data[].currencyCode` | string | Wallet currency code, for example `USD` or `IDR` |
| `data[].balance` | number | Current available balance |
| `data[].holdBalance` | number | Amount currently on hold |
| `data[].status` | boolean | Wallet status (`true` means active) |
| `data[].createdAt` | string | Wallet creation timestamp (ISO-8601 UTC) |
| `data[].updatedAt` | string | Last wallet update timestamp (ISO-8601 UTC) |

## Notes

- Use `balance` and `holdBalance` together when calculating spendable funds.
- Do not assume a single wallet; merchants can have multiple currencies.
- Store monetary values using precise decimal-safe handling in your application layer.
