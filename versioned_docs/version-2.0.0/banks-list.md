---
id: banks-list-v2
slug: /banks/list-v2
title: Banks List
sidebar_position: 3
---

## Banks List

Retrieve the list of supported banks for transfer-based operations such as payouts and bank account routing.

**Endpoint:**  
`GET /api/v2/banks`

## Overview

Use this endpoint to fetch valid bank metadata (`bankCode`, `bankName`, `type`) before creating bank-related transactions.  
This helps prevent invalid routing codes and keeps client-side bank selectors synchronized with backend data.

## Endpoint Details

| Item | Value |
|------|-------|
| HTTP Method | `GET` |
| Endpoint | `/api/v2/banks` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |

### Request Headers

| Header | Value | Required | Description |
|--------|-------|:--------:|-------------|
| `Accept` | `application/json` | ✅ | Expected response format |
| `Content-Type` | `application/json` | ✅ | Request content type |
| `Authorization` | `Bearer {token}` | ✅ | Access token from login endpoint |
| `X-API-KEY` | `{apiKey}` | ✅ | API key credential. |

---

## Request

This endpoint does not require request body parameters.

## Example cURL Request

```bash
curl --location '/api/v2/banks' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'X-API-KEY: {apiKey}' \
--header 'Authorization: Bearer token'
```

## Response

### Success Response (`200 OK`)

```json
{
  "code": 2002006,
  "message": "Banks retrieved successfully",
  "data": [
    {
      "bankCode": "1",
      "bankName": "BANK RAKYAT INDONESIA",
      "type": "BANK_TRANSFER"
    },
    {
      "bankCode": "10",
      "bankName": "BANK UOB INDONESIA",
      "type": "BANK_TRANSFER"
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
  "code": 5002055,
  "message": "Internal server error"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Composite application response code |
| `message` | string | Human-readable response message |
| `data` | array | List of available banks |
| `data[].bankCode` | string | Bank code used in transfer-related requests |
| `data[].bankName` | string | Display name of the bank |
| `data[].type` | string | Category, for example `BANK_TRANSFER` |

## Notes

- Cache this list with periodic refresh to reduce repeated calls.
- Always validate selected `bankCode` against the latest API response.
- Handle unauthorized responses by refreshing/re-authenticating tokens.
