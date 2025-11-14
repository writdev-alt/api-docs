---
id: withdraw-account-management-details
slug: /withdraw-account-management/details
title: Detail Akun Penarikan
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ambil detail akun penarikan tertentu berdasarkan ID.

**GET** `/api/v1/withdraw-accounts/{id}`

## Path Parameters

| Parameter | Tipe    | Wajib | Deskripsi                    |
|-----------|---------|-------|------------------------------|
| `id`      | integer | ✅    | ID akun penarikan.           |

## Header Permintaan

| Header           | Value               | Wajib | Deskripsi                      |
|------------------|---------------------|-------|--------------------------------|
| `Accept`         | `application/json`  | ✅    | Menentukan format respons.     |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅    | ID Merchant Anda.              |
| `X-API-KEY`      | `{api_key}`         | ✅    | API Key Anda.                  |

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

