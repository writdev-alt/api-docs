---
id: sandbox-guide
title: Sandbox Testing Guide
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sandbox Testing Guide

Complete guide to testing API integration in sandbox environment. Test all features safely without processing real money.

---

## Sandbox Environment

> **Sandbox mode provides a complete testing environment that mirrors production functionality. All transactions are simulated with no real money processing.**

---

## Sandbox Credentials

| Credential Type | Sandbox Format         | Production Format      | Purpose                        |
|-----------------|-----------------------|-----------------------|--------------------------------|
| **API Key**     | `xxxxxxxxxx`      | `xxxxxxxxxx`      | Authentication for API requests|
| **Merchant Key**| `xxxxx`      | `xxxxx`      | Merchant identification        |
| **Webhook Secret**| `webhook_secret`    | `webhook_secret`      | IPN signature verification     |

---

## Comprehensive Testing Scenarios

### Payment Testing

- **Successful Payments:** Test successful transaction flow
- **Failed Payments:** Test insufficient balance scenarios
- **Pending Payments:** Test pending transaction handling
- **Cancelled Payments:** Test user cancellation flow

### Wallet & Features Testing

- **Multi-Currency:** Test USD, EUR, BDT currencies
- **Virtual Cards:** Test card issuance and management
- **Deposits & Withdrawals:** Test wallet funding methods

---

## Sandbox-Specific Features

- **Unlimited Testing:** No limits on number of test transactions or API calls
- **Real-time Webhooks:** Test webhook notifications with sandbox transaction data


---

## Ready for Production?

> **Once you have thoroughly tested all scenarios in sandbox, switch to production mode, update your credentials, and set X-Environment header to "production".**


