---
id: webhooks
title: Webhook (IPN)
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook (IPN)

IlonaPay mengirim notifikasi real-time ke URL IPN yang Anda tentukan ketika status pembayaran berubah. Dengan demikian Anda dapat segera mengetahui pembayaran yang berhasil, gagal, atau status lainnya.

Konfigurasikan endpoint webhook Anda untuk menerima notifikasi pembayaran secara instan. Antarmuka konfigurasi webhook memungkinkan Anda mengatur URL endpoint, mengaktifkan atau menonaktifkan webhook, memverifikasi sertifikat SSL, dan menguji integrasi webhook Anda.

![Antarmuka Konfigurasi Webhook](/img/webhook.png)

> **Pengiriman Andal**  
> IlonaPay menerapkan logika retry pada pengiriman webhook yang gagal. Sistem akan mencoba ulang hingga 5 kali dengan pola eksponensial.

---

## Header Webhook

| Header | Deskripsi | Contoh |
|---------|-------------------------------|-----------------------------|
| `X-IPN-SIGNATURE` | Penandatanganan HMAC-SHA256 untuk memverifikasi integritas payload. | `f4f9c7e9e2f...` |
| `X-IPN-TIMESTAMP` | Timestamp UNIX ketika webhook dikirim. | `1715606400` |
| `Content-Type` | Format payload webhook. | `application/json` |

Gunakan header di atas untuk memverifikasi bahwa webhook berasal dari IlonaPay dan belum diubah selama proses pengiriman.

---

## Payload Webhook

<Tabs
  defaultValue="receive-payment"
  values={[
    {label: 'Status Pembayaran', value: 'receive-payment'},
    {label: 'Status Penarikan Dana', value: 'withdraw'},
  ]}
>

<TabItem value="receive-payment">

Contoh payload untuk status pembayaran yang diperbarui:

```json
{
  "event": "receive_payment",
  "data": {
    "trx_id": "TRXJ0LFYU8CAT",
    "trx_reference": "37c84bdb-e6b7-4893-9b02-e4931d90cdce",
    "rrn": "fb96da8d931c",
    "amount": "1000.00",
    "currency_code": "IDR",
    "description": "Receive Payment from QRIS",
    "customer_name": "John Doe",
    "customer_email": "john@doe.com",
    "customer_phone": "62323232222",
    "merchant_id": 1,
    "merchant_name": "Demo Brand",
    "payment_method": "QRIS"
  },
  "message": "Receive Payment via QRIS",
  "status": "completed",
  "timestamp": 1762927877
}
```

</TabItem>

<TabItem value="withdraw">

Contoh payload untuk status penarikan dana:

```json
{
  "event": "withdraw",
  "data": {
    "trx_id": "TRX-2025.11.14-1-BDH2JD8NNY170XO",
    "trx_reference": "95a190c6-ee73-488b-a386-382310f2d0c1",
    "amount": 50000,
    "net_amount": 50000,
    "payable_amount": 54000,
    "currency_code": "IDR",
    "status": "completed",
    "description": "Withdrawal request is completed by Bank Partner",
    "merchant_id": 1,
    "merchant_name": "Demo Brand",
    "withdrawal_method": "Bank Transfer",
    "account_name": "John Doe",
    "account_holder_name": "John Doe",
    "account_bank_name": "John Doe",
    "account_number": "123456789",
    "account_bank_code": "01",
    "trx_fee": 2000,
    "remarks": "Withdrawal request is completed by Financial Institution",
    "environment": "production",
    "is_sandbox": false
  },
  "message": "Withdrawal request is completed by Financial Institution",
  "timestamp": 1763101871
}
```

</TabItem>

</Tabs>

### Field Penting

| Field | Deskripsi |
|-------|-----------|
| `event` | Jenis event webhook. Contoh: `payment.updated`. |
| `timestamp` | Waktu pengiriman dalam detik UNIX. |
| `data.trx_id` | ID transaksi internal IlonaPay. |
| `data.ref_trx` | Referensi transaksi merchant (jika ada). |
| `data.status` | Status terkini transaksi. |
| `data.amount` | Jumlah transaksi dalam satuan terkecil mata uang. |
| `data.currency_code` | Kode mata uang ISO 4217. |
| `data.customer` | Informasi pelanggan (opsional). |

---

## Status Webhook

