---
id: faq-v2
title: FAQ
sidebar_position: 14
---

## FAQ

### Which environment should I use for testing?
Use sandbox: `https://sandbox.ilonapay.com`.

### How do I authenticate API requests?
Use `Authorization: Bearer {token}` and `X-API-KEY: {apiKey}`.

### What should I store for reconciliation?
Store both `trxId` and `trxReference`.

### Should I poll transaction status continuously?
Use reasonable polling intervals and stop on final states. Prefer webhook updates when available.

### How do I handle validation errors?
Check HTTP `422`, then parse `errors` object by field.
