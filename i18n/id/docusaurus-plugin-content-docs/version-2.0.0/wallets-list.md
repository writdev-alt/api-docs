---
id: wallets-list-v2
slug: /wallets/list-v2
title: Daftar Wallet
sidebar_position: 4
---

## Daftar Wallet

Ambil semua wallet yang dimiliki oleh akun merchant yang terautentikasi.

**Endpoint:**  
`GET /api/v2/wallets`

## Ringkasan

Endpoint ini mengembalikan portofolio wallet lengkap untuk merchant yang terautentikasi, termasuk saldo, hold balance, mata uang, dan metadata status.

Gunakan data ini untuk dashboard akun, pengecekan saldo, dan logika pra-validasi transaksi.

## Detail Endpoint

| Item | Value |
|------|-------|
| HTTP Method | `GET` |
| Endpoint | `/api/v2/wallets` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |

### Request Headers

| Header | Value | Required | Description |
|--------|-------|:--------:|-------------|
| `Content-Type` | `application/json` | ✅ | Format payload request. |
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan. |
| `X-API-KEY` | `{apiKey}` | ✅ | Kredensial API key. |
| `Authorization` | `Bearer {token}` | ✅ | Bearer access token. |

---

## Request

Endpoint ini tidak memerlukan request body.

### Contoh Kode

```bash
curl --location '/api/v2/wallets' \
--header 'Accept: application/json' \
--header 'X-API-KEY: {apiKey}' \
--header 'Authorization: Bearer token'
```

## Response

### Berhasil (`200 OK`)

```json
{
  "code": 2000006,
  "message": "Wallets retrieved successfully",
  "data": [
    {
      "walletId": "415664176",
      "currencyCode": "USD",
      "balance": 0,
      "holdBalance": 0,
      "status": true,
      "createdAt": "2025-09-12T12:36:53Z",
      "updatedAt": "2025-09-12T12:36:53Z"
    },
    {
      "walletId": "798055915",
      "currencyCode": "IDR",
      "balance": 866000,
      "holdBalance": 0,
      "status": true,
      "createdAt": "2025-09-12T11:55:49Z",
      "updatedAt": "2026-02-27T06:14:29Z"
    }
  ]
}
```

### Respons Error

#### `401 Unauthorized`

```json
{
  "code": 4010122,
  "message": "Invalid token"
}
```

#### `500 Internal Server Error`

```json
{
  "code": 5001655,
  "message": "Internal server error"
}
```

### Field Respons

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Kode respons aplikasi komposit |
| `message` | string | Pesan respons yang mudah dibaca |
| `data` | array | Daftar wallet merchant |
| `data[].walletId` | string | Identifier wallet |
| `data[].currencyCode` | string | Kode mata uang wallet, misalnya `USD` atau `IDR` |
| `data[].balance` | number | Saldo tersedia saat ini |
| `data[].holdBalance` | number | Dana yang sedang di-hold |
| `data[].status` | boolean | Status wallet (`true` berarti aktif) |
| `data[].createdAt` | string | Timestamp pembuatan wallet (ISO-8601 UTC) |
| `data[].updatedAt` | string | Timestamp pembaruan wallet terakhir (ISO-8601 UTC) |

## Catatan Keamanan dan Keandalan

- Gunakan `balance` dan `holdBalance` bersama saat menghitung dana yang dapat digunakan.
- Jangan mengasumsikan hanya satu wallet; merchant bisa memiliki beberapa mata uang.
- Simpan nilai uang dengan penanganan presisi yang aman (decimal-safe) pada layer aplikasi Anda.
