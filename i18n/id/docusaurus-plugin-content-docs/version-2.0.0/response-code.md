---
id: response-code-v2
slug: /response-code-v2
title: Kode Respons
sidebar_position: 5
---

# Kode Respons

Referensi ini mendefinisikan model kode respons 7 digit yang distandarkan dan digunakan di seluruh API v2.
Model ini membantu penanganan error yang konsisten, observabilitas, serta troubleshooting pada level layanan.

## Ringkasan

Format kode respons:

**`HTTP_STATUS_CODE + SERVICE_CODE + CASE_CODE`**

| Segment | Length | Description |
|---------|--------|-------------|
| `HTTP_STATUS_CODE` | 3 digits | Status HTTP standar (`200`, `401`, `404`, dll.) |
| `SERVICE_CODE` | 2 digits | Identifier modul layanan/domain |
| `CASE_CODE` | 2 digits | Hasil operasi spesifik atau kasus error |

**Contoh:** `2002006`  
`200` = HTTP OK, `20` = layanan Bank, `06` = daftar berhasil diambil

---

## Panduan Integrasi

- Gunakan HTTP status untuk penanganan level transport (retry, auth, perilaku validasi).
- Gunakan `SERVICE_CODE` dan `CASE_CODE` untuk penanganan level bisnis pada logika aplikasi.
- Log nilai `code` secara lengkap untuk meningkatkan monitoring dan triase insiden.
- Jaga tabel mapping error pada client tetap sinkron dengan konstanta backend.

---

## Kode Layanan (Service Codes)

| Code | Constant | Description |
|------|----------|-------------|
| `00` | `ServiceCodeCommon` | Layanan umum |
| `01` | `ServiceCodeAuth` | Layanan autentikasi |
| `02` | `ServiceCodeTransaction` | Layanan transaksi |
| `03` | `ServiceCodeWithdrawal` | Layanan withdrawal |
| `04` | `ServiceCodeUser` | Layanan user |
| `05` | `ServiceCodeAdmin` | Layanan admin |
| `06` | `ServiceCodeMerchant` | Layanan merchant |
| `07` | `ServiceCodeSetting` | Layanan pengaturan |
| `08` | `ServiceCodeRole` | Layanan role |
| `09` | `ServiceCodePermission` | Layanan permission |
| `10` | `ServiceCodeNotificationTemplate` | Layanan template notifikasi |
| `11` | `ServiceCodeNotificationTemplateChannel` | Layanan channel template notifikasi |
| `12` | `ServiceCodeNotification` | Layanan notifikasi |
| `13` | `ServiceCodeIPWhitelist` | Layanan IP whitelist |
| `14` | `ServiceCodeApiKey` | Layanan API key |
| `15` | `ServiceCodeDeposit` | Layanan deposit |
| `16` | `ServiceCodeWallet` | Layanan wallet |
| `17` | `ServiceCodePhone` | Layanan verifikasi telepon |
| `18` | `ServiceCodeEmail` | Layanan verifikasi email |
| `19` | `ServiceCodeTwoFactor` | Layanan autentikasi 2 faktor |
| `20` | `ServiceCodeBank` | Layanan bank |
| `21` | `ServiceCodeBankAccount` | Layanan rekening bank |

---

## Case Codes

### Sukses (01-10)

| Code | Constant | Description |
|------|----------|-------------|
| `01` | `CaseCodeSuccess` | Berhasil umum |
| `02` | `CaseCodeCreated` | Resource berhasil dibuat |
| `03` | `CaseCodeUpdated` | Resource berhasil diperbarui |
| `04` | `CaseCodeDeleted` | Resource berhasil dihapus |
| `05` | `CaseCodeRetrieved` | Resource berhasil diambil |
| `06` | `CaseCodeListRetrieved` | Daftar berhasil diambil |
| `07` | `CaseCodeLoginSuccess` | Login berhasil |
| `08` | `CaseCodeLogoutSuccess` | Logout berhasil |
| `09` | `CaseCodePasswordChanged` | Password berhasil diubah |
| `10` | `CaseCodeOperationCompleted` | Operasi selesai |

### Error Validasi (11-20)

| Code | Constant | Description |
|------|----------|-------------|
| `11` | `CaseCodeValidationError` | Error validasi umum |
| `12` | `CaseCodeRequiredField` | Field wajib belum diisi |
| `13` | `CaseCodeInvalidFormat` | Format tidak valid |
| `14` | `CaseCodeInvalidValue` | Nilai tidak valid |
| `15` | `CaseCodeDuplicateEntry` | Data duplikat |
| `16` | `CaseCodeInvalidEmail` | Format email tidak valid |
| `17` | `CaseCodeInvalidPassword` | Password tidak valid |
| `18` | `CaseCodePasswordTooShort` | Password terlalu pendek |
| `19` | `CaseCodeInvalidDate` | Format tanggal tidak valid |
| `20` | `CaseCodeInvalidRange` | Rentang tidak valid |

