---
id: api-endpoints-v2
title: API Endpoints
sidebar_position: 7
---

## API Endpoints

Use the following endpoint index to navigate API v2 operations.

## Endpoint Format Standard

All endpoints in this documentation follow this structure:

### Request

- Method: `GET` / `POST` / `PUT` / `DELETE`
- URL: endpoint path relative to selected base URL
- Headers:
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
  - `X-API-KEY: {apiKey}`
- Body Parameters (if applicable):

| Field | Type | Required | Description |
|---|---|---|---|
| amount | number | yes | Transaction amount |
| reference | string | yes | Unique transaction reference |

## Transaction Endpoints

- [Create QRIS](./qris-create)
- [Create Virtual Account](./virtual-account-create)
- [Create Withdrawal](./withdraw)
- [Check Transaction Status](./transactions/check-status)

## Master Data Endpoints

- [Banks List](./banks/list-v2)
- [Wallets List](./wallets/list-v2)
- [Create Withdrawal Account](./withdraw-account)
