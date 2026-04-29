---
id: base-url-environment-v2
title: Base URL and Environment
sidebar_position: 3
---

## Base URL and Environment

Use environment-specific base URLs to separate development/testing traffic from production traffic.

## Environments

| Environment | Base URL | Use Case |
|---|---|---|
| Sandbox | `https://sandbox.ilonapay.com` | Development, QA, UAT, and integration testing |
| Production | `https://production.ilonapay.com` | Live payment traffic |

## Environment Rules

- Never mix sandbox credentials with production URLs.
- Keep API keys and access tokens isolated per environment.
- Validate webhook endpoints and signatures separately per environment.
- Run end-to-end smoke tests in sandbox before production rollout.

## Endpoint Path Convention

All endpoint paths in this documentation are relative to the selected base URL.

Example:

```bash
GET /api/v2/transactions/{trxId}
```
