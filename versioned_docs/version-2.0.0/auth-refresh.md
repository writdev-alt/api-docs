---
id: auth-refresh-v2
slug: /auth/refresh-v2
title: Refresh Token
sidebar_position: 2
---

## Refresh Token

Exchange a valid refresh token for a new access token (and optionally a rotated refresh token). Use this when the access token from [Login](./login-v2) has expired or is about to expire.

**Endpoint:**  
`POST /api/v2/auth/refresh`

## 1) Overview

The refresh flow extends the session without re-entering credentials. The server validates the `refreshToken` (and may validate the `Authorization` bearer if your integration requires it).

### Flow (High-Level)

1. Client sends `refreshToken` in the request body.
2. Server validates the refresh token.
3. On success, server returns a new `accessToken` and typically a new `refreshToken` (same shape as login).
4. Client continues using `Authorization: Bearer <accessToken>` on protected endpoints.

## 2) Endpoint Details

| Item | Value |
|------|-------|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/auth/refresh` |
| Content Type | `application/json` |
| Authentication | `Authorization: Bearer {token}` (current or refresh policy per your gateway) |

### Request Headers

| Header | Value | Required | Description |
|--------|-------|:--------:|-------------|
| `Content-Type` | `application/json` | ✅ | Request body content type |
| `Accept` | `application/json` | ✅ | Expected response format |
| `Authorization` | `Bearer {token}` | ✅ | Bearer token for refresh endpoint (often the current access token or a dedicated refresh bearer, per environment) |

## 3) Request

### Body Parameters

| Field | Type | Required | Description |
|-------|------|:--------:|-------------|
| `refreshToken` | string | ✅ | Refresh token issued by the login endpoint |

```json
{
  "refreshToken": "refresh_token_here"
}
```

### Validation Rules

| Field | Rule |
|-------|------|
| `refreshToken` | Required, non-empty string |

If validation fails, the API returns `422 Validation Error` with field-level details.

---

## 4) Response

Response shape matches [Login](./login-v2): `code`, `message`, and `data` with `accessToken`, `tokenType`, `expiresIn`, and `refreshToken`.

### Success (`200 OK`)

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

### Error Responses

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

### Response Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Composite application response code |
| `message` | string | Human-readable result message |
| `data.accessToken` | string | New JWT access token |
| `data.tokenType` | string | Token type, typically `Bearer` |
| `data.expiresIn` | integer | Access token expiration time (Unix timestamp) |
| `data.refreshToken` | string | New refresh token (store securely; may rotate on each refresh) |

## 5) Example cURL Request

```bash
curl --location '/api/v2/auth/refresh' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
  "refreshToken": "{refreshToken}"
}'
```

In sandbox or production, the path is typically `POST /api/v2/auth/refresh` on your environment base URL (same request shape).

## 6) Example Success Response

```json
{
  "code": 2000107,
  "message": "Refresh successful",
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 1777388652,
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 7) Notes

- Treat `expiresIn` the same way as login: refresh before expiry to avoid `401` on protected APIs.
- Store the new `refreshToken` securely when the API rotates refresh tokens on each call.
- On repeated `401` from refresh, require the user to log in again via [Login](./login-v2).
