---
id: base-url-environment-v2
title: Base URL dan Environment
sidebar_position: 3
---

## Base URL dan Environment

Gunakan base URL spesifik per environment untuk memisahkan trafik pengembangan/pengujian dari trafik produksi.

## Environment

| Environment | Base URL | Use Case |
|---|---|---|
| Sandbox | `https://sandbox.ilonapay.com` | Development, QA, UAT, dan pengujian integrasi |
| Production | `https://production.ilonapay.com` | Trafik pembayaran live |

## Aturan Environment

- Jangan pernah mencampur kredensial sandbox dengan URL production.
- Pisahkan API key dan access token per environment.
- Validasi endpoint webhook dan signature secara terpisah per environment.
- Jalankan smoke test end-to-end di sandbox sebelum rilis ke production.

## Konvensi Path Endpoint

Semua path endpoint dalam dokumentasi ini relatif terhadap base URL yang dipilih.

Contoh:

```bash
GET /api/v2/transactions/{trxId}
```