| Event | Deskripsi |
|--------|-----------|
| `payment.created` | Transaksi baru dibuat. |
| `payment.pending` | Transaksi menunggu konfirmasi pembayaran. |
| `payment.completed` | Pembayaran berhasil diproses. |
| `payment.failed` | Pembayaran gagal. |
| `payment.canceled` | Pembayaran dibatalkan. |
| `payment.refunded` | Pembayaran dikembalikan. |

---

## Verifikasi Webhook

Langkah-langkah memverifikasi payload webhook:

1. Baca header `X-IPN-SIGNATURE` dan `X-IPN-TIMESTAMP`.
2. Ambil secret webhook dari dasbor merchant Anda.
3. Bentuk string: `timestamp + '.' + body`.
4. Hitung HMAC-SHA256 menggunakan secret webhook Anda.
5. Bandingkan hasilnya dengan `X-IPN-SIGNATURE` (gunakan perbandingan waktu konstan).

### Contoh Verifikasi

<Tabs
  defaultValue="node-verify"
  values={[
    {label: 'Node.js', value: 'node-verify'},
    {label: 'Python', value: 'python-verify'},
    {label: 'PHP', value: 'php-verify'},
  ]}
>

<TabItem value="node-verify">

```javascript
const crypto = require('crypto');

function verifySignature({signature, timestamp, body, secret}) {
  const payload = `${timestamp}.${body}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(signature, 'hex')
  );
}
```

</TabItem>

<TabItem value="python-verify">

```python
import hmac
import hashlib


def verify_signature(signature: str, timestamp: str, body: str, secret: str) -> bool:
    payload = f"{timestamp}.{body}".encode("utf-8")
    expected_signature = hmac.new(
        secret.encode("utf-8"),
        payload,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(expected_signature, signature)
```

</TabItem>

<TabItem value="php-verify">

```php
<?php

function verifySignature(string $signature, string $timestamp, string $body, string $secret): bool
{
    $payload = $timestamp . '.' . $body;
    $expectedSignature = hash_hmac('sha256', $payload, $secret);

    return hash_equals($expectedSignature, $signature);
}
```

</TabItem>

</Tabs>

---

## Menangani Webhook

Berikut pola dasar untuk menangani webhook di server Anda:

1. Periksa method HTTP (IlonaPay menggunakan POST).
2. Baca header `X-IPN-SIGNATURE` dan `X-IPN-TIMESTAMP`.
3. Baca body mentah permintaan.
4. Verifikasi signature menggunakan secret webhook.
5. Parsing payload JSON.
6. Perbarui status transaksi di sistem Anda.
7. Kembalikan respons `200 OK` agar IlonaPay tahu webhook berhasil diterima.

> **Catatan**: Selalu balas dalam waktu kurang dari 5 detik. Jika lebih lama, webhook akan diulang.

### Contoh Handler Express.js

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json({verify: rawBodySaver}));

const WEBHOOK_SECRET = process.env.ILONA_WEBHOOK_SECRET;

function rawBodySaver(req, res, buf) {
  req.rawBody = buf.toString();
}

app.post('/webhook', (req, res) => {
  const signature = req.header('X-IPN-SIGNATURE');
  const timestamp = req.header('X-IPN-TIMESTAMP');

  if (!signature || !timestamp) {
    return res.status(400).send('Missing headers');
  }

  const payload = `${timestamp}.${req.rawBody}`;
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(signature, 'hex')
  );

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;
  // TODO: tangani event sesuai kebutuhan bisnis

  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Webhook listener berjalan di port 3000');
});
```

---

## Tips Keamanan

- Simpan secret webhook secara aman (contoh: Secrets Manager).
- Pastikan endpoint webhook hanya menerima HTTPS.
- Lindungi endpoint dari serangan replay dengan memeriksa timestamp.
- Gunakan rate limiting untuk mencegah flood.
- Catat seluruh webhook untuk debugging dan audit.

---

## Menguji Webhook

Gunakan mode sandbox untuk mengirim webhook percobaan dari dasbor merchant.

1. Buka **Settings → Webhooks**.
2. Masukkan URL webhook sandbox Anda (contoh: `https://ngrok.io/webhook`).
3. Klik **Send Test Webhook**.
4. Lihat log server Anda untuk memastikan payload diterima.

Anda juga dapat menggunakan alat seperti `curl` untuk menyimulasikan webhook secara manual selama proses pengembangan.
