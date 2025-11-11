---
id: intro
title: Introduction
sidebar_position: 1
---

# Tutorial Intro

Integrate IlonaPay payment gateway into your application with our comprehensive RESTful API. Accept payments from wallets, cards, and multiple payment methods with enterprise-grade security.

> **Environments**  
> Use `https://sandbox.ilonapay.com` for testing or development and `https://production.ilonapay.com` for live traffic. Credentials and data are isolated between environments.

## Authentication

IlonaPay API uses API keys to authenticate requests. You can obtain your credentials from your merchant dashboard.

### Required Credentials
|Header|	Description|	Location
|------|-----------|--------
|X-MERCHANT-KEY|	Your unique merchant identifier|	Dashboard → Merchant → CONFIG
|X-API-KEY	API| authentication key	|Dashboard → Merchant → CONFIG

import Admonition from '@theme/Admonition';

<Admonition type="warning">
  Never share your API credentials or Client Secret in client-side code. Always store sensitive information securely on your server.
</Admonition>

