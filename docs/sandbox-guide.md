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

## Getting Started with Sandbox

### 1. Get Sandbox Credentials

- Login to your merchant dashboard
- Navigate to **API Configuration**
- Switch to `Sandbox Mode`
- Copy your prefixed credentials

### 2. Configure Your Integration

- Use sandbox domain: `sandbox.ilonapay.com`
- Use prefixed API credentials
- Configure webhook endpoints for testing
- Enable sandbox mode in your merchant settings

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
- **KYC Verification:** Test document verification flow

---

## Sandbox-Specific Features

- **Transaction Marking:** All sandbox transactions are marked with `SANDBOX_TRANSACTION` in remarks field
- **Unlimited Testing:** No limits on number of test transactions or API calls
- **Real-time Webhooks:** Test webhook notifications with sandbox transaction data

---

## Sample Sandbox Integration

<Tabs
  defaultValue="php-sandbox"
  values={[
    {label: 'PHP', value: 'php-sandbox'},
    {label: 'JavaScript', value: 'js-sandbox'},
    {label: 'cURL', value: 'curl-sandbox'},
  ]}
>

<TabItem value="php-sandbox">

```php
<?php
// Sandbox Integration Example
class SandboxTester
{
    private $apiKey = 'your_api_key_here';
    private $merchantKey = 'merchant_your_key_here';
    private $environment = 'sandbox';
    private $baseUrl = 'https://sandbox.ilonapay.com/api/v1'; // replace with your sandbox host

    public function testPaymentFlow()
    {
        // 1. Initiate Payment
        $paymentData = [
            'payment_amount' => 100.00,
            'currency_code' => 'USD',
            'ref_trx' => 'SANDBOX' . uniqid(),
            'description' => 'Sandbox Payment Test',
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
            'success_redirect' => 'https://yoursite.com/success',
            'failure_url' => 'https://yoursite.com/failure',
            'cancel_redirect' => 'https://yoursite.com/cancel',
            'ipn_url' => 'https://yoursite.com/webhook'
        ];

        $response = $this->makeApiRequest('POST', '/initiate-payment', $paymentData);

        if ($response['success']) {
            echo "Payment URL: " . $response['data']['payment_url'] . "\n";

            // 2. Simulate payment completion and verify
            $trxId = $response['data']['info']['transaction_id'] ?? 'TXN123456789';
            $this->verifyPayment($trxId);
        }
    }

    public function verifyPayment($trxId)
    {
        $response = $this->makeApiRequest('GET', "/verify-payment/{$trxId}");
        echo "Payment Status: " . $response['data']['status'] . "\n";
    }

    private function makeApiRequest($method, $endpoint, $data = null)
    {
        $headers = [
            'X-Environment: ' . $this->environment,
            'X-API-KEY: ' . $this->apiKey,
            'X-MERCHANT-KEY: ' . $this->merchantKey,
            'Content-Type: application/json',
            'Accept: application/json'
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }
}

// Run sandbox tests
$tester = new SandboxTester();
$tester->testPaymentFlow();
```

</TabItem>

<TabItem value="js-sandbox">

```javascript
// Sandbox Testing Suite
class SandboxTester {
    constructor() {
        this.apiKey = 'your_api_key_here';
        this.merchantKey = 'merchant_your_key_here';
        this.environment = 'sandbox';
        this.baseUrl = 'https://sandbox.ilonapay.com/api/v1'; // replace with your sandbox host
    }

    async testPaymentFlow() {
        try {
            // 1. Initiate Payment
            const paymentData = {
                payment_amount: 100.00,
                currency_code: 'USD',
                ref_trx: 'SANDBOX' + Date.now(),
                description: 'Sandbox Payment Test',
                customer_name: 'John Doe',
                customer_email: 'john@example.com',
                success_redirect: 'https://yoursite.com/success',
                failure_url: 'https://yoursite.com/failure',
                cancel_redirect: 'https://yoursite.com/cancel',
                ipn_url: 'https://yoursite.com/webhook'
            };

            const response = await this.makeApiRequest('POST', '/initiate-payment', paymentData);

            if (response.payment_url) {
                console.log('Payment URL:', response.payment_url);

                // 2. Simulate verification
                const trxId = response.info.transaction_id || 'TXN123456789';
                await this.verifyPayment(trxId);
            }
        } catch (error) {
            console.error('Sandbox test failed:', error);
        }
    }

    async verifyPayment(trxId) {
        const response = await this.makeApiRequest('GET', `/verify-payment/${trxId}`);
        console.log('Payment Status:', response.status);
    }

    async makeApiRequest(method, endpoint, data = null) {
        const headers = {
            'X-Environment': this.environment,
            'X-API-KEY': this.apiKey,
            'X-MERCHANT-KEY': this.merchantKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const config = {
            method,
            headers
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(this.baseUrl + endpoint, config);
        return await response.json();
    }
}

// Run sandbox tests
const tester = new SandboxTester();
tester.testPaymentFlow();
```

