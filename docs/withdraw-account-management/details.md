---
id: withdraw-account-management-details
slug: /withdraw-account-management/details
title: Get Withdrawal Account Details
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Retrieve details of a specific withdrawal account by ID.

**GET** `/api/v1/withdraw-accounts/{id}`

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

<Tabs groupId="withdraw-details-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
]}>

<TabItem value="success">

```json
{
  "data": {
    "id": 1,
    "user_id": 123,
    "withdraw_method_id": 1,
    "name": "Bank Transfer",
    "category": "Customer",
    "account_number": "1234567890",
    "account_holder_name": "John Doe",
    "bank_code": "1",
    "bank_name": "BANK RAKYAT INDONESIA",
    "branch_name": "Jakarta Pusat",
    "country": "ID",
    "account_type": "savings",
    "additional_info": "Primary account",
    "created_at": "2025-01-15T10:30:00.000000Z",
    "updated_at": "2025-01-15T10:30:00.000000Z",
    "withdraw_method": {
      "id": 1,
      "name": "Bank Transfer",
      "currency": "IDR"
    }
  }
}
```

</TabItem>

</Tabs>

