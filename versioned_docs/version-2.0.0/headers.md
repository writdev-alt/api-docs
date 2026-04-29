---
id: headers-v2
title: Headers
sidebar_position: 4
---

## Headers

Most secured API endpoints require standard JSON headers plus token and API key authentication headers.

## Standard Headers

| Header | Required | Example | Description |
|---|---|---|---|
| `Accept` | ✅ | `application/json` | Expected response content type |
| `Content-Type` | ✅ | `application/json` | Request payload format |
| `Authorization` | ✅ | `Bearer {token}` | Access token obtained from login |
| `X-API-KEY` | ✅ | `{apiKey}` | API key assigned to your account |

## Header Usage Example

```bash
curl --location 'https://sandbox.ilonapay.com/api/v2/example' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {token}' \
  --header 'X-API-KEY: {apiKey}'
```

## Best Practices

- Always send `Accept: application/json` for predictable parsing.
- Do not expose tokens or API keys in client-side/browser applications.
- Rotate compromised credentials immediately.