</TabItem>

<TabItem value="curl-sandbox">

```bash
#!/bin/bash
# Sandbox Testing Script

# Configuration
API_KEY="your_api_key_here"
MERCHANT_KEY="merchant_your_key_here"
ENVIRONMENT="sandbox"
BASE_URL="https://sandbox.ilonapay.com/api/v1" # replace with your sandbox host

# Test Payment Initiation
echo "Testing Payment Initiation..."
curl -X POST "${BASE_URL}/initiate-payment" \
  -H "X-Environment: ${ENVIRONMENT}" \
  -H "X-API-KEY: $\\{api_key\\}" \
  -H "X-MERCHANT-KEY: $\\{merchant_key\\}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "payment_amount": 100.00,
    "currency_code": "USD",
    "ref_trx": "SANDBOX'$(date +%s)'",
    "description": "Sandbox Payment Test",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "success_redirect": "https://yoursite.com/success",
    "failure_url": "https://yoursite.com/failure",
    "cancel_redirect": "https://yoursite.com/cancel",
    "ipn_url": "https://yoursite.com/webhook"
  }' | jq .

# Test Payment Verification
echo -e "\nTesting Payment Verification..."
TRX_ID="TXN123456789"  # Replace with actual transaction ID
curl -X GET "${BASE_URL}/verify-payment/${TRX_ID}" \
  -H "X-Environment: ${ENVIRONMENT}" \
  -H "X-API-KEY: $\\{api_key\\}" \
  -H "X-MERCHANT-KEY: $\\{merchant_key\\}" \
  -H "Accept: application/json" | jq .
```

</TabItem>

</Tabs>

---

## Sandbox Best Practices

### ✅ Do's

- Always test in sandbox before production
- Test all payment scenarios (success, failure, pending)
- Verify webhook/IPN handling thoroughly
- Test with different currencies and amounts
- Store credentials in environment variables
- Log all API interactions for debugging
- Test error handling and edge cases

### ❌ Don'ts

- Don't use production credentials in sandbox
- Don't skip webhook signature verification
- Don't hardcode credentials in your code
- Don't ignore error responses
- Don't test with real customer data
- Don't deploy without thorough testing
- Don't mix sandbox and production data

---

## Common Issues & Solutions

### Authentication Failed (401 Unauthorized)

**Common Causes:**

- Using production credentials with sandbox environment
- Missing or incorrect `X-Environment` header
- Invalid API key or merchant key format
- Sandbox mode disabled in merchant settings

**Solutions:**

- Verify you're using prefixed credentials
- Ensure `X-Environment: sandbox` header is set
- Check credentials in merchant dashboard
- Enable sandbox mode in merchant settings

---

### Sandbox Disabled Error (403 Forbidden)

**Cause:** Sandbox mode is not enabled for your merchant account.

**Solution:**

- Login to merchant dashboard
- Navigate to API Configuration
- Enable "Sandbox Mode"
- Generate test credentials if not already available

---

### Webhook Not Received

**Troubleshooting Steps:**

- Verify webhook URL is publicly accessible
- Check if your server accepts POST requests
- Ensure webhook endpoint returns 200 OK status
- Check server logs for incoming requests
- Use tools like ngrok for local testing
- Verify webhook signature verification code

---

## Ready for Production?

> **Once you have thoroughly tested all scenarios in sandbox, switch to production mode, update your credentials, and set X-Environment header to "production".**


