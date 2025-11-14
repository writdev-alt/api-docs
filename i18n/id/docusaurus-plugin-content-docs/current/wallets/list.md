---
id: wallets-list
slug: /wallets/list
title: Daftar Dompet
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Daftar Dompet

Ambil semua dompet milik merchant yang terautentikasi dengan saldo positif. Endpoint ini mengembalikan informasi dompet termasuk saldo dan detail mata uang.

**Endpoint:**  
`GET /api/v1/wallets`

### Header Permintaan

| Header            | Value               | Wajib | Deskripsi                  |
|-------------------|---------------------|:-----:|----------------------------|
| `Accept`          | `application/json`  | ✅    | Tipe konten permintaan     |
| `X-MERCHANT-KEY`  | `{merchant_key}`    | ✅    | Kunci API Rahasia Anda     |
| `X-API-KEY`       | `{api_key}`         | ✅    | API Key Anda               |

---

### Contoh Kode

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
# Ambil semua dompet dengan saldo positif
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
     * Ambil semua dompet dengan saldo positif
     *
     * @return array Response dengan status sukses dan data dompet
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

// Contoh Penggunaan
$walletManager = WalletManager::getInstance(
    env('MERCHANT_KEY'),
    env('API_KEY')
);

$result = $walletManager->getWallets();

if ($result['success']) {
    echo "Ditemukan {$result['count']} dompet:\n";
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
     * Ambil semua dompet dengan saldo positif
     * @returns {Promise<Object>} Response dengan status sukses dan data dompet
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

// Contoh Penggunaan
async function listWallets() {
    const walletManager = WalletManager.getInstance(
        process.env.MERCHANT_KEY,
        process.env.API_KEY
    );

    try {
        const result = await walletManager.getWallets();

        if (result.success) {
            console.log(`Ditemukan ${result.count} dompet:`);
            result.wallets.forEach(wallet => {
                console.log(`- ${wallet.currency}: ${wallet.available_balance.toLocaleString()}`);
            });
        } else {
            console.error('Pengambilan dompet gagal:', result.error);
        }
    } catch (error) {
        console.error('Pengambilan dompet gagal:', error.message);
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

    def get_wallets(self) -> Dict[str, Any]:
        """
        Ambil semua dompet dengan saldo positif

        Returns:
            Dictionary dengan status sukses dan data dompet
        """
        try:
            logger.info("Mengambil dompet...")

            response = self.session.get(
                f"{self.base_url}/wallets",
                timeout=self.timeout
            )

            if response.status_code == 200:
                data = response.json()
                wallets = data.get('data', [])

                logger.info(f"Berhasil mengambil {len(wallets)} dompet")
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
            logger.error(f"Error jaringan saat mengambil dompet: {str(e)}")
            return {
                'success': False,
                'error': f'Network error: {str(e)}',
                'type': 'network_error'
            }
        except Exception as e:
            logger.error(f"Error tidak terduga: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'type': 'unexpected_error'
            }

    def close(self):
        """Tutup session"""
        self.session.close()

# Contoh Penggunaan
def list_wallets():
    """Contoh penggunaan wallet manager"""
    import os

    try:
        # Inisialisasi dengan environment variables
        wallet_manager = WalletManager.get_instance(
            merchant_key=os.getenv('MERCHANT_KEY'),
            api_key=os.getenv('API_KEY'),
            timeout=30
        )

        result = wallet_manager.get_wallets()

        if result['success']:
            print(f"Ditemukan {result['count']} dompet:")
            for wallet in result['wallets']:
                print(f"- {wallet['currency']}: {wallet['available_balance']:,}")
        else:
            print(f"Pengambilan dompet gagal: {result.get('error')}")
            raise Exception(result.get('error'))

    except Exception as e:
        logger.error(f"Pengambilan dompet gagal: {str(e)}")
        raise
    finally:
        # Selalu tutup session
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
            "uuid": "1234567890",
            "balance": 150000,
            "available_balance": 145000,
            "hold_balance": 5000,
            "status": "active",
            "currency": "USD"
        },
        {
            "uuid": "1234567891",
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

### Field Response

| Field               | Tipe    | Deskripsi                                                   |
|---------------------|---------|-------------------------------------------------------------|
| `uuid`              | string  | Identifikasi unik untuk dompet                              |
| `balance`           | integer | Total saldo dompet (dalam satuan mata uang terkecil)        |
| `available_balance` | integer | Saldo tersedia untuk penarikan (balance - hold_balance)     |
| `hold_balance`      | integer | Jumlah yang saat ini ditahan/dikunci untuk transaksi tertunda |
| `status`            | string  | Status dompet (active, inactive, suspended)                  |
| `currency`          | string  | Kode mata uang (USD, EUR, IDR, dll.)                        |

---

> **Catatan:** Endpoint ini hanya mengembalikan dompet dengan saldo positif. Dompet kosong (saldo = 0) secara otomatis difilter.

