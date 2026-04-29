---
id: rate-limits-v2
title: Rate Limits
sidebar_position: 5
---

## Rate Limits

Rate limits protect platform stability and ensure fair API usage across integrators.

## General Policy

- Apply request throttling per credential and/or IP basis.
- Bursts may be allowed, but sustained high traffic can be limited.
- Exceeding limits may return HTTP `429 Too Many Requests`.

## Recommended Client Behavior

- Implement exponential backoff with jitter for retries.
- Respect `Retry-After` when present.
- Avoid aggressive polling loops for status checks.
- Use asynchronous patterns (webhooks/events) when possible.

## Retry Guidance for `429`

1. Stop immediate retries.
2. Wait according to `Retry-After` or backoff policy.
3. Retry idempotent operations only.
