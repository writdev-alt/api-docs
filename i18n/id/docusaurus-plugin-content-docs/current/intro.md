---
id: intro
title: Pengantar
sidebar_position: 1
---

# Pengantar Tutorial

Integrasikan gateway pembayaran IlonaPay ke dalam aplikasi Anda menggunakan RESTful API kami yang komprehensif. Terima pembayaran dari dompet digital, kartu, dan beragam metode pembayaran dengan keamanan kelas enterprise.

> **Lingkungan**  
> Gunakan `https://sandbox.ilonapay.com` untuk pengujian atau pengembangan dan `https://production.ilonapay.com` untuk lalu lintas produksi. Kredensial dan data terisolasi antar lingkungan.

## Autentikasi

IlonaPay API menggunakan API key untuk mengautentikasi permintaan. Anda dapat memperoleh kredensial melalui dasbor merchant.

### Kredensial yang Diperlukan
| Header | Deskripsi | Lokasi |
|--------|-----------|--------|
| X-MERCHANT-KEY | Identitas merchant unik Anda | Dashboard → Merchant → CONFIG |
| X-API-KEY | Kunci autentikasi API | Dashboard → Merchant → CONFIG |

import Admonition from '@theme/Admonition';

<Admonition type="warning">
  Jangan pernah membagikan kredensial API atau Client Secret Anda di kode sisi klien. Simpan informasi sensitif di server secara aman.
</Admonition>
