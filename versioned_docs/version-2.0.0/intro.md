---
id: intro
title: Introduction
sidebar_position: 1
---

# API Docs v2

Welcome to the IlonaPay API v2 documentation. This guide provides everything needed to integrate secure, reliable payment workflows in web-based systems using RESTful APIs and JSON.

> **Environments**  
> Use `https://sandbox.ilonapay.com` for development/testing and `https://production.ilonapay.com` for live production traffic.  
> Keep credentials and tokens separated per environment.

## Overview

API v2 is designed for backend-to-backend integrations with a focus on:

- Consistent JSON response structure
- Token-based authentication using JWT
- Predictable response code conventions
- Secure and scalable integration patterns

## Base URL

Use the base URL according to your environment:

- **Sandbox:** `https://sandbox.ilonapay.com`
- **Production:** `https://production.ilonapay.com`

All endpoint paths in this documentation are relative to the selected base URL.

## Authentication Model

API v2 uses bearer token authentication:

1. Authenticate via login endpoint to obtain `accessToken`
2. Send token in request header for protected endpoints:

```http
Authorization: Bearer <accessToken>
```

3. Refresh token before expiration (if refresh flow is enabled in your implementation)

## Request and Response Standards

### Request Standards

- Use `Content-Type: application/json` for JSON payloads
- Use `Accept: application/json` to receive JSON responses
- Validate all required fields before sending requests

### Response Standards

Responses are returned in structured JSON:

```json
{
  "code": 2000107,
  "message": "Login successful",
  "data": {}
}
```

- `code`: Composite application code (HTTP + service + case)
- `message`: Human-readable result
- `data`: Payload for successful operations
- `errors`: Optional validation details for invalid requests

## Getting Started

Recommended integration order:

1. Review response code reference (`Response Code`)
2. Implement authentication (`Login`)
3. Integrate master data endpoints (`Banks List`, `Wallets List`)
4. Add business transaction flows and webhook handling as needed

## Security Best Practices

- Always use HTTPS in non-local environments
- Store API credentials and tokens in secure server-side storage
- Never expose secrets in browser code or logs
- Apply rate limiting and monitoring on authentication endpoints
- Rotate secrets and revoke compromised tokens immediately

## Versioning and Compatibility

- This document set is for **API v2** only
- New additions should remain backward-compatible where possible
- Breaking changes should be released under a new major version

## Support

If you encounter integration issues, include request ID, endpoint, timestamp, and sanitized payload/response samples when contacting support.
