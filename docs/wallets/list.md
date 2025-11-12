---
id: wallets-list
slug: /wallets/list
title: List Wallets
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## List Wallets

Retrieve all wallets belonging to the authenticated merchant with positive balance. This endpoint returns wallet information including balances and currency details.

**Endpoint:**  
`GET /api/v1/wallets`

### Request Headers

| Header            | Value               | Required | Description                  |
|-------------------|---------------------|:--------:|------------------------------|
| `Accept`          | `application/json`  | ✅       | Request content type         |
| `X-MERCHANT-KEY`  | `\\{merchant_key\\}`    | ✅       | Your API Secret Key          |
| `X-API-KEY`       | `\\{api_key\\}`         | ✅       | Your API Key                 |

---

### Code Examples

<Tabs
  defaultValue="curl-wallets"
  values={[
    {label: 'cURL', value: 'curl-wallets'},
    {label: 'PHP / Laravel', value: 'php-wallets'},
    {label: 'Node.js', value: 'node-wallets'},
    {label: 'Python', value: 'python-wallets'},
  ]}
>

<TabItem value="curl-wallets">

```bash
# Get all wallets with positive balance
curl -X GET "/api/v1/wallets" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: your_merchant_key_here" \
  -H "X-API-KEY: your_api_key_here"
```

</TabItem>

<TabItem value="php-wallets">

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
     * Get all wallets with positive balance
     *
     * @return array Response with success status and wallets data
     */
    public function getWallets(): array
    {
        try {
            $response = Http::timeout(60)
                ->withHeaders([
                    'Accept' => 'application/json',
                    'X-MERCHANT-KEY' => $this->merchantKey,
                    'X-API-KEY' => $this->apiKey,
                ])
                ->get("{$this->baseUrl}/wallets");

            if ($response->successful()) {
                $wallets = $response->json('data');

                return [
                    'success' => true,
                    'wallets' => $wallets,
                    'count' => count($wallets)
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

$result = $walletManager->getWallets();

if ($result['success']) {
    echo "Found {$result['count']} wallets:\n";
    foreach ($result['wallets'] as $wallet) {
        echo "- {$wallet['currency']}: " . number_format($wallet['available_balance']) . "\n";
    }
} else {
    echo "Error: " . $result['error'];
}
```

</TabItem>

<TabItem value="node-wallets">

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
     * Get all wallets with positive balance
     * @returns {Promise<Object>} Response with success status and wallets data
     */
    async getWallets() {
        try {
            const response = await axios.get(`${this.baseUrl}/wallets`, {
                headers: {
                    'Accept': 'application/json',
                    'X-MERCHANT-KEY': this.merchantKey,
                    'X-API-KEY': this.apiKey
                },
                timeout: 30000
            });

            if (response.status === 200) {
                const wallets = response.data.data;

                return {
                    success: true,
                    wallets: wallets,
                    count: wallets.length
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
async function listWallets() {
    const walletManager = WalletManager.getInstance(
        process.env.MERCHANT_KEY,
        process.env.API_KEY
    );

    try {
        const result = await walletManager.getWallets();

        if (result.success) {
            console.log(`Found ${result.count} wallets:`);
            result.wallets.forEach(wallet => {
                console.log(`- ${wallet.currency}: ${wallet.available_balance.toLocaleString()}`);
            });
        } else {
            console.error('Wallet retrieval failed:', result.error);
        }
    } catch (error) {
        console.error('Wallet fetch failed:', error.message);
    }
}

module.exports = { WalletManager, listWallets };
```

</TabItem>

<TabItem value="python-wallets">

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

    def get_wallets(self) -> Dict[str, Any]:
        """
        Get all wallets with positive balance

        Returns:
            Dictionary with success status and wallets data
        """
        try:
            logger.info("Fetching wallets...")

            response = self.session.get(
                f"{self.base_url}/wallets",
                timeout=self.timeout
            )

            if response.status_code == 200:
                data = response.json()
                wallets = data.get('data', [])

                logger.info(f"Successfully retrieved {len(wallets)} wallets")
                return {
                    'success': True,
                    'wallets': wallets,
                    'count': len(wallets)
                }

            return {
                'success': False,
                'error': f'HTTP {response.status_code}: {response.text}',
                'status_code': response.status_code
            }

        except requests.exceptions.RequestException as e:
            logger.error(f"Network error during wallet fetch: {str(e)}")
            return {
                'success': False,
                'error': f'Network error: {str(e)}',
                'type': 'network_error'
            }
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'type': 'unexpected_error'
            }

    def close(self):
        """Close the session"""
        self.session.close()

# Usage Example
def list_wallets():
    """Example usage of the wallet manager"""
    import os

    try:
        # Initialize with environment variables
        wallet_manager = WalletManager.get_instance(
            merchant_key=os.getenv('MERCHANT_KEY'),
            api_key=os.getenv('API_KEY'),
            timeout=30
        )

        result = wallet_manager.get_wallets()

        if result['success']:
            print(f"Found {result['count']} wallets:")
            for wallet in result['wallets']:
                print(f"- {wallet['currency']}: {wallet['available_balance']:,}")
        else:
            print(f"Wallet fetch failed: {result.get('error')}")
            raise Exception(result.get('error'))

    except Exception as e:
        logger.error(f"Wallet retrieval failed: {str(e)}")
        raise
    finally:
        # Always close the session
        if 'wallet_manager' in locals():
            wallet_manager.close()

if __name__ == "__main__":
    list_wallets()
```

</TabItem>

</Tabs>

---

### Responses

<Tabs
  defaultValue="wallets-success"
  values={[
    {label: 'Success', value: 'wallets-success'},
    {label: '401 Unauthorized', value: 'wallets-unauthorized'},
  ]}
>

<TabItem value="wallets-success">

```json
{
    "data": [
        {
            "uuid": "9d5e8c12-3f4a-4b2d-8e1c-6f7a8b9c0d1e",
            "balance": 150000,
            "available_balance": 145000,
            "hold_balance": 5000,
            "status": "active",
            "currency": "USD"
        },
        {
            "uuid": "8c4d7b11-2e3a-4a1c-7d0b-5e6a7b8c9d0e",
            "balance": 2500000,
            "available_balance": 2450000,
            "hold_balance": 50000,
            "status": "active",
            "currency": "IDR"
        }
    ]
}
```

</TabItem>

<TabItem value="wallets-unauthorized">

```json
{
    "error": "Unauthorized. Invalid or missing API credentials."
}
```

</TabItem>

</Tabs>

---

### Response Fields

| Field               | Type    | Description                                                   |
|---------------------|---------|---------------------------------------------------------------|
| `uuid`              | string  | Unique identifier for the wallet                              |
| `balance`           | integer | Total wallet balance (in smallest currency unit)              |
| `available_balance` | integer | Available balance for withdrawal (balance - hold_balance)     |
| `hold_balance`      | integer | Amount currently hold/locked for pending transactions         |
| `status`            | string  | Wallet status (active, inactive, suspended)                   |
| `currency`          | string  | Currency code (USD, EUR, IDR, etc.)                           |

---

> **Note:** This endpoint only returns wallets with a positive balance. Empty wallets (balance = 0) are automatically filtered out.

