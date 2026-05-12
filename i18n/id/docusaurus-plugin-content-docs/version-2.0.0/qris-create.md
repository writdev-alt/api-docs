---
id: qris-create-v2
slug: /qris-create
title: Buat QRIS
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Buat transaksi pembayaran QRIS dinamis untuk pembayaran domestik Indonesia.
Gunakan endpoint ini ketika sistem Anda perlu membuat QR code yang dapat dibayar untuk alur checkout atau pelunasan tagihan.

**Endpoint:**  
`POST /api/v2/qris/create`

## Ringkasan

Endpoint ini membuat permintaan pembayaran QRIS dan mengembalikan data transaksi yang dapat digunakan untuk menampilkan QR code kepada pelanggan.

Alur umum:
1. Buat `trxReference` yang unik di backend Anda.
2. Kirim jumlah transaksi dan kebijakan biaya (`CUSTOMER` atau `SELLER`).
3. Render payload/gambar QRIS yang dikembalikan pada UI checkout Anda.
4. Pantau status pembayaran secara asinkron sampai settlement final.

## Detail Endpoint

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/qris/create` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |
| Currency | `IDR` |

## Request

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Content-Type` | `application/json` | ✅ | Format payload request. |
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan. |
| `X-API-KEY` | `{apiKey}` | ✅ | Kredensial API key. |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token. |

### Request Body

| Parameter | Type | Required | Description |
|---|---|---|---|
| `amount` | number | ✅ | Jumlah pembayaran dalam IDR (integer, lebih besar dari 0). |
| `trxReference` | string | ✅ | Referensi unik dari merchant untuk idempotensi dan rekonsiliasi. |
| `feeType` | string | ✅ | Kebijakan pembebanan biaya: `CUSTOMER` atau `SELLER`. |
| `expire` | number | ❌ | Opsional. Lama waktu (dalam detik) QR tetap valid sebelum kedaluwarsa. Jika tidak diisi, sistem menerapkan durasi default 1 jam. |

:::note Tanggung Jawab Biaya
Jika `feeType` adalah `SELLER`, biaya layanan ditanggung merchant/penjual.  
Jika `feeType` adalah `CUSTOMER`, biaya layanan ditanggung pelanggan.
:::

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `amount` | Required, integer, minimum `1` |
| `trxReference` | Required, unique per transaction |
| `feeType` | Required, allowed values: `CUSTOMER`, `SELLER` |

### Contoh Kode

<Tabs groupId="qris-create-code" defaultValue="curl" values={[
  { label: 'cURL', value: 'curl' },
]}>

<TabItem value="curl">

```bash
curl --location '/api/v2/qris/create' \
  --header 'X-API-KEY: {apiKey}' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "amount": 1000,
    "trxReference": "d73c0f1a-993f-4968-815c-0daf9510ab23",
    "feeType": "CUSTOMER"
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
  "code": 2013001,
  "message": "success retrieve data QRIS",
  "data": {
    "trxId": "TRXQRIS3991PZZH3A7J5C6YE8",
    "trxReference": "897b0605-b9fa-49e2-bae6-eaadf35f2da8",
    "merchantId": "3",
    "amount": 100900,
    "netAmount": 100000,
    "fee": 900,
    "feeType": "CUSTOMER",
    "currency": "IDR",
    "status": "pending",
    "paymentChannel": "QRIS",
    "expiredAt": "2026-04-28T18:00:17.192335563Z",
    "payload": "00020101021226670016COM.....",
    "imageUrl": "https://sandbox.ilonapay.com/qris/view/TRXQRIS3991PZZH3A7J5C6YE8",
    "imageBase64": "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX.....",
    "provider": {
      "name": "Nobu",
      "referenceId": "TRXQRIS3991PZZH3A7J5C6YE8",
      "status": "success"
    },
    "merchantInfo": {
      "MerchantID": "936005031260000068",
      "MerchantName": "Merchant Name",
      "NMID": "ID1026497176242",
      "City": "TANGERANG"
    }
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
      "amount must be between Rp 100.000 and Rp 5.000.000"
    ]
  }
}
```

</TabItem>

