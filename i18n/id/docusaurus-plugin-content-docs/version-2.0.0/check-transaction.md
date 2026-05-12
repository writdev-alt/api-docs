---
id: check-transaction-v2
slug: /transactions/check-status
title: Cek Status Transaksi
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Cek Status Transaksi

Ambil status terbaru dan detail transaksi menggunakan transaction ID.

**Endpoint:**  
`POST /api/v2/transactions`

## Ringkasan

Gunakan endpoint ini untuk memantau progres transaksi setelah dibuat, baik untuk alur pay-in maupun payout (misalnya QRIS dan transfer bank).

Alur umum:
1. Simpan `trxId` yang dikembalikan setelah membuat transaksi.
2. Panggil endpoint ini dari layanan backend dengan body JSON (`value` + `Type`) untuk pengecekan status.
3. Perbarui state order/payout Anda berdasarkan `data.status`.

## Detail Endpoint

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/transactions` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Supported Flows | Payin and Payout |

## Request

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `value` | string | ✅ | Identifier transaksi yang dicari (misalnya `trxId` yang dikembalikan oleh endpoint pembuatan transaksi) |
| `Type` | string | ✅ | Tipe pencarian. Gunakan `TRX_ID` jika `value` adalah transaction ID. |

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan |
| `Content-Type` | `application/json` | ✅ | Format payload request |
| `X-API-KEY` | `{apiKey}` | ✅ | Kredensial API key |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token |

### Contoh Kode

<Tabs
  defaultValue="payin"
  values={[
    {label: 'Payin (QRIS) — cURL', value: 'payin'},
    {label: 'Payout (Withdraw) — cURL', value: 'payout'},
  ]}
>

<TabItem value="payin">

```bash
curl --location 'https://production.ilonapay.com/api/v2/transactions' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "value": "TRXQRIS1JGIWZ0PNNQ38KT2JL",
    "Type": "TRX_ID"
}'
```

</TabItem>

<TabItem value="payout">

```bash
curl --location 'https://production.ilonapay.com/api/v2/transactions' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "value": "TRX-WD-20260429-8X4K2P1",
    "Type": "TRX_ID"
}'
```

</TabItem>

</Tabs>

## Response

### Responses

<Tabs
  defaultValue="successQris"
  values={[
    {label: 'Success QRIS — 200 OK', value: 'successQris'},
    {label: 'Success VA — 200 OK', value: 'successVa'},
    {label: 'Success Payout — 200 OK', value: 'successPayout'},
    {label: 'Not Found — 404', value: 'notFound'},
    {label: 'Unauthorized — 401', value: 'unauthorized'},
  ]}
>

<TabItem value="successQris">

```json
{
  "code": 2000000,
  "message": "success retrieve transaction",
  "data": {
    "trxId": "TRX-QRIS3-20260428-X05UTV9DLWAR",
    "trxReference": "897b0605-b9fa-49e2-bae6-eaadf35f2da8",
    "rrn": "fb96da8d931c",
    "amount": 100000,
    "netAmount": 91000,
    "fee": 900,
    "feeType": "MERCHANT",
    "currency": "IDR",
    "paymentChannel": "QRIS",
    "status": "pending",
    "expiredAt": "2026-04-28T18:00:17.192335563Z",
    "merchantInfo": {
      "merchantId": "3",
      "merchantName": "AURALINK DIGITAL STALL 44",
      "nmid": "ID1026497176242",
      "city": "TANGERANG"
    }
  }
}
```

</TabItem>

<TabItem value="successVa">

```json
{
  "code": 2000000,
  "message": "success retrieve transaction",
  "data": {
    "trxId": "TRX-VA-20260429-H8P2XK9Q1N",
    "trxReference": "3f5b7f60-8c95-428f-9680-65d3bc5f9f31",
    "amount": 12500,
    "netAmount": 12500,
    "fee": 0,
    "feeType": "CUSTOMER",
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

<TabItem value="successPayout">

```json
{
  "code": 2000000,
  "message": "success retrieve transaction",
  "data": {
    "trxId": "TRX-WD-20260429-8X4K2P1",
    "trxReference": "97df4f2f-4e71-42aa-9fdb-845ecf1f0f57",
    "amount": 102000,
    "netAmount": 100000,
    "fee": 20000,
    "feeType": "MERCHANT",
    "currency": "IDR",
    "paymentChannel": "BANK_TRANSFER",
    "status": "completed",
    "bankCode": "002",
    "accountNumber": "1040000008446",
    "accountHolderName": "RAIDY WIJAYA",
    "processedAt": "2026-04-29T09:31:44.000000Z"
  }
}
```

</TabItem>

<TabItem value="notFound">

```json
{
  "code": 4040001,
  "message": "transaction not found"
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
| `data.trxId` | string | Identifier transaksi yang dibuat sistem |
| `data.trxReference` | string | Referensi transaksi merchant |
| `data.amount` | number | Jumlah transaksi bruto |
| `data.netAmount` | number | Nilai bersih setelah perhitungan fee |
| `data.fee` | number | Fee transaksi yang diterapkan |
| `data.feeType` | string | Kebijakan pembebanan fee (`CUSTOMER` atau `SELLER`) |
| `data.currency` | string | Kode mata uang (`IDR`) |
| `data.paymentChannel` | string | Channel pembayaran (misalnya `QRIS`, `BANK_TRANSFER`) |
| `data.status` | string | Status transaksi saat ini |
| `data.expiredAt` | string | Waktu kedaluwarsa transaksi QRIS/VA (ISO 8601) |
| `data.rrn` | string | Retrieval Reference Number dari jaringan pembayaran (respons QRIS) |
| `data.merchantInfo` | object | Detail identitas merchant pada transaksi QRIS |
| `data.merchantInfo.merchantId` | string | Identifier merchant |
| `data.merchantInfo.merchantName` | string | Nama merchant untuk ditampilkan |
| `data.merchantInfo.nmid` | string | National Merchant ID (NMID) |
| `data.merchantInfo.city` | string | Kota merchant |
| `data.vaNumber` | string | Nomor Virtual Account (respons VA) |
| `data.paymentType` | string | Tipe/kode pembayaran VA (misalnya `BTNVA`) |
| `data.bankCode` | string | Kode bank tujuan (respons payout) |
| `data.accountNumber` | string | Nomor rekening tujuan (respons payout) |
| `data.accountHolderName` | string | Nama pemilik rekening tujuan (respons payout) |
| `data.processedAt` | string | Timestamp penyelesaian proses (respons payout, ISO 8601) |

## Siklus Status (Panduan)

Transisi status yang umum:
- **Payin:** `pending` -> `completed` (jika dibayar) atau `expired`/`failed` (jika tidak dibayar)
- **Payout:** `pending` -> `completed` atau `failed` -> `refund` (jika gagal, jumlah biasanya dikembalikan ke saldo sumber)

## Catatan Operasional

- Gunakan interval polling yang wajar (misalnya setiap 15-30 detik) untuk mengurangi beban request yang tidak perlu.
- Hentikan polling ketika status mencapai state final (`paid`, `completed`, `failed`, atau `expired`).
- Lakukan rekonsiliasi server-side menggunakan `trxId` dan `trxReference`.
