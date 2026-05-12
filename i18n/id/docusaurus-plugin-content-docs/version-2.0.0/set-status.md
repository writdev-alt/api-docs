---
id: set-status-v2
slug: /set-status-v2
title: Atur status transaksi (sandbox)
description: API khusus sandbox untuk mensimulasikan perpindahan status transaksi saat testing. Tidak didukung di production.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Ringkasan

Gunakan alur ini **hanya di sandbox** untuk memaksa atau mensimulasikan status transaksi (misalnya mengubah transaksi QRIS uji menjadi `completed`) tanpa menunggu settlement bank/jaringan yang sebenarnya.

:::warning Hanya sandbox
API **Set transaction status** (`POST /api/v2/transaction-set-status`) tersedia **hanya** pada base URL sandbox. Endpoint ini **tidak** tersedia di production. Jangan panggil endpoint ini di environment live.
:::

## Set transaction status (API)

### Endpoint

| Item | Value (sandbox) |
|---|---|
| HTTP method | `POST` |
| URL | `https://sandbox.ilonapay.com/api/v2/transaction-set-status` |
| Auth | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |

### Request headers

| Header | Value | Required |
|---|---|---|
| `Accept` | `application/json` | Yes |
| `Content-Type` | `application/json` | Yes |
| `X-API-KEY` | `{apiKey}` | Yes |
| `Authorization` | `Bearer {token}` | Yes |

### Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `trxId` | string | Yes | Transaction ID yang akan diupdate (misalnya `trxId` yang dikembalikan saat membuat QRIS, VA, atau alur lainnya) |
| `status` | string | Yes | Nilai status tujuan (lihat [Available status values](#available-status-values)) |

### Contoh kode

<Tabs groupId="set-status-examples" defaultValue="curl" values={[
  { label: 'cURL', value: 'curl' },
]}>

<TabItem value="curl">

```bash
curl --location 'https://sandbox.ilonapay.com/api/v2/transaction-set-status' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Authorization: Bearer {token}' \
  --data '{
  "trxId": "TRXQRIS3B2XHYDVK7OMRSSSSI",
  "status": "completed"
}'
```

</TabItem>

</Tabs>

:::tip Alur testing
Buat transaksi di sandbox (misalnya [Create QRIS](/docs/qris-create)), salin `data.trxId` dari respons, lalu panggil endpoint ini dengan `status` yang diinginkan untuk menguji webhooks atau polling [Check Transaction Status](/docs/transactions/check-status).
:::

### Response

#### Berhasil (`200 OK`)

```json
{
  "code": 2000203,
  "message": "Transaction status updated",
  "data": {
    "status": "completed",
    "trxId": "TRXQRIS3B2XHYDVK7OMRSSSSI",
    "updatedAt": "2026-05-09T12:26:16Z"
  }
}
```

| Field | Type | Description |
|---|---|---|
| `code` | number | Kode respons aplikasi |
| `message` | string | Pesan hasil |
| `data.status` | string | Status setelah update (sesuai `status` yang Anda kirim jika diterima) |
| `data.trxId` | string | Identifier transaksi |
| `data.updatedAt` | string | Waktu status diupdate (ISO 8601) |

### Available status values

Status di bawah dapat muncul dari API sandbox ini, pada payload [webhooks](/docs/webhooks-v2), dan pada `data.status` dari **[Check Transaction Status](/docs/transactions/check-status)**. Nilai yang tepat bergantung pada channel dan flow.

| Status code | Category | Description |
|-------------|----------|-------------|
| `pending` | `receive_payment`, `withdraw` | Menunggu aksi pembayar atau pemrosesan awal |
| `awaiting_fi_process` | `withdraw` | Menunggu pemrosesan oleh institusi keuangan |
| `awaiting_pg_process` | `withdraw` | Masuk antrean di payment gateway |
| `awaiting_user_action` | `withdraw` | Aksi merchant atau customer diperlukan |
| `awaiting_admin_approval` | `withdraw` | Menunggu persetujuan administrator |
| `completed` | `receive_payment`, `withdraw` | Alur selesai dengan sukses (juga umum di payload webhook untuk pay-in) |
| `canceled` | `receive_payment`, `withdraw` | Dibatalkan oleh user atau sistem |
| `failed` | `receive_payment`, `withdraw` | Berakhir dengan error |
| `refunded` | `withdraw` | Dana dikembalikan setelah selesai atau pembalikan |
| `expired` | `receive_payment`, `withdraw` | Sesi pay-in atau masa berlaku habis |

Withdrawal-specific processing states (`awaiting_*`) dirangkum di **[Create Withdrawal](/docs/withdraw#available-withdraw-status)** beserta diagram lifecycle yang berfokus pada payout.

---

## Check transaction status (read)

Di **API v2**, lookup status secara programatis (bukan mengubah status) menggunakan **`POST /api/v2/transactions`** dengan **`Authorization: Bearer {token}`** dan **`X-API-KEY`**. Kirim JSON dengan `value` (misalnya `trxId`) dan set **`Type`** ke **`TRX_ID`**.

Gunakan skema lengkap dan panduan polling: **[Check Transaction Status](/docs/transactions/check-status)**.

Untuk pembaruan push (tanpa polling), konfigurasi **[Webhooks](/docs/webhooks-v2)**.
