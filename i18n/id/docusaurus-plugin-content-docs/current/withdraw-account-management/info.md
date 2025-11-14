---
id: withdraw-account-management-info
slug: /withdraw-account-management/info
title: Informasi Akun
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ambil detail metode penarikan dan batasan yang terkait dengan akun penarikan.

**GET** `/api/v1/withdraw-accounts/{id}/info`

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

<Tabs groupId="withdraw-info-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
]}>

<TabItem value="success">

```json
{
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

</Tabs>

> **ℹ️ Catatan**  
> Endpoint ini menyediakan informasi penting tentang batasan penarikan, biaya, dan waktu pemrosesan untuk metode penarikan yang terkait dengan akun. Gunakan data ini untuk menampilkan detail yang relevan kepada pengguna Anda sebelum mereka memulai penarikan.