### Error Autentikasi (21-30)

| Code | Constant | Description |
|------|----------|-------------|
| `21` | `CaseCodeUnauthorized` | Akses tidak terotorisasi |
| `22` | `CaseCodeInvalidToken` | Token tidak valid |
| `23` | `CaseCodeTokenExpired` | Token kedaluwarsa |
| `24` | `CaseCodeInvalidCredentials` | Kredensial tidak valid |
| `25` | `CaseCodeAccountLocked` | Akun terkunci |
| `26` | `CaseCodeAccountDisabled` | Akun dinonaktifkan |
| `27` | `CaseCodePermissionDenied` | Izin ditolak |
| `28` | `CaseCodeSessionExpired` | Sesi kedaluwarsa |
| `29` | `CaseCodeTwoFactorRequired` | Autentikasi dua faktor diperlukan |
| `30` | `CaseCodeInvalidOTP` | OTP tidak valid |

### Tidak Ditemukan (31-44)

| Code | Constant | Description |
|------|----------|-------------|
| `31` | `CaseCodeNotFound` | Resource tidak ditemukan |
| `32` | `CaseCodeUserNotFound` | User tidak ditemukan |
| `33` | `CaseCodeAdminNotFound` | Admin tidak ditemukan |
| `34` | `CaseCodeMerchantNotFound` | Merchant tidak ditemukan |
| `35` | `CaseCodeTransactionNotFound` | Transaksi tidak ditemukan |
| `36` | `CaseCodeSettingNotFound` | Pengaturan tidak ditemukan |
| `37` | `CaseCodeRoleNotFound` | Role tidak ditemukan |
| `38` | `CaseCodeNotificationTemplateNotFound` | Template notifikasi tidak ditemukan |
| `39` | `CaseCodeNotificationTemplateChannelNotFound` | Channel template notifikasi tidak ditemukan |
| `40` | `CaseCodeNotificationNotFound` | Notifikasi tidak ditemukan |
| `41` | `CaseCodeMethodNotFound` | Metode tidak ditemukan |
| `42` | `CaseCodeRouteNotFound` | Route tidak ditemukan |
| `43` | `CaseCodeResourceNotFound` | Resource umum tidak ditemukan |
| `44` | `CaseCodeApiKeyNotFound` | API key tidak ditemukan |

### Logika Bisnis (45-54)

| Code | Constant | Description |
|------|----------|-------------|
| `45` | `CaseCodeInsufficientBalance` | Saldo tidak mencukupi |
| `46` | `CaseCodeInvalidAmount` | Jumlah tidak valid |
| `47` | `CaseCodeTransactionFailed` | Transaksi gagal |
| `48` | `CaseCodeLimitExceeded` | Batas terlampaui |
| `49` | `CaseCodeInvalidStatus` | Status tidak valid |
| `50` | `CaseCodeOperationNotAllowed` | Operasi tidak diizinkan |
| `51` | `CaseCodeAlreadyProcessed` | Sudah diproses |
| `52` | `CaseCodePendingTransaction` | Transaksi masih pending |
| `53` | `CaseCodeExpiredTransaction` | Transaksi kedaluwarsa |
| `54` | `CaseCodeInvalidCurrency` | Mata uang tidak valid |

### Error Server (55-64)

| Code | Constant | Description |
|------|----------|-------------|
| `55` | `CaseCodeInternalError` | Error internal server |
| `56` | `CaseCodeDatabaseError` | Error database |
| `57` | `CaseCodeExternalServiceError` | Error layanan eksternal |
| `58` | `CaseCodeTimeout` | Request timeout |
| `59` | `CaseCodeServiceUnavailable` | Layanan tidak tersedia |
| `60` | `CaseCodeMaintenance` | Dalam pemeliharaan |
| `61` | `CaseCodeRateLimitExceeded` | Rate limit terlampaui |
| `62` | `CaseCodeConfigurationError` | Error konfigurasi |
| `63` | `CaseCodeEncryptionError` | Error enkripsi |
| `64` | `CaseCodeDecryptionError` | Error dekripsi |

### Konflik (65-69)

