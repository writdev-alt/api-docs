---
id: sdk-code-examples-v2
title: SDK dan Contoh Kode
sidebar_position: 13
---

## SDK dan Contoh Kode

Contoh saat ini tersedia dalam cURL, PHP, Node.js, dan Python di berbagai halaman endpoint.

## Alur Kerja Integrasi

1. Autentikasi dan dapatkan bearer token.
2. Panggil endpoint pembuatan transaksi.
3. Cek status melalui endpoint transaksi.
4. Tangani notifikasi webhook untuk pembaruan asinkron.

## Komponen SDK Internal yang Disarankan

- `AuthClient` untuk manajemen siklus hidup token
- `PaymentsClient` untuk operasi QRIS/VA
- `PayoutClient` untuk alur withdrawal
- `WebhookVerifier` untuk validasi signature

## Konvensi Penamaan (Saran)

- Gunakan camelCase untuk key payload.
- Simpan `trxId` dan `trxReference` untuk rekonsiliasi.
- Buat kebijakan timeout, retry, dan idempotensi dapat dikonfigurasi.
