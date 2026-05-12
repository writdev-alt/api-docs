---
id: intro
slug: /
title: Pengantar
description: Panduan integrasi API v2 untuk autentikasi, pay-in, payout, dan pemantauan transaksi.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dokumentasi API v2

Selamat datang di dokumentasi IlonaPay API v2. Panduan ini menyediakan semua yang dibutuhkan untuk mengintegrasikan alur pembayaran yang aman dan andal pada sistem berbasis web menggunakan RESTful API dan JSON.

:::tip Pemisahan Environment
Gunakan `https://sandbox.ilonapay.com` untuk pengembangan/pengujian dan `https://production.ilonapay.com` untuk trafik produksi. Pisahkan kredensial dan token per environment.
:::

## Ringkasan

API v2 dirancang untuk integrasi backend-to-backend dengan fokus pada:

- Struktur respons JSON yang konsisten
- Autentikasi berbasis token menggunakan JWT
- Konvensi kode respons yang dapat diprediksi
- Pola integrasi yang aman dan skalabel

## Base URL

Gunakan base URL sesuai environment Anda:

- **Sandbox:** `https://sandbox.ilonapay.com`
- **Production:** `https://production.ilonapay.com`

Semua path endpoint dalam dokumentasi ini relatif terhadap base URL yang dipilih.

## Quick Start berdasarkan Use Case

<Tabs defaultValue="payin" values={[
  {label: 'Pay-in', value: 'payin'},
  {label: 'Payout', value: 'payout'},
  {label: 'Monitoring', value: 'monitoring'},
]}>
<TabItem value="payin">

1. Autentikasi dengan [Login](/docs/auth/login-v2).
2. Buat pembayaran menggunakan [Create QRIS](/docs/qris-create) atau [Create Virtual Account](/docs/virtual-account-create).
3. Pantau status lewat [Check Transaction Status](/docs/transactions/check-status) atau [Webhooks](/docs/webhooks-v2).

</TabItem>
<TabItem value="payout">

1. Autentikasi dengan [Login](/docs/auth/login-v2).
2. Ambil metadata tujuan dari [Banks List](/docs/banks/list-v2).
3. (Opsional) Daftarkan tujuan menggunakan [Create Withdrawal Account](/docs/withdraw-account).
4. Kirim payout dengan [Create Withdrawal](/docs/withdraw).

</TabItem>
<TabItem value="monitoring">

1. Simpan `trxId` dan `trxReference` untuk setiap transaksi.
2. Lakukan polling [Check Transaction Status](/docs/transactions/check-status) dengan interval yang aman.
3. Konfigurasikan [Webhooks](/docs/webhooks-v2) untuk pembaruan push yang hampir real-time.

</TabItem>
</Tabs>

## Model Autentikasi

API v2 menggunakan autentikasi bearer token:

1. Autentikasi melalui endpoint login untuk mendapatkan `accessToken`
2. Kirim token pada header request untuk endpoint yang dilindungi:

```http
Authorization: Bearer <accessToken>
```

3. Refresh token sebelum kedaluwarsa (jika alur refresh diaktifkan pada implementasi Anda)

## Standar Request dan Response

### Standar Request

- Gunakan `Content-Type: application/json` untuk payload JSON
- Gunakan `Accept: application/json` untuk menerima respons JSON
- Validasi semua field wajib sebelum mengirim request

### Standar Response

Respons dikembalikan dalam JSON terstruktur:

```json
{
  "code": 2000107,
  "message": "Login successful",
  "data": {}
}
```

- `code`: Kode aplikasi komposit (HTTP + service + case)
- `message`: Hasil dalam bentuk teks yang mudah dibaca
- `data`: Payload untuk operasi yang berhasil
- `errors`: Detail validasi opsional untuk request yang tidak valid

## Memulai

Urutan integrasi yang direkomendasikan:

1. Tinjau referensi kode respons (`Response Code`)
2. Implementasikan autentikasi (`Login`)
3. Integrasikan endpoint master data (`Banks List`, `Wallets List`)
4. Tambahkan alur transaksi bisnis dan penanganan webhook sesuai kebutuhan

:::note Cakupan Dokumentasi
Set dokumentasi ini untuk API v2. Untuk perilaku yang konsisten, selalu validasi logika integrasi terhadap konvensi kode respons dan status v2.
:::

## Praktik Keamanan Terbaik

- Selalu gunakan HTTPS pada environment non-lokal
- Simpan kredensial API dan token pada penyimpanan server-side yang aman
- Jangan pernah mengekspos secret pada kode browser atau log
- Terapkan rate limiting dan monitoring pada endpoint autentikasi
- Rotasi secret dan cabut token yang terkompromi secepatnya

## Versioning dan Kompatibilitas

- Set dokumen ini hanya untuk **API v2**
- Penambahan baru sebisa mungkin tetap backward-compatible
- Breaking change sebaiknya dirilis pada major version baru

## Dukungan

Jika Anda mengalami kendala integrasi, sertakan request ID, endpoint, timestamp, serta contoh payload/response yang sudah disamarkan (tanpa data sensitif) saat menghubungi support.
