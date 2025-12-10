---
id: withdraw-account-management-info
slug: /withdraw-account-management/info
title: Get Account Information
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Retrieve withdrawal method details and limits associated with a withdrawal account.

**GET** `/api/v1/withdraw-accounts/{id}/info`

## Path Parameters

| Parameter | Type    | Required | Description                    |
|-----------|---------|----------|--------------------------------|
| `id`      | integer | ✅       | The withdrawal account ID.     |

## Request Headers

| Header           | Value               | Required | Description                      |
|------------------|---------------------|----------|----------------------------------|
| `Accept`         | `application/json`  | ✅       | Specifies the response format.   |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅       | Your Merchant ID.                |
| `X-API-KEY`      | `{api_key}`         | ✅       | Your API Key.                    |

## Responses

<Tabs groupId="withdraw-info-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
    { label: 'Not Found — 404', value: 'not_found' },
]}>

<TabItem value="success">

```json
{
  "success": true,
  "code": "2000301",
  "message": "Account information retrieved successfully",
  "data": {
    "min_limit": 10000,
    "max_limit": 100000000,
    "charge": 2500,
    "charge_type": "fixed",
    "currency": "IDR",
    "processing_time": "1-3 business days",
    "conversion_rate": 1
  }
}
```

</TabItem>

<TabItem value="not_found">

```json
{
  "success": false,
  "code": "4040003",
  "message": "Withdrawal account not found"
}
```

</TabItem>

</Tabs>

> **ℹ️ Note**  
> This endpoint provides important information about withdrawal limits, charges, and processing times for the withdrawal method associated with the account. Use this data to display relevant details to your users before they initiate withdrawals.


