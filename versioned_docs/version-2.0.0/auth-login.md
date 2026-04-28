---
id: auth-login-v2
slug: /auth/login-v2
title: Login
sidebar_position: 2
---

## Login

Authenticate a user using email and password, then issue JWT credentials for authorized API access in a web application.

**Endpoint:**  
`POST /api/v2/auth/login`

## 1) Overview

The login feature verifies user credentials and returns an access token for authenticated requests.  
This endpoint is stateless and designed for horizontal scaling in distributed backend systems.

### Authentication Flow (High-Level)

1. Client sends `email` and `password` to login endpoint.
2. Server validates request payload and credentials.
3. On success, server returns `accessToken` and `refreshToken`.
4. Client sends `Authorization: Bearer <accessToken>` on protected endpoints.
5. When token expires, client requests a new access token using refresh token flow (if enabled).

## 2) Endpoint Details

| Item | Value |
|------|-------|
| HTTP Method | `POST` |
| Endpoint | `/api/v2/auth/login` |
| Content Type | `application/json` |
| Authentication | Not required for this endpoint |

### Request Headers

| Header | Value | Required | Description |
|--------|-------|:--------:|-------------|
| `Content-Type` | `application/json` | ✅ | Request body content type |
| `Accept` | `application/json` | ✅ | Expected response format |

## 3) Request Specification

### Request Body (JSON)

| Field | Type | Required | Description |
|-------|------|:--------:|-------------|
| `email` | string | ✅ | Registered user email address |
| `password` | string | ✅ | User password |

```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules

| Field | Rule | Example |
|------|------|---------|
| `email` | Required, valid email format, trimmed | `merchant@wrpay.co` |
| `password` | Required, non-empty string | `rahasia` |

If validation fails, API returns `422 Validation Error` with field-level details.

---

## 4) Response Specification

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

### Response Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `code` | integer | Composite application response code |
| `message` | string | Human-readable result message |
| `data.accessToken` | string | JWT access token used for API authorization |
| `data.tokenType` | string | Token type, typically `Bearer` |
| `data.expiresIn` | integer | Access token expiration time (Unix timestamp) |
| `data.refreshToken` | string | Token to request a new access token |

## 5) Authentication Mechanism

- **JWT Access Token:** Signed token containing user claims and expiration.
- **Bearer Usage:** Send token in header:

```http
Authorization: Bearer <accessToken>
```

- **Stateless auth:** API validates token signature and claims without server-side session state.

## 6) Security Considerations

- **Password hashing:** Store passwords with strong one-way hash, e.g. `bcrypt` with appropriate cost factor.
- **Rate limiting:** Apply IP/user-based login throttling to reduce abuse.
- **Brute-force protection:** Add account lockout or incremental delay after repeated failed attempts.
- **HTTPS only:** Require TLS in all environments except isolated local development.
- **Token hygiene:** Keep token lifetime short and rotate refresh tokens where possible.

## 7) Example cURL Request

```bash
curl --location '/api/v2/auth/login' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "merchant@wrpay.co",
  "password": "rahasia"
}'
```

## 8) Example Response

```json
{
  "code": 2000107,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 1777388652,
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 9) Notes

- `expiresIn` should be treated as token expiry metadata; refresh before expiration to avoid failed requests.
- If refresh token support is enabled, keep it in secure storage and never expose it in client-side logs.
- Revoke refresh tokens on logout or suspicious account activity.

## 10) Optional Enhancements

- **Multi-factor authentication (MFA):** Require OTP/TOTP step after password verification for higher account security.
- **OAuth login:** Support providers such as Google for social or enterprise SSO scenarios.
