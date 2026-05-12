---
id: error-handling-v2
title: Penanganan Error
sidebar_position: 6
---

## Penanganan Error

Error API mengikuti struktur JSON yang konsisten agar penanganan di sisi client lebih sederhana.

## Format Respons Error

```json
{
  "code": 4220211,
  "message": "The given data was invalid.",
  "errors": {
    "amount": [
      "amount must be between Rp 100.000 and Rp 5.000.000"
    ]
  }
}
```

## Kelas Error HTTP yang Umum

| HTTP | Arti | Penyebab Umum |
|---|---|---|
| `400` | Bad Request | Format request tidak valid |
| `401` | Unauthorized | Token hilang/tidak valid |
| `404` | Not Found | Resource atau transaksi tidak ditemukan |
| `422` | Validation Error | Validasi bisnis/field gagal |
| `429` | Too Many Requests | Rate limit terlampaui |
| `500` | Server Error | Masalah internal yang tidak terduga |

## Rekomendasi Implementasi

- Tangani berdasarkan HTTP status terlebih dahulu, lalu periksa `code`.
- Tampilkan pesan yang ramah pengguna tetapi simpan respons lengkap untuk diagnosis.
- Retry hanya untuk kondisi transien (`429`, sebagian `5xx`).
