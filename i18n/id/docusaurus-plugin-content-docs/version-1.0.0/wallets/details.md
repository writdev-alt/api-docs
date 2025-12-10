---
id: wallets-details
slug: /wallets/details
title: Detail Dompet
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Detail Dompet

Ambil informasi detail tentang dompet tertentu menggunakan identifikasi uniknya (UUID). Endpoint ini menyediakan informasi dompet lengkap termasuk semua detail saldo.

**Endpoint:**  
`GET /api/v1/wallets/{uuid}`

### Header Permintaan

| Header            | Value               | Wajib | Deskripsi              |
|-------------------|---------------------|:-----:|------------------------|
| `Accept`          | `application/json`  | ✅    | Tipe konten permintaan |
| `X-MERCHANT-KEY`  | `{merchant_key}`    | ✅    | Kunci API Rahasia Anda |
| `X-API-KEY`       | `{api_key}`         | ✅    | API Key Anda           |

### Path Parameters

| Parameter | Tipe   | Wajib | Deskripsi                                                   |
|-----------|--------|:-----:|-------------------------------------------------------------|
| `uuid`    | string | ✅    | UUID Dompet (contoh: 1234567890)                            |

---

### Contoh Kode

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
     * Ambil detail dompet berdasarkan UUID
     *
     * @param string $uuid UUID Dompet
     * @return array Response dengan status sukses dan data dompet
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

// Contoh Penggunaan
$walletManager = WalletManager::getInstance(
    env('MERCHANT_KEY'),
    env('API_KEY')
);

$walletUuid = '1234567890';
$result = $walletManager->getWalletDetail($walletUuid);

if ($result['success']) {
    $wallet = $result['wallet'];
    echo "Detail Dompet:\n";
    echo "Mata Uang: {$wallet['currency']}\n";
    echo "Saldo: " . number_format($wallet['balance']) . "\n";
    echo "Tersedia: " . number_format($wallet['available_balance']) . "\n";
    echo "Ditahan: " . number_format($wallet['hold_balance']) . "\n";
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
     * Ambil detail dompet berdasarkan UUID
     * @param {string} uuid - UUID Dompet
     * @returns {Promise<Object>} Response dengan status sukses dan data dompet
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

// Contoh Penggunaan
async function getWallet() {
    const walletManager = WalletManager.getInstance(
        process.env.MERCHANT_KEY,
        process.env.API_KEY
    );

    const walletUuid = '1234567890';

    try {
        const result = await walletManager.getWalletDetail(walletUuid);

        if (result.success) {
            const wallet = result.wallet;
            console.log('Detail Dompet:');
            console.log(`Mata Uang: ${wallet.currency}`);
            console.log(`Saldo: ${wallet.balance.toLocaleString()}`);
            console.log(`Tersedia: ${wallet.available_balance.toLocaleString()}`);
            console.log(`Ditahan: ${wallet.hold_balance.toLocaleString()}`);
        } else {
            console.error('Pengambilan dompet gagal:', result.error);
        }
    } catch (error) {
        console.error('Pengambilan dompet gagal:', error.message);
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
    Manajemen Dompet untuk IlonaPay Payment Gateway
    """

    def __init__(self, merchant_key: str, api_key: str, timeout: int = 30):
        """
        Inisialisasi wallet manager

        Args:
            merchant_key: Merchant key Anda
            api_key: API key Anda
            timeout: Timeout permintaan dalam detik
        """
        self.merchant_key = merchant_key
        self.api_key = api_key
        self.base_url = '/api/v1'
        self.timeout = timeout

        # Konfigurasi session
        self.session = requests.Session()
        self.session.headers.update({
            'Accept': 'application/json',
            'X-MERCHANT-KEY': self.merchant_key,
            'X-API-KEY': self.api_key
        })

    @classmethod
    def get_instance(cls, merchant_key: str, api_key: str, **kwargs) -> 'WalletManager':
        """Factory method untuk membuat instance"""
        return cls(merchant_key, api_key, **kwargs)

    def get_wallet_detail(self, uuid: str) -> Dict[str, Any]:
        """
        Ambil detail dompet berdasarkan UUID

        Args:
            uuid: UUID Dompet

        Returns:
            Dictionary dengan status sukses dan data dompet
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

# Contoh Penggunaan
def get_wallet_detail():
    import os

    wallet_manager = WalletManager.get_instance(
        merchant_key=os.getenv('MERCHANT_KEY'),
        api_key=os.getenv('API_KEY'),
        timeout=30
    )
    wallet_uuid = '1234567890'
    result = wallet_manager.get_wallet_detail(wallet_uuid)

    if result['success']:
        wallet = result['wallet']
        print("Detail Dompet:")
        print(f"Mata Uang: {wallet['currency']}")
        print(f"Saldo: {wallet['balance']:,}")
        print(f"Tersedia: {wallet['available_balance']:,}")
        print(f"Ditahan: {wallet['hold_balance']:,}")
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
        "uuid": "1234567890",
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

> **Kepemilikan Dompet:** API memvalidasi bahwa dompet yang diminta milik merchant yang terautentikasi. Anda hanya dapat mengakses dompet yang terkait dengan akun Anda.
>
> **Perhitungan Saldo:** `available_balance` dihitung sebagai: total saldo dikurangi `hold_balance`. `hold_balance` mewakili dana yang sementara dikunci untuk transaksi tertunda.

