---
id: auth-refresh-v2
slug: /auth/refresh-v2
title: Refresh Token
sidebar_position: 2
---

Exchange a valid refresh token for a new access token (and optionally a rotated refresh token).

**Endpoint:**  
`POST /api/v2/auth/refresh`

## Overview

Use this endpoint when an access token from [Login](./login-v2) is expired or near expiry.

Typical flow:
1. Client sends `refreshToken` in request body.
2. Server validates refresh token and authorization policy.
3. On success, server returns new `accessToken` and `refreshToken`.
4. Client continues using `Authorization: Bearer <accessToken>` on protected endpoints.

## Endpoint Details

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
| `Content-Type` | `application/json` | ✅ | Request body content type |
| `Accept` | `application/json` | ✅ | Expected response format |
| `Authorization` | `Bearer {token}` | ✅ | Bearer token accepted by your environment refresh policy |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `refreshToken` | string | ✅ | Refresh token issued by the login endpoint |

```json
{
  "refreshToken": "refresh_token_here"
}
```

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `refreshToken` | Required, non-empty string |

### Code Example

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Composite application response code |
| `message` | string | Human-readable result message |
| `data.accessToken` | string | New JWT access token |
| `data.tokenType` | string | Token type, typically `Bearer` |
| `data.expiresIn` | integer | Access token expiration time (Unix timestamp) |
| `data.refreshToken` | string | New refresh token (store securely; may rotate on each refresh) |

## Security and Reliability Notes

- Treat `expiresIn` the same way as login: refresh before expiry to avoid `401` on protected APIs.
- Store the new `refreshToken` securely when the API rotates refresh tokens on each call.
- On repeated `401` from refresh, require the user to log in again via [Login](./login-v2).
