---
id: virtual-account-create
slug: /virtual-account-create
title: Buat Virtual Account
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Buat transaksi pembayaran Virtual Account (VA) untuk penagihan domestik Indonesia.

**Endpoint:**  
`POST /api/v2/virtual-account/create`

## Ringkasan

Gunakan endpoint ini untuk menghasilkan instruksi pembayaran VA dengan tipe channel pembayaran yang dipilih (misalnya `BTNVA`).

Alur umum:
1. Pilih `paymentType` berdasarkan channel bank yang diaktifkan.
2. Kirim `amount` transaksi dari service backend Anda.
3. Tampilkan detail VA yang dikembalikan kepada pembayar.
4. Lakukan rekonsiliasi status pembayaran melalui proses monitoring transaksi Anda.

## Detail Endpoint

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `api/v2/virtual-account/create` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Currency | `IDR` |

## Request

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Content-Type` | `application/json` | ✅ | Format payload request |
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan |
| `X-API-KEY` | `{apiKey}` | ✅ | Kredensial API key |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token |

### Request Body

| Parameter | Type | Required | Description |
|---|---|---|---|
| `trxReference`             | string | ✅       | Referensi unik di sisi merchant untuk idempotensi dan tracking |
| `paymentType` | string | ✅ | Kode channel VA (misalnya `BTNVA`) |
| `amount` | number | ✅ | Jumlah pembayaran dalam IDR |
| `feeType` | Required| | allowed values: `CUSTOMER`, `SELLER` |

:::note Tanggung Jawab Biaya
Jika `feeType` adalah `SELLER`, biaya layanan ditanggung merchant/penjual.  
Jika `feeType` adalah `CUSTOMER`, biaya layanan ditanggung pelanggan.
:::

Nilai `paymentType` yang didukung:
`SinarmasVA`, `MaybankVA`, `DanamonVA`, `BNCVA`, `BCAVA`, `INAVA`, `BNIVA`, `PermataVA`, `MuamalatVA`, `BSIVA`, `BRIVA`, `MandiriVA`, `CIMBVA`, `NobuVA`, `KaltimtaraVA`, `BTNVA`

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `paymentType` | Required, must be a supported VA channel code |
| `amount` | Required, integer, greater than zero |

### Contoh Kode

<Tabs groupId="virtual-account-create-code" defaultValue="curl" values={[
  { label: 'cURL', value: 'curl' },
]}>

<TabItem value="curl">

```bash
curl --location '/api/v2/virtual-account/create' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
  "trxReference": "79ca7508-d32a-4d06-ad91-d3123c65fddd",
  "paymentType": "BTNVA",
  "amount": 10000,
  "feeType": "SELLER"
}'
```

</TabItem>

</Tabs>

## Response

### Responses

<Tabs
  defaultValue="success"
  values={[
    {label: 'Success — 201 Created', value: 'success'},
    {label: 'Validation Error — 422', value: 'validation'},
    {label: 'Unauthorized — 401', value: 'unauthorized'},
  ]}
>

<TabItem value="success">

```json
{
  "code": 2000005,
  "message": "success",
  "data": {
    "trxId": "TRX-VA-20260429-H8P2XK9Q1N",
    "trxReference": "3f5b7f60-8c95-428f-9680-65d3bc5f9f31",
    "externalId": "VA1778307371448d0450",
    "vaNumber": "1778307371448d0450",
    "amount": 10000,
    "netAmount": 9800,
    "fee": 200,
    "feeType": "SELLER",
    "currency": "IDR",
    "paymentChannel": "VIRTUAL_ACCOUNT",
    "status": "pending",
    "vaNumber": "1234567890123456",
    "paymentType": "BTNVA",
    "expiredAt": "2026-04-29T23:59:59.000000Z"
  }
}
```

</TabItem>

<TabItem value="validation">

```json
{
  "code": 4220211,
  "message": "The given data was invalid.",
  "errors": {
    "amount": [
      "amount must be greater than 0"
    ]
  }
}
```

</TabItem>

<TabItem value="unauthorized">

```json
{
  "code": 4010001,
  "message": "Unauthenticated"
}
```

</TabItem>

</Tabs>

### Field Respons

| Field | Type | Description |
|---|---|---|
| `code` | number | Kode respons layanan |
| `message` | string | Pesan respons yang mudah dibaca |
| `data` | object | Ada pada sukses; payload transaksi VA |
| `data.trxId` | string | Identifier transaksi VA yang dibuat sistem |
| `data.trxReference` | string | Referensi merchant/sistem untuk rekonsiliasi |
| `data.amount` | number | Jumlah penagihan yang diterima |
| `data.netAmount` | number | Jumlah bersih setelah fee |
| `data.fee` | number | Fee yang diterapkan |
| `data.feeType` | string | Kebijakan pembebanan biaya (misalnya `CUSTOMER` atau `SELLER`) |
| `data.currency` | string | Kode mata uang (misalnya `IDR`) |
| `data.paymentChannel` | string | Identifier channel (`VIRTUAL_ACCOUNT`) |
| `data.status` | string | Status proses (misalnya `pending` setelah create) |
| `data.vaNumber` | string | Nomor VA yang ditampilkan ke pembayar |
| `data.paymentType` | string | Kode channel VA (sesuai `paymentType` pada request bila berlaku) |
| `data.expiredAt` | string | Batas waktu transfer pembayar (ISO 8601) |
| `errors` | object | Ada pada kegagalan validasi; nama field memetakan array pesan error |

## Siklus status Virtual Account

Setelah create berhasil, `data.status` biasanya **`pending`**: pembayar harus transfer ke VA yang diterbitkan sebelum `expiredAt`. Lakukan polling [Check Transaction Status](./transactions/check-status) atau konsumsi [webhooks](./webhooks-v2) sampai transaksi mencapai status **terminal**, lalu hentikan polling dan lakukan rekonsiliasi order Anda.

![Siklus status VA: pending melalui pemrosesan ke completed, atau failed lalu refunded](/img/va.svg)

### Nilai `data.status` yang umum (VA)

| Status | Arti |
|--------|--------|
| `pending` | Menunggu transfer bank ke VA; valid sampai `expiredAt`. |
| `completed` | Kadang dipakai sebagai status terminal sukses bersamaan atau menggantikan `paid` (misalnya pada notifikasi). |
| `expired` | Tidak ada pembayaran yang memenuhi syarat sebelum `expiredAt`. |
| `failed` | Penagihan tidak selesai dengan sukses. |

## Catatan Keamanan dan Keandalan

- Simpan `X-API-KEY` dan bearer token pada penyimpanan server-side yang aman.
- Gunakan HTTPS untuk environment non-lokal.
- Terapkan idempotensi pada service layer Anda saat melakukan retry request create.
- Tangani status pending dan expired dalam logika lifecycle pembayaran Anda.
