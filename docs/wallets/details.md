---
id: wallets-details
slug: /wallets/details
title: Get Wallet Details
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Get Wallet Details

Retrieve detailed information about a specific wallet using its unique identifier (UUID). This endpoint provides comprehensive wallet information including all balance details.

**Endpoint:**  
`GET /api/v1/wallets/{uuid}`

### Request Headers

| Header            | Value               | Required | Description              |
|-------------------|---------------------|:--------:|--------------------------|
| `Accept`          | `application/json`  | ✅       | Request content type     |
| `X-MERCHANT-KEY`  | `{merchant_key}`    | ✅       | Your API Secret Key      |
| `X-API-KEY`       | `{api_key}`         | ✅       | Your API Key             |

### Path Parameters

| Parameter | Type   | Required | Description                                                   |
|-----------|--------|:--------:|----------------------------------------------------------------|
| `uuid`    | string | ✅       | Wallet UUID (e.g., 9d5e8c12-3f4a-4b2d-8e1c-6f7a8b9c0d1e)      |

---

### Code Examples

<Tabs
  defaultValue="curl-wallet-detail"
  values={[
    {label: 'cURL', value: 'curl-wallet-detail'},
    {label: 'PHP / Laravel', value: 'php-wallet-detail'},
    {label: 'Node.js', value: 'node-wallet-detail'},
    {label: 'Python', value: 'python-wallet-detail'},
  ]}
>

<TabItem value="curl-wallet-detail">

```bash
curl -X GET "/api/v1/wallets/9d5e8c12-3f4a-4b2d-8e1c-6f7a8b9c0d1e" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: your_merchant_key_here" \
  -H "X-API-KEY: your_api_key_here"
```

</TabItem>

<TabItem value="php-wallet-detail">

```php
<?php

use Illuminate\Support\Facades\Http;

class WalletManager
{
    private string $merchantKey;
    private string $apiKey;
    private string $baseUrl;

    public function __construct(string $merchantKey, string $apiKey)
    {
        $this->merchantKey = $merchantKey;
        $this->apiKey = $apiKey;
        $this->baseUrl = '/api/v1';
    }

    public static function getInstance(string $merchantKey, string $apiKey): self
    {
        return new self($merchantKey, $apiKey);
    }

    /**
     * Get wallet details by UUID
     *
     * @param string $uuid Wallet UUID
     * @return array Response with success status and wallet data
     */
    public function getWalletDetail(string $uuid): array
    {
        try {
            $response = Http::timeout(60)
                ->withHeaders([
                    'Accept' => 'application/json',
                    'X-MERCHANT-KEY' => $this->merchantKey,
                    'X-API-KEY' => $this->apiKey,
                ])
                ->get("{$this->baseUrl}/wallets/{$uuid}");

            if ($response->successful()) {
                $wallet = $response->json('data');

                return [
                    'success' => true,
                    'wallet' => $wallet
                ];
            }

            return [
                'success' => false,
                'error' => 'HTTP ' . $response->status() . ': ' . $response->body(),
                'status_code' => $response->status()
            ];

        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}

// Usage Example
$walletManager = WalletManager::getInstance(
    env('MERCHANT_KEY'),
    env('API_KEY')
);

$walletUuid = '9d5e8c12-3f4a-4b2d-8e1c-6f7a8b9c0d1e';
$result = $walletManager->getWalletDetail($walletUuid);

if ($result['success']) {
    $wallet = $result['wallet'];
    echo "Wallet Details:\n";
    echo "Currency: {$wallet['currency']}\n";
    echo "Balance: " . number_format($wallet['balance']) . "\n";
    echo "Available: " . number_format($wallet['available_balance']) . "\n";
    echo "Hold: " . number_format($wallet['hold_balance']) . "\n";
} else {
    echo "Error: " . $result['error'];
}
```

</TabItem>

<TabItem value="node-wallet-detail">

```javascript
const axios = require('axios');

class WalletManager {
    constructor(merchantKey, apiKey) {
        this.merchantKey = merchantKey;
        this.apiKey = apiKey;
        this.baseUrl = '/api/v1';
    }

    static getInstance(merchantKey, apiKey) {
        return new WalletManager(merchantKey, apiKey);
    }

    /**
     * Get wallet details by UUID
     * @param {string} uuid - Wallet UUID
     * @returns {Promise<Object>} Response with success status and wallet data
     */
    async getWalletDetail(uuid) {
        try {
            const response = await axios.get(`${this.baseUrl}/wallets/${uuid}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-MERCHANT-KEY': this.merchantKey,
                    'X-API-KEY': this.apiKey
                },
                timeout: 30000
            });

            if (response.status === 200) {
                return {
                    success: true,
                    wallet: response.data.data
                };
            }

        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    error: error.response.data.message || `HTTP ${error.response.status}`,
                    statusCode: error.response.status
                };
            }

            return {
                success: false,
                error: error.message,
                type: 'network_error'
            };
        }
    }
}

