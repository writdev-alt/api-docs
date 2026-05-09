---
id: auth-login-v2
slug: /auth/login-v2
title: Login
sidebar_position: 2
---

Authenticate a user using email and password, then issue JWT credentials for authorized API access.

**Endpoint:**  
`POST /api/v2/auth/login`

## Overview

Use this endpoint to start an authenticated session and obtain `accessToken` and `refreshToken`.

Typical flow:
1. Client sends `email` and `password`.
2. Server validates payload and credentials.
3. On success, API returns `accessToken` and `refreshToken`.
4. Client sends `Authorization: Bearer <accessToken>` on protected endpoints.
5. Client refreshes token via [Refresh Token](./refresh-v2) when needed.

## Endpoint Details

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
| `Content-Type` | `application/json` | ✅ | Request body content type |
| `Accept` | `application/json` | ✅ | Expected response format |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | string | ✅ | Registered user email address |
| `password` | string | ✅ | User password |

### Validation Rules (Recommended)

| Field | Rule |
|---|---|
| `email` | Required, valid email format |
| `password` | Required, non-empty string |

### Code Example

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

### Success Response (`200 OK`)

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Composite application response code |
| `message` | string | Human-readable result message |
| `data.accessToken` | string | JWT access token used for API authorization |
| `data.tokenType` | string | Token type, typically `Bearer` |
| `data.expiresIn` | integer | Access token expiration time (Unix timestamp) |
| `data.refreshToken` | string | Token to request a new access token |

## Security and Reliability Notes

- Store tokens securely and never expose them in client-side logs.
- Use HTTPS in all non-local environments.
- Apply login rate limiting and anti-brute-force controls.
- Revoke refresh tokens on logout or suspicious activity.

## Notes

- Treat `expiresIn` as token expiry metadata and refresh before expiry.
- API returns `422` with field-level errors for invalid payloads.
