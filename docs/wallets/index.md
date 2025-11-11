---
id: wallets/index
title: Wallets Overview
sidebar_position: 1
---

## Wallets

Manage and retrieve wallet information for the authenticated merchant account. Use these endpoints to list your wallets and inspect detailed balances for a single wallet.

---

### Available Endpoints

- `GET /api/v1/wallets` — Retrieve all wallets that currently hold a positive balance.
- `GET /api/v1/wallets/{uuid}` — Fetch detailed information for a specific wallet by UUID.

> **Tip:** The wallet APIs always return amounts in the smallest currency unit. Convert to major units (for example, cents to dollars) before displaying values to end users.