<TabItem value="unauthorized">

```json
{
  "success": false,
  "code": "4010001",
  "message": "Unauthenticated"
}
```

</TabItem>

</Tabs>

### Field Respons

| Field | Type | Description |
|---|---|---|
| `code` | number or string | Kode respons layanan (sering berupa angka pada sukses/validasi; dapat berupa string pada sebagian error auth) |
| `message` | string | Pesan status yang mudah dibaca |
| `success` | boolean | Opsional; bisa muncul pada payload error (misalnya `false` ketika unauthenticated) |
| `data` | object | Ada pada create yang berhasil; berisi field transaksi QRIS dan field untuk ditampilkan |
| `data.trxId` | string | Identifier transaksi QRIS yang dibuat sistem |
| `data.trxReference` | string | Referensi merchant yang dikirim pada request |
| `data.merchantId` | string | Identifier merchant pada platform |
| `data.amount` | number | Gross amount (termasuk fee yang dibayar pelanggan bila `feeType` adalah `CUSTOMER`) |
| `data.netAmount` | number | Nilai settlement bersih setelah fee |
| `data.fee` | number | Fee transaksi yang diterapkan |
| `data.feeType` | string | Kebijakan pembebanan biaya (`CUSTOMER` atau `SELLER`) |
| `data.currency` | string | Kode mata uang (misalnya `IDR`) |
| `data.status` | string | Status proses (misalnya `pending` setelah create) |
| `data.paymentChannel` | string | Identifier channel (misalnya `QRIS`) |
| `data.expiredAt` | string | Waktu akhir validitas QRIS (ISO 8601) |
| `data.payload` | string | String EMV QR untuk render atau dipindai |
| `data.imageUrl` | string | URL gambar QR yang di-host untuk transaksi ini |
| `data.imageBase64` | string | Gambar QR dalam Base64 (PNG) |
| `data.provider` | object | Metadata acquirer/provider untuk QR yang diterbitkan |
| `data.provider.name` | string | Nama provider untuk ditampilkan |
| `data.provider.referenceId` | string | Referensi di sisi provider (sering sama dengan `trxId`) |
| `data.provider.status` | string | Hasil operasi penerbitan QR di sisi provider |
| `data.merchantInfo` | object | Identitas merchant pada payload QR (casing field sesuai yang dikembalikan API) |
| `data.merchantInfo.MerchantID` | string | Identifier merchant pada jaringan QR |
| `data.merchantInfo.MerchantName` | string | Nama merchant untuk ditampilkan |
| `data.merchantInfo.NMID` | string | National Merchant ID |
| `data.merchantInfo.City` | string | Kota merchant |
| `errors` | object | Ada pada kegagalan validasi; nama field memetakan array pesan error |

## Siklus status QRIS

Setelah create berhasil, `data.status` biasanya **`pending`**: QR valid sampai `expiredAt` dan pembayar belum menyelesaikan checkout. Lakukan polling [Check Transaction Status](./transactions/check-status) atau konsumsi [webhooks](./webhooks-v2) sampai transaksi mencapai status **terminal**, lalu hentikan polling dan finalisasi order Anda.

![Siklus status QRIS: pending melalui pemrosesan ke completed, atau failed lalu refunded](/img/qris.svg)

### Nilai `data.status` yang umum (QRIS)

| Status | Arti |
|--------|--------|
| `pending` | Menunggu pembayaran pelanggan; QR masih valid sebelum `expiredAt`. |
| `completed` | Kadang dipakai sebagai status terminal sukses bersamaan atau menggantikan `paid` (misalnya pada notifikasi). |
| `expired` | Pelanggan tidak membayar sebelum `expiredAt`. |
| `failed` | Percobaan pembayaran tidak selesai dengan sukses. |

## Catatan Keamanan dan Keandalan

- Buat `trxReference` yang benar-benar unik untuk mencegah transaksi duplikat.
- Simpan token dan API key pada penyimpanan secret server-side yang aman.
- Gunakan HTTPS untuk environment non-lokal.
- Terapkan timeout internal untuk QRIS yang masih pending dan tangani kedaluwarsa dengan baik.
