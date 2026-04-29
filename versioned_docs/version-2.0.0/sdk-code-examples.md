---
id: sdk-code-examples-v2
title: SDK and Code Examples
sidebar_position: 13
---

## SDK and Code Examples

Current examples are provided in cURL, PHP, Node.js, and Python across endpoint pages.

## Integration Workflow

1. Authenticate and obtain bearer token.
2. Call create transaction endpoint.
3. Check status via transaction endpoint.
4. Handle webhook notifications for asynchronous updates.

## Suggested Internal SDK Components

- `AuthClient` for token lifecycle management
- `PaymentsClient` for QRIS/VA operations
- `PayoutClient` for withdrawal workflows
- `WebhookVerifier` for signature validation

## Example Naming Conventions

- Use camelCase for payload keys.
- Store `trxId` and `trxReference` for reconciliation.
- Keep timeout, retry, and idempotency policies configurable.
