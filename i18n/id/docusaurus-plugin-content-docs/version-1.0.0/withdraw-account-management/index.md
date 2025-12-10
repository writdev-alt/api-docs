---
id: withdraw-account-management-index
slug: /withdraw-account-management
title: Manajemen Akun Penarikan
sidebar_position: 1
---

API komprehensif untuk mengelola akun penarikan. Buat, perbarui, hapus, dan ambil informasi akun penarikan untuk penarikan dana yang lancar.

> **ℹ️ Ringkasan**  
> API Manajemen Akun Penarikan menyediakan operasi CRUD lengkap untuk mengelola akun penarikan. Pengguna dapat mendaftarkan beberapa akun penarikan (akun bank atau e-wallet) dan menggunakannya untuk memproses penarikan.

> **💻 Respons Sumber Daya API**  
> Semua endpoint menggunakan API Resources untuk transformasi data yang konsisten. Respons dibungkus dalam kunci `data`:
>
> - **Sumber Daya Tunggal:** `{ "data": {...} }`
> - **Koleksi:** `{ "data": [...] }`
>
> Respons error mencakup field `success`, `message`, dan `errors` untuk kegagalan validasi.

---

## Panduan Endpoint

- [Daftar Akun Penarikan](./list.md)
- [Dapatkan Metode Penarikan](./methods.md)
- [Dapatkan Daftar Bank dan Dompet](./banks-wallets.md)
- [Buat Akun Penarikan](./create.md)
- [Detail Akun Penarikan](./details.md)
- [Perbarui Akun Penarikan](./update.md)
- [Hapus Akun Penarikan](./delete.md)
- [Informasi Akun](./info.md)