// Usage Example
async function getWallet() {
    const walletManager = WalletManager.getInstance(
        process.env.MERCHANT_KEY,
        process.env.API_KEY
    );

    const walletUuid = '9d5e8c12-3f4a-4b2d-8e1c-6f7a8b9c0d1e';

    try {
        const result = await walletManager.getWalletDetail(walletUuid);

        if (result.success) {
            const wallet = result.wallet;
            console.log('Wallet Details:');
            console.log(`Currency: ${wallet.currency}`);
            console.log(`Balance: ${wallet.balance.toLocaleString()}`);
            console.log(`Available: ${wallet.available_balance.toLocaleString()}`);
            console.log(`Hold: ${wallet.hold_balance.toLocaleString()}`);
        } else {
            console.error('Wallet retrieval failed:', result.error);
        }
    } catch (error) {
        console.error('Wallet fetch failed:', error.message);
    }
}

module.exports = { WalletManager, getWallet };
```

</TabItem>

<TabItem value="python-wallet-detail">

```python
import requests
import logging
from typing import Dict, Any, List

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WalletManager:
    """
    Wallet Management for IlonaPay Payment Gateway
    """

    def __init__(self, merchant_key: str, api_key: str, timeout: int = 30):
        """
        Initialize the wallet manager

        Args:
            merchant_key: Your merchant key
            api_key: Your API key
            timeout: Request timeout in seconds
        """
        self.merchant_key = merchant_key
        self.api_key = api_key
        self.base_url = '/api/v1'
        self.timeout = timeout

        # Configure session
        self.session = requests.Session()
        self.session.headers.update({
            'Accept': 'application/json',
            'X-MERCHANT-KEY': self.merchant_key,
            'X-API-KEY': self.api_key
        })

    @classmethod
    def get_instance(cls, merchant_key: str, api_key: str, **kwargs) -> 'WalletManager':
        """Factory method to create an instance"""
        return cls(merchant_key, api_key, **kwargs)

    def get_wallet_detail(self, uuid: str) -> Dict[str, Any]:
        """
        Get wallet details by UUID

        Args:
            uuid: Wallet UUID

        Returns:
            Dictionary with success status and wallet data
        """
        try:
            response = self.session.get(
                f"{self.base_url}/wallets/{uuid}",
                timeout=self.timeout
            )

            if response.status_code == 200:
                data = response.json()
                wallet = data.get('data', [])

                return {
                    'success': True,
                    'wallet': wallet
                }

            return {
                'success': False,
                'error': f'HTTP {response.status_code}: {response.text}',
                'status_code': response.status_code
            }

        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'error': f'Network error: {str(e)}',
                'type': 'network_error'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'type': 'unexpected_error'
            }

    def close(self):
        self.session.close()

# Usage Example
def get_wallet_detail():
    import os

    wallet_manager = WalletManager.get_instance(
        merchant_key=os.getenv('MERCHANT_KEY'),
        api_key=os.getenv('API_KEY'),
        timeout=30
    )
    wallet_uuid = '9d5e8c12-3f4a-4b2d-8e1c-6f7a8b9c0d1e'
    result = wallet_manager.get_wallet_detail(wallet_uuid)

    if result['success']:
        wallet = result['wallet']
        print("Wallet Details:")
        print(f"Currency: {wallet['currency']}")
        print(f"Balance: {wallet['balance']:,}")
        print(f"Available: {wallet['available_balance']:,}")
        print(f"Hold: {wallet['hold_balance']:,}")
    else:
        print("Error:", result.get('error'))

    wallet_manager.close()

if __name__ == "__main__":
    get_wallet_detail()
```

</TabItem>

</Tabs>

---

### Responses

<Tabs
  defaultValue="wallet-detail-success"
  values={[
    {label: 'Success', value: 'wallet-detail-success'},
    {label: '422 Unprocessable Entity', value: 'wallet-detail-error'},
  ]}
>

<TabItem value="wallet-detail-success">

```json
{
    "data": {
        "uuid": "9d5e8c12-3f4a-4b2d-8e1c-6f7a8b9c0d1e",
        "balance": 150000,
        "available_balance": 145000,
        "hold_balance": 5000,
        "status": "active",
        "currency": "USD"
    }
}
```

</TabItem>

<TabItem value="wallet-detail-error">

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "wallet_id": [
            "Wallet not found or does not belong to you."
        ]
    }
}
```

</TabItem>

</Tabs>

> **Wallet Ownership:** The API validates that the requested wallet belongs to the authenticated merchant. You can only access wallets associated with your account.
>
> **Balance Calculation:** The `available_balance` is calculated as: total balance minus `hold_balance`. The `hold_balance` represents funds temporarily locked for pending transactions.
