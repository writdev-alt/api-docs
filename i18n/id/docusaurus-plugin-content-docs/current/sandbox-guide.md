---
id: sandbox-guide
title: Panduan Pengujian Sandbox
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Panduan Pengujian Sandbox

Panduan lengkap untuk menguji integrasi API di lingkungan sandbox. Uji semua fitur dengan aman tanpa memproses uang nyata.

---

## Lingkungan Sandbox

> **Mode sandbox menyediakan lingkungan pengujian lengkap yang mencerminkan fungsionalitas produksi. Seluruh transaksi disimulasikan tanpa dana nyata.**

---

## Memulai dengan Sandbox

### 1. Dapatkan Kredensial Sandbox

- Masuk ke dasbor merchant Anda
- Buka **API Configuration**
- Pindahkan ke `Sandbox Mode`
- Salin kredensial berawalan sandbox

### 2. Konfigurasi Integrasi Anda

- Gunakan domain sandbox: `sandbox.{your-domain}` (contoh `sandbox.api.example.com`)
- Gunakan kredensial API berawalan sandbox
- Konfigurasi endpoint webhook untuk pengujian
- Aktifkan mode sandbox di pengaturan merchant

---

## Kredensial Sandbox

| Jenis Kredensial | Format Sandbox | Format Produksi | Tujuan |
|-----------------|-----------------------|-----------------------|--------------------------------|
| **API Key** | `api_xxxxxxxxxx` | `api_xxxxxxxxxx` | Autentikasi permintaan API |
| **Merchant Key** | `merchant_xxxxx` | `merchant_xxxxx` | Identifikasi merchant |
| **Webhook Secret** | `webhook_secret` | `webhook_secret` | Verifikasi tanda tangan IPN |

---

## Skenario Pengujian Komprehensif

### Pengujian Pembayaran

- **Pembayaran Berhasil:** Uji alur transaksi sukses.
- **Pembayaran Gagal:** Uji skenario saldo tidak mencukupi.
- **Pembayaran Tertunda:** Uji penanganan transaksi pending.
- **Pembayaran Dibatalkan:** Uji alur pembatalan oleh pengguna.

### Pengujian Dompet & Fitur

- **Multi-Mata Uang:** Uji mata uang USD, EUR, BDT.
- **Kartu Virtual:** Uji penerbitan dan manajemen kartu.
- **Deposit & Penarikan:** Uji metode pendanaan dompet.
- **Verifikasi KYC:** Uji alur verifikasi dokumen.

---

## Fitur Khusus Sandbox

- **Penandaan Transaksi:** Semua transaksi sandbox diberi keterangan `SANDBOX_TRANSACTION` dalam field remarks.
- **Pengujian Tak Terbatas:** Tidak ada batas jumlah transaksi atau panggilan API pengujian.
- **Webhook Real-time:** Uji notifikasi webhook dengan data transaksi sandbox.

---

## Contoh Integrasi Sandbox

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
// Contoh Integrasi Sandbox
class SandboxTester
{
    private $apiKey = 'your_api_key_here';
    private $merchantKey = 'merchant_your_key_here';
    private $environment = 'sandbox';
    private $baseUrl = 'https://sandbox.api.example.com/api/v1'; // ganti dengan host sandbox Anda

    public function testPaymentFlow()
    {
        // 1. Inisiasi pembayaran
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

            // 2. Simulasikan penyelesaian pembayaran dan verifikasi
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

// Jalankan pengujian sandbox
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
        this.baseUrl = 'https://sandbox.api.example.com/api/v1'; // ganti dengan host sandbox Anda
    }

    async testPaymentFlow() {
        try {
            // 1. Inisiasi pembayaran
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

                // 2. Simulasikan verifikasi
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

// Jalankan pengujian sandbox
const tester = new SandboxTester();
tester.testPaymentFlow();
```

</TabItem>

<TabItem value="curl-sandbox">

```bash
#!/bin/bash
# Script Pengujian Sandbox

# Konfigurasi
API_KEY="your_api_key_here"
MERCHANT_KEY="merchant_your_key_here"
ENVIRONMENT="sandbox"
BASE_URL="https://sandbox.api.example.com/api/v1" # ganti dengan host sandbox Anda

# Uji inisiasi pembayaran
echo "Mengujicoba inisiasi pembayaran..."
curl -X POST "${BASE_URL}/initiate-payment" \
  -H "X-Environment: ${ENVIRONMENT}" \
  -H "X-API-KEY: ${API_KEY}" \
  -H "X-MERCHANT-KEY: ${MERCHANT_KEY}" \
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

# Uji verifikasi pembayaran
echo -e "\nMengujicoba verifikasi pembayaran..."
TRX_ID="TXN123456789"  # Ganti dengan ID transaksi sebenarnya
curl -X GET "${BASE_URL}/verify-payment/${TRX_ID}" \
  -H "X-Environment: ${ENVIRONMENT}" \
  -H "X-API-KEY: ${API_KEY}" \
  -H "X-MERCHANT-KEY: ${MERCHANT_KEY}" \
  -H "Accept: application/json" | jq .
```

</TabItem>

</Tabs>

---

## Praktik Terbaik Sandbox

### ✅ Hal yang Perlu Dilakukan

- Selalu uji di sandbox sebelum ke produksi.
- Uji seluruh skenario pembayaran (sukses, gagal, pending).
- Verifikasi penanganan webhook/IPN secara menyeluruh.
- Uji dengan berbagai mata uang dan nominal.
- Simpan kredensial di environment variables.
- Catat semua interaksi API untuk debugging.
- Uji penanganan galat dan kasus tepi.

### ❌ Hal yang Harus Dihindari

- Jangan gunakan kredensial produksi di sandbox.
- Jangan melewatkan verifikasi tanda tangan webhook.
- Jangan hardcode kredensial dalam kode.
- Jangan mengabaikan respons error.
- Jangan gunakan data pelanggan sebenarnya saat pengujian.
- Jangan deploy tanpa pengujian menyeluruh.
- Jangan mencampur data sandbox dan produksi.

---

## Masalah Umum & Solusinya

### Autentikasi Gagal (401 Unauthorized)

**Penyebab Umum:**

- Menggunakan kredensial produksi di sandbox.
- Header `X-Environment` hilang atau salah.
- Format API key atau merchant key tidak valid.
- Mode sandbox belum diaktifkan di pengaturan merchant.

**Solusi:**

- Pastikan menggunakan kredensial berawalan sandbox.
- Pastikan `X-Environment: sandbox` dikirim.
- Periksa kredensial di dasbor merchant.
- Aktifkan mode sandbox di pengaturan merchant.

---

### Sandbox Disabled Error (403 Forbidden)

**Penyebab:** Mode sandbox belum diaktifkan untuk akun merchant Anda.

**Solusi:**

- Masuk ke dasbor merchant.
- Buka API Configuration.
- Aktifkan "Sandbox Mode".
- Generate kredensial pengujian jika belum tersedia.

---

### Webhook Tidak Diterima

**Langkah Pemecahan Masalah:**

- Pastikan URL webhook dapat diakses publik.
- Pastikan server menerima permintaan POST.
- Pastikan endpoint webhook mengembalikan status 200 OK.
- Periksa log server untuk permintaan masuk.
- Gunakan alat seperti ngrok untuk pengujian lokal.
- Verifikasi kode pemeriksaan tanda tangan webhook.

---

## Siap ke Produksi?

> **Setelah seluruh skenario diuji tuntas di sandbox, beralihlah ke mode produksi, perbarui kredensial, dan ubah header X-Environment menjadi "production".**
