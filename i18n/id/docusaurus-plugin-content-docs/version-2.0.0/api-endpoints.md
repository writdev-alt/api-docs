---
id: api-endpoints-v2
slug: /api-endpoints-v2
title: Endpoint API
description: Daftar indeks endpoint API v2 per domain beserta kebutuhan request standar.
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Endpoint API

Gunakan indeks endpoint berikut untuk menavigasi operasi API v2.

:::tip Gunakan Halaman Ini sebagai Indeks
Setiap halaman endpoint yang ditautkan mengikuti struktur yang konsisten: ringkasan, detail endpoint, request, response, dan catatan keandalan.
:::

## Standar Format Endpoint

Semua endpoint dalam dokumentasi ini mengikuti struktur berikut:

### Request

- Method: `GET` / `POST` / `PUT` / `DELETE`
- URL: path endpoint relatif terhadap base URL yang dipilih
- Headers:
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
  - `X-API-KEY: {apiKey}`
- Parameter Body (jika ada):

| Field | Type | Required | Description |
|---|---|---|---|
| amount | number | yes | Jumlah transaksi |
| reference | string | yes | Referensi transaksi unik |

## Indeks Endpoint

<Tabs defaultValue="auth" values={[
  {label: 'Autentikasi', value: 'auth'},
  {label: 'Pay-in', value: 'payin'},
  {label: 'Payout', value: 'payout'},
  {label: 'Monitoring', value: 'monitoring'},
  {label: 'Data Referensi', value: 'reference'},
]}>
<TabItem value="auth">

- [Login](/docs/auth/login-v2)
- [Refresh Token](/docs/auth/refresh-v2)

</TabItem>
<TabItem value="payin">

- [Create QRIS](/docs/qris-create)
- [Create Virtual Account](/docs/virtual-account-create)

</TabItem>
<TabItem value="payout">

- [Create Withdrawal](/docs/withdraw)
- [Create Withdrawal Account](/docs/withdraw-account)

</TabItem>
<TabItem value="monitoring">

- [Check Transaction Status](/docs/transactions/check-status)
- [Webhooks](/docs/webhooks-v2)

</TabItem>
<TabItem value="reference">

- [Banks List](/docs/banks/list-v2)
- [Wallets List](/docs/wallets/list-v2)
- [Response Code](/docs/response-code-v2)

</TabItem>
</Tabs>

:::warning Endpoint yang Dilindungi
Sebagian besar endpoint memerlukan `Authorization: Bearer {token}` dan `X-API-KEY`. Selalu cek header yang dibutuhkan pada setiap halaman endpoint sebelum go-live.
:::
