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

---

## Fitur Khusus Sandbox

- **Pengujian Tak Terbatas:** Tidak ada batas jumlah transaksi atau panggilan API pengujian.
- **Webhook Real-time:** Uji notifikasi webhook dengan data transaksi sandbox.

---

## Siap ke Produksi?

> **Setelah seluruh skenario diuji tuntas di sandbox, beralihlah ke mode produksi, perbarui kredensial, dan ubah header X-Environment menjadi "production".**
