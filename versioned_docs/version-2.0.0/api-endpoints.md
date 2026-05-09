---
id: api-endpoints-v2
slug: /api-endpoints-v2
title: API Endpoints
description: Indexed view of API v2 endpoints by domain with standard request requirements.
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## API Endpoints

Use the following endpoint index to navigate API v2 operations.

:::tip Use This Page as an Index
Each linked endpoint page follows a consistent structure: overview, endpoint details, request, response, and reliability notes.
:::

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

## Endpoint Index

<Tabs defaultValue="auth" values={[
  {label: 'Authentication', value: 'auth'},
  {label: 'Pay-in', value: 'payin'},
  {label: 'Payout', value: 'payout'},
  {label: 'Monitoring', value: 'monitoring'},
  {label: 'Reference Data', value: 'reference'},
]}>
<TabItem value="auth">

- [Login](./login-v2)
- [Refresh Token](./refresh-v2)

</TabItem>
<TabItem value="payin">

- [Create QRIS](./qris-create)
- [Create Virtual Account](./virtual-account-create)

</TabItem>
<TabItem value="payout">

- [Create Withdrawal](./withdraw)
- [Create Withdrawal Account](./withdraw-account)

</TabItem>
<TabItem value="monitoring">

- [Check Transaction Status](./transactions/check-status)
- [Webhooks](./webhooks-v2)

</TabItem>
<TabItem value="reference">

- [Banks List](./banks/list-v2)
- [Wallets List](./wallets/list-v2)
- [Response Code](./response-code-v2)

</TabItem>
</Tabs>

:::warning Protected Endpoints
Most endpoints require both `Authorization: Bearer {token}` and `X-API-KEY`. Always confirm required headers on each endpoint page before going live.
:::
