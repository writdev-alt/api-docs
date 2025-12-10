---
id: wallets-index
slug: /wallets
title: Ringkasan Dompet
sidebar_position: 1
---

## Dompet

Kelola dan ambil informasi dompet untuk akun merchant yang terautentikasi. Gunakan endpoint ini untuk melihat daftar dompet Anda dan memeriksa saldo detail untuk satu dompet.

---

### Endpoint yang Tersedia

- `GET /api/v1/wallets` — Ambil semua dompet yang saat ini memiliki saldo positif.
- `GET /api/v1/wallets/{uuid}` — Ambil informasi detail untuk dompet tertentu berdasarkan UUID.

> **Tip:** API dompet selalu mengembalikan jumlah dalam satuan mata uang terkecil. Konversikan ke satuan utama (misalnya, sen ke dolar) sebelum menampilkan nilai kepada pengguna akhir.