| Code | Constant | Description |
|------|----------|-------------|
| `65` | `CaseCodeConflict` | Konflik umum |
| `66` | `CaseCodeResourceExists` | Resource sudah ada |
| `67` | `CaseCodeConcurrentModification` | Modifikasi konkuren |
| `68` | `CaseCodeVersionMismatch` | Versi tidak cocok |
| `69` | `CaseCodeStateConflict` | Konflik state |

### Perubahan Email (70-74)

| Code | Constant | Description |
|------|----------|-------------|
| `70` | `CaseCodeEmailChangeRequested` | OTP perubahan email dikirim |
| `71` | `CaseCodeEmailChangeVerified` | Perubahan email dikonfirmasi |
| `72` | `CaseCodeEmailChangeCancelled` | Perubahan email dibatalkan |
| `73` | `CaseCodeEmailAlreadyUsed` | Email sudah terdaftar pada akun lain |
| `74` | `CaseCodeEmailVerificationFailed` | Verifikasi OTP email gagal |

### Perubahan Telepon (75-79)

| Code | Constant | Description |
|------|----------|-------------|
| `75` | `CaseCodePhoneChangeRequested` | OTP perubahan telepon dikirim |
| `76` | `CaseCodePhoneChangeVerified` | Perubahan telepon dikonfirmasi |
| `77` | `CaseCodePhoneChangeCancelled` | Perubahan telepon dibatalkan |
| `78` | `CaseCodePhoneAlreadyUsed` | Nomor telepon sudah terdaftar pada akun lain |
| `79` | `CaseCodePhoneVerificationFailed` | Verifikasi OTP telepon gagal |

### Autentikasi Dua Faktor (80-89)

| Code | Constant | Description |
|------|----------|-------------|
| `80` | `CaseCode2FAEnabled` | 2FA diaktifkan |
| `81` | `CaseCode2FADisabled` | 2FA dinonaktifkan |
| `82` | `CaseCode2FASetupInitiated` | Setup 2FA dimulai |
| `83` | `CaseCode2FASetupVerified` | Setup 2FA dikonfirmasi |
| `84` | `CaseCode2FAInvalidCode` | Kode 2FA tidak valid atau kedaluwarsa |
| `85` | `CaseCode2FACodeRequired` | Kode 2FA tidak ada pada request |
| `86` | `CaseCode2FANotEnabled` | 2FA belum diaktifkan pada akun |
| `87` | `CaseCode2FAAlreadyEnabled` | 2FA sudah diaktifkan |
| `88` | `CaseCode2FARecoveryCodeUsed` | Bypass 2FA via recovery code |
| `89` | `CaseCode2FARecoveryCodeInvalid` | Recovery code tidak valid atau sudah digunakan |

### Bank (90-94)

| Code | Constant | Description |
|------|----------|-------------|
| `90` | `CaseCodeBankNotFound` | Bank tidak ditemukan |
| `91` | `CaseCodeBankInactive` | Bank tidak aktif atau tidak tersedia |
| `92` | `CaseCodeBankAlreadyExists` | Bank sudah terdaftar |
| `93` | `CaseCodeBankCreated` | Bank berhasil dibuat |
| `94` | `CaseCodeBankUpdated` | Bank berhasil diperbarui |

### Rekening Bank (95-99)

| Code | Constant | Description |
|------|----------|-------------|
| `95` | `CaseCodeBankAccountNotFound` | Rekening bank tidak ditemukan |
| `96` | `CaseCodeBankAccountInvalid` | Nomor rekening bank tidak valid atau tidak dapat diverifikasi |
| `97` | `CaseCodeBankAccountAlreadyExists` | Rekening bank sudah terdaftar |
| `98` | `CaseCodeBankAccountCreated` | Rekening bank berhasil dibuat |
| `99` | `CaseCodeBankAccountDeleted` | Rekening bank berhasil dihapus |

---

## Logika Build dan Parse

Gunakan helper berikut pada backend dan client SDK:

- `BuildResponseCode(httpStatus, serviceCode, caseCode)` menggabungkan semua segment menjadi integer 7 digit.
- `ParseResponseCode(code)` memecah integer 7 digit menjadi:
  - HTTP status (3 digit pertama)
  - service code (2 digit berikutnya)
  - case code (2 digit terakhir)

### Contoh

```text
BuildResponseCode(200, "20", "06") => 2002006
ParseResponseCode(2002006) => (200, "20", "06")
```

## Best Practices

- Jangan mengubah arti response code setelah dipublikasikan ke client eksternal.
- Tambahkan case baru alih-alih memakai ulang case code lama untuk makna berbeda.
- Dokumentasikan service/case code yang baru pada halaman ini sebelum rilis.
- Pastikan pesan error publik aman dan tidak membocorkan detail internal sensitif.
