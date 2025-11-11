---
id: withdraw-account-management-index
slug: /withdraw-account-management
title: Withdrawal Account Management
sidebar_position: 1
---

Comprehensive API for managing withdrawal accounts. Create, update, delete, and retrieve withdrawal account information for seamless fund withdrawals.

> **ℹ️ Overview**  
> The Withdrawal Account Management API provides full CRUD operations for managing withdrawal accounts. Users can register multiple withdrawal accounts (bank accounts or e-wallets) and use them for processing withdrawals.

> **💻 API Resource Responses**  
> All endpoints use API Resources for consistent data transformation. Responses are wrapped in a `data` key:
>
> - **Single Resource:** `{ "data": {...} }`
> - **Collection:** `{ "data": [...] }`
>
> Error responses include `success`, `message`, and `errors` fields for validation failures.

---

## Endpoint Guides

- [List Withdrawal Accounts](./list)
- [Get Withdrawal Methods](./methods)
- [Get Banks and Wallets Lists](./banks-wallets)
- [Create Withdrawal Account](./create)
- [Get Withdrawal Account Details](./details)
- [Update Withdrawal Account](./update)
- [Delete Withdrawal Account](./delete)
- [Get Account Information](./info)

