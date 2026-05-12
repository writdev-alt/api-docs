---
id: banks-list-v2
slug: /banks/list-v2
title: Daftar Bank
sidebar_position: 3
---

## Daftar Bank

Ambil daftar bank yang didukung untuk operasi berbasis transfer seperti payout dan routing rekening bank.

**Endpoint:**  
`GET /api/v2/banks`

## Ringkasan

Gunakan endpoint ini untuk mengambil metadata bank yang valid (`bankCode`, `bankName`, `type`) sebelum membuat transaksi terkait bank.  
Hal ini membantu mencegah kode routing yang tidak valid dan menjaga selector bank di sisi client tetap sinkron dengan data backend.

## Detail Endpoint

| Item | Value |
|------|-------|
| HTTP Method | `GET` |
| Endpoint | `/api/v2/banks` |
| Auth Required | Yes (`Authorization: Bearer {token}`, `X-API-KEY`) |
| Content Type | `application/json` |

### Request Headers

| Header | Value | Required | Description |
|--------|-------|:--------:|-------------|
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan |
| `Content-Type` | `application/json` | ✅ | Tipe konten request |
| `Authorization` | `Bearer {token}` | ✅ | Access token dari endpoint login |
| `X-API-KEY` | `{apiKey}` | ✅ | Kredensial API key. |

---

## Request

Endpoint ini tidak memerlukan parameter request body.

### Contoh Kode

```bash
curl --location '/api/v2/banks' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'X-API-KEY: {apiKey}' \
--header 'Authorization: Bearer token'
```

## Response

### Berhasil (`200 OK`)

```json
{
  "code": 2002006,
  "message": "Banks retrieved successfully",
  "data": [
    {
      "bankCode": "1",
      "bankName": "BANK RAKYAT INDONESIA",
      "type": "BANK_TRANSFER"
    },
    {
      "bankCode": "10",
      "bankName": "BANK UOB INDONESIA",
      "type": "BANK_TRANSFER"
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
  "code": 5002055,
  "message": "Internal server error"
}
```

### Field Respons

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Kode respons aplikasi komposit |
| `message` | string | Pesan respons yang mudah dibaca |
| `data` | array | Daftar bank yang tersedia |
| `data[].bankCode` | string | Kode bank yang dipakai pada request terkait transfer |
| `data[].bankName` | string | Nama bank untuk ditampilkan |
| `data[].type` | string | Kategori, misalnya `BANK_TRANSFER` |

## Catatan Keamanan dan Keandalan

- Cache daftar ini dan lakukan refresh berkala untuk mengurangi panggilan berulang.
- Selalu validasi `bankCode` yang dipilih terhadap respons API terbaru.
- Tangani respons unauthorized dengan refresh/re-autentikasi token.
