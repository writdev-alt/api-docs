---
id: faq-v2
title: FAQ
sidebar_position: 14
---

## FAQ

### Environment apa yang sebaiknya dipakai untuk testing?
Gunakan sandbox: `https://sandbox.ilonapay.com`.

### Bagaimana cara autentikasi request API?
Gunakan `Authorization: Bearer {token}` dan `X-API-KEY: {apiKey}`.

### Apa yang harus disimpan untuk rekonsiliasi?
Simpan `trxId` dan `trxReference`.

### Apakah saya harus polling status transaksi terus-menerus?
Gunakan interval polling yang wajar dan berhenti saat status final. Jika tersedia, utamakan pembaruan via webhook.

### Bagaimana cara menangani validation error?
Cek HTTP `422`, lalu parse objek `errors` per field.
