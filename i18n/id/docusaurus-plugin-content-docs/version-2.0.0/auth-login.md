---
id: auth-login-v2
slug: /auth/login-v2
title: Login
sidebar_position: 2
---

Autentikasi pengguna menggunakan email dan password, lalu menerbitkan kredensial JWT untuk akses API terotorisasi.

**Endpoint:**  
`POST /api/v2/auth/login`

## Ringkasan

Gunakan endpoint ini untuk memulai sesi terautentikasi dan mendapatkan `accessToken` serta `refreshToken`.

Alur umum:
1. Client mengirim `email` dan `password`.
2. Server memvalidasi payload dan kredensial.
3. Jika berhasil, API mengembalikan `accessToken` dan `refreshToken`.
4. Client mengirim `Authorization: Bearer <accessToken>` pada endpoint yang dilindungi.
5. Client melakukan refresh token melalui [Refresh Token](./refresh-v2) saat diperlukan.

## Detail Endpoint

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/auth/login` |
| Auth Required | No |
| Content Type | `application/json` |

## Request

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Content-Type` | `application/json` | ✅ | Tipe konten request body |
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | string | ✅ | Alamat email pengguna yang terdaftar |
| `password` | string | ✅ | Password pengguna |

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `email` | Required, valid email format |
| `password` | Required, non-empty string |

### Contoh Kode

```bash
curl --location '/api/v2/auth/login' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "email": "merchant@wrpay.co",
  "password": "rahasia"
}'
```

## Response

### Respons Berhasil (`200 OK`)

```json
{
  "code": 2000107,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_token",
    "tokenType": "Bearer",
    "expiresIn": 1777388652,
    "refreshToken": "refresh_token"
  }
}
```

### Respons Error

#### `400 Bad Request`

```json
{
  "code": 4000113,
  "message": "Malformed JSON payload"
}
```

#### `401 Unauthorized`

```json
{
  "code": 4010124,
  "message": "Invalid credentials"
}
```

#### `422 Validation Error`

```json
{
  "code": 4220111,
  "message": "Validation error",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password field is required."]
  }
}
```

#### `500 Internal Server Error`

```json
{
  "code": 5000155,
  "message": "Internal server error"
}
```

### Field Respons

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Kode respons aplikasi komposit |
| `message` | string | Hasil dalam bentuk teks yang mudah dibaca |
| `data.accessToken` | string | JWT access token untuk otorisasi API |
| `data.tokenType` | string | Tipe token, umumnya `Bearer` |
| `data.expiresIn` | integer | Waktu kedaluwarsa access token (Unix timestamp) |
| `data.refreshToken` | string | Token untuk meminta access token baru |

## Catatan Keamanan dan Keandalan

- Simpan token dengan aman dan jangan pernah mengeksposnya pada log client-side.
- Gunakan HTTPS pada semua environment non-lokal.
- Terapkan rate limiting login dan kontrol anti-brute-force.
- Cabut refresh token saat logout atau jika terdeteksi aktivitas mencurigakan.

## Catatan

- Perlakukan `expiresIn` sebagai metadata kedaluwarsa token dan lakukan refresh sebelum habis.
- API mengembalikan `422` dengan error per-field untuk payload yang tidak valid.
