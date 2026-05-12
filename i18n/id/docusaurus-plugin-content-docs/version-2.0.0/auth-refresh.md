---
id: auth-refresh-v2
slug: /auth/refresh-v2
title: Refresh Token
sidebar_position: 2
---

Tukar refresh token yang valid menjadi access token baru (dan opsional refresh token yang dirotasi).

**Endpoint:**  
`POST /api/v2/auth/refresh`

## Ringkasan

Gunakan endpoint ini ketika access token dari [Login](./login-v2) sudah kedaluwarsa atau mendekati kedaluwarsa.

Alur umum:
1. Client mengirim `refreshToken` pada request body.
2. Server memvalidasi refresh token dan kebijakan otorisasi.
3. Jika berhasil, server mengembalikan `accessToken` dan `refreshToken` yang baru.
4. Client melanjutkan penggunaan `Authorization: Bearer <accessToken>` pada endpoint yang dilindungi.

## Detail Endpoint

| Item | Value |
|---|---|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/auth/refresh` |
| Auth Required | Yes (`Authorization: Bearer {token}`) |
| Content Type | `application/json` |

## Request

### Request Headers

| Header | Value | Required | Description |
|---|---|---|---|
| `Content-Type` | `application/json` | ✅ | Tipe konten request body |
| `Accept` | `application/json` | ✅ | Format respons yang diharapkan |
| `Authorization` | `Bearer {token}` | ✅ | Bearer token yang diterima oleh kebijakan refresh pada environment Anda |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `refreshToken` | string | ✅ | Refresh token yang diterbitkan oleh endpoint login |

```json
{
  "refreshToken": "refresh_token_here"
}
```

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `refreshToken` | Required, non-empty string |

### Contoh Kode

```bash
curl --location '/api/v2/auth/refresh' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
  "refreshToken": "{refreshToken}"
}'
```

## Response

Bentuk respons sama dengan [Login](./login-v2): `code`, `message`, dan `data` berisi `accessToken`, `tokenType`, `expiresIn`, serta `refreshToken`.

### Berhasil (`200 OK`)

```json
{
  "code": 2000107,
  "message": "Refresh successful",
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
  "message": "Invalid or expired refresh token"
}
```

#### `422 Validation Error`

```json
{
  "code": 4220111,
  "message": "Validation error",
  "errors": {
    "refreshToken": ["The refreshToken field is required."]
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
| `data.accessToken` | string | JWT access token yang baru |
| `data.tokenType` | string | Tipe token, umumnya `Bearer` |
| `data.expiresIn` | integer | Waktu kedaluwarsa access token (Unix timestamp) |
| `data.refreshToken` | string | Refresh token yang baru (simpan dengan aman; dapat dirotasi pada setiap refresh) |

## Catatan Keamanan dan Keandalan

- Perlakukan `expiresIn` seperti login: lakukan refresh sebelum kedaluwarsa untuk menghindari `401` pada API yang dilindungi.
- Simpan `refreshToken` yang baru dengan aman ketika API menerapkan rotasi refresh token pada setiap panggilan.
- Jika berulang kali mendapat `401` dari refresh, minta pengguna untuk login ulang melalui [Login](./login-v2).
