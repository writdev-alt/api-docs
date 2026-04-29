---
id: error-handling-v2
title: Error Handling
sidebar_position: 6
---

## Error Handling

API errors follow a consistent JSON structure to simplify client-side handling.

## Error Response Format

```json
{
  "code": 4220211,
  "message": "The given data was invalid.",
  "errors": {
    "amount": [
      "amount must be between Rp 100.000 and Rp 5.000.000"
    ]
  }
}
```

## Common HTTP Error Classes

| HTTP | Meaning | Typical Cause |
|---|---|---|
| `400` | Bad Request | Invalid request format |
| `401` | Unauthorized | Missing/invalid token |
| `404` | Not Found | Unknown resource or transaction |
| `422` | Validation Error | Business/field validation failed |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Server Error | Unexpected internal issue |

## Implementation Recommendations

- Handle by HTTP status first, then inspect `code`.
- Show user-friendly messages but log full response for diagnostics.
- Retry only transient conditions (`429`, selected `5xx`).
