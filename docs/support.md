---
id: support
title: Support & Error Codes
sidebar_position: 7
---

# Support

## Error Codes

The Ilonapay API uses standard HTTP response codes to indicate success or failure of API requests.

### HTTP Status Codes

| Code | Status                    | Description                                 |
|:----:|:-------------------------|:--------------------------------------------|
| `200` | **OK**                  | Request succeeded                           |
| `400` | **Bad Request**         | Invalid request parameters                  |
| `401` | **Unauthorized**        | Invalid or missing API credentials          |
| `403` | **Forbidden**           | Insufficient permissions                    |
| `404` | **Not Found**           | Resource not found                          |
| `429` | **Too Many Requests**   | Rate limit exceeded                         |
| `500` | **Internal Server Error** | Server error occurred                     |

### API Error Codes

| Error Code            | Description                            | Solution                                            |
|-----------------------|----------------------------------------|-----------------------------------------------------|
| `INVALID_CREDENTIALS` | Invalid API credentials provided       | Check your Merchant ID and API Key                  |
| `INSUFFICIENT_FUNDS`  | Customer has insufficient funds        | Customer needs to add funds to their wallet         |
| `PAYMENT_DECLINED`    | Payment was declined by processor      | Try a different payment method                      |
| `INVALID_AMOUNT`      | Payment amount is invalid              | Check minimum and maximum amount limits             |
| `INVALID_CURRENCY`    | Unsupported currency code              | Use a supported currency code (USD, EUR, etc.)      |
| `DUPLICATE_REFERENCE` | Transaction reference already exists   | Use a unique transaction reference                  |
| `EXPIRED_SESSION`     | Payment session has expired            | Create a new payment request                        |
| `MERCHANT_SUSPENDED`  | Merchant account is suspended          | Contact Ilonapay support                            |

### Error Response Format

```json
{
  "success": false,
  "message": "Validation failed",
  "error_code": "INVALID_AMOUNT",
  "errors": {
    "payment_amount": [
      "The payment amount must be at least 1.00"
    ]
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

> **⚠️ Error Handling:**  
> Always check the `success` field in API responses and handle errors appropriately in your application.

---


