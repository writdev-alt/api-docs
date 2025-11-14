---
id: support
title: Dukungan & Kode Error
sidebar_position: 7
---

# Dukungan

## Kode Error

API Ilonapay menggunakan kode respons HTTP standar untuk menunjukkan keberhasilan atau kegagalan permintaan API.

### HTTP Status Codes

| Code | Status                    | Deskripsi                                 |
|:----:|:-------------------------|:--------------------------------------------|
| `200` | **OK**                  | Permintaan berhasil                           |
| `400` | **Bad Request**         | Parameter permintaan tidak valid                  |
| `401` | **Unauthorized**        | Kredensial API tidak valid atau hilang          |
| `403` | **Forbidden**           | Izin tidak cukup                    |
| `404` | **Not Found**           | Resource tidak ditemukan                          |
| `429` | **Too Many Requests**   | Batas rate terlampaui                         |
| `500` | **Internal Server Error** | Terjadi kesalahan server                     |

### API Error Codes

| Error Code            | Deskripsi                            | Solusi                                            |
|-----------------------|----------------------------------------|-----------------------------------------------------|
| `INVALID_CREDENTIALS` | Kredensial API tidak valid       | Periksa Merchant ID dan API Key Anda                  |
| `INSUFFICIENT_FUNDS`  | Pelanggan tidak memiliki dana cukup        | Pelanggan perlu menambahkan dana ke dompet mereka         |
| `PAYMENT_DECLINED`    | Pembayaran ditolak oleh prosesor      | Coba metode pembayaran yang berbeda                      |
| `INVALID_AMOUNT`      | Jumlah pembayaran tidak valid              | Periksa batas minimum dan maksimum jumlah             |
| `INVALID_CURRENCY`    | Kode mata uang tidak didukung              | Gunakan kode mata uang yang didukung (USD, EUR, dll.)      |
| `DUPLICATE_REFERENCE` | Referensi transaksi sudah ada   | Gunakan referensi transaksi yang unik                  |
| `EXPIRED_SESSION`     | Sesi pembayaran telah kedaluwarsa            | Buat permintaan pembayaran baru                        |
| `MERCHANT_SUSPENDED`  | Akun merchant ditangguhkan          | Hubungi dukungan Ilonapay                            |

### Format Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "error_code": "INVALID_AMOUNT",
  "errors": {
    "payment_amount": [
      "The payment amount must be at least 1.00"
    ]
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

> **⚠️ Penanganan Error:**  
> Selalu periksa field `success` dalam respons API dan tangani error dengan tepat di aplikasi Anda.

---
