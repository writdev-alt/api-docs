---
id: response-code-v2
slug: /response-code-v2
title: Response Code
sidebar_position: 5
---

# Response Code

This reference defines the standardized 7-digit response code model used across API v2.
It enables consistent error handling, observability, and service-level troubleshooting.

## Overview

Response code format:

**`HTTP_STATUS_CODE + SERVICE_CODE + CASE_CODE`**

| Segment | Length | Description |
|---------|--------|-------------|
| `HTTP_STATUS_CODE` | 3 digits | Standard HTTP status (`200`, `401`, `404`, etc.) |
| `SERVICE_CODE` | 2 digits | Service or domain module identifier |
| `CASE_CODE` | 2 digits | Specific operation result or error case |

**Example:** `2002006`  
`200` = HTTP OK, `20` = Bank service, `06` = List retrieved

---

## Integration Guidance

- Use HTTP status for transport-level handling (retry, auth, validation behavior).
- Use `SERVICE_CODE` and `CASE_CODE` for business-level handling in application logic.
- Log full `code` values to improve monitoring and incident triage.
- Keep client error mapping table synchronized with backend constants.

---

## Service Codes

| Code | Constant | Description |
|------|----------|-------------|
| `00` | `ServiceCodeCommon` | Common/General services |
| `01` | `ServiceCodeAuth` | Authentication service |
| `02` | `ServiceCodeTransaction` | Transaction service |
| `03` | `ServiceCodeWithdrawal` | Withdrawal service |
| `04` | `ServiceCodeUser` | User service |
| `05` | `ServiceCodeAdmin` | Admin service |
| `06` | `ServiceCodeMerchant` | Merchant service |
| `07` | `ServiceCodeSetting` | Setting service |
| `08` | `ServiceCodeRole` | Role service |
| `09` | `ServiceCodePermission` | Permission service |
| `10` | `ServiceCodeNotificationTemplate` | Notification template service |
| `11` | `ServiceCodeNotificationTemplateChannel` | Notification template channel service |
| `12` | `ServiceCodeNotification` | Notification service |
| `13` | `ServiceCodeIPWhitelist` | IP whitelist service |
| `14` | `ServiceCodeApiKey` | API key service |
| `15` | `ServiceCodeDeposit` | Deposit service |
| `16` | `ServiceCodeWallet` | Wallet service |
| `17` | `ServiceCodePhone` | Phone verification service |
| `18` | `ServiceCodeEmail` | Email verification service |
| `19` | `ServiceCodeTwoFactor` | Two-factor authentication service |
| `20` | `ServiceCodeBank` | Bank service |
| `21` | `ServiceCodeBankAccount` | Bank account service |

---

## Case Codes

### Success (01-10)

| Code | Constant | Description |
|------|----------|-------------|
| `01` | `CaseCodeSuccess` | General success |
| `02` | `CaseCodeCreated` | Resource created |
| `03` | `CaseCodeUpdated` | Resource updated |
| `04` | `CaseCodeDeleted` | Resource deleted |
| `05` | `CaseCodeRetrieved` | Resource retrieved |
| `06` | `CaseCodeListRetrieved` | List retrieved |
| `07` | `CaseCodeLoginSuccess` | Login successful |
| `08` | `CaseCodeLogoutSuccess` | Logout successful |
| `09` | `CaseCodePasswordChanged` | Password changed |
| `10` | `CaseCodeOperationCompleted` | Operation completed |

### Validation Errors (11-20)

| Code | Constant | Description |
|------|----------|-------------|
| `11` | `CaseCodeValidationError` | General validation error |
| `12` | `CaseCodeRequiredField` | Required field missing |
| `13` | `CaseCodeInvalidFormat` | Invalid format |
| `14` | `CaseCodeInvalidValue` | Invalid value |
| `15` | `CaseCodeDuplicateEntry` | Duplicate entry |
| `16` | `CaseCodeInvalidEmail` | Invalid email format |
| `17` | `CaseCodeInvalidPassword` | Invalid password |
| `18` | `CaseCodePasswordTooShort` | Password too short |
| `19` | `CaseCodeInvalidDate` | Invalid date format |
| `20` | `CaseCodeInvalidRange` | Invalid range |

### Authentication Errors (21-30)

| Code | Constant | Description |
|------|----------|-------------|
| `21` | `CaseCodeUnauthorized` | Unauthorized access |
| `22` | `CaseCodeInvalidToken` | Invalid token |
| `23` | `CaseCodeTokenExpired` | Token expired |
| `24` | `CaseCodeInvalidCredentials` | Invalid credentials |
| `25` | `CaseCodeAccountLocked` | Account locked |
| `26` | `CaseCodeAccountDisabled` | Account disabled |
| `27` | `CaseCodePermissionDenied` | Permission denied |
| `28` | `CaseCodeSessionExpired` | Session expired |
| `29` | `CaseCodeTwoFactorRequired` | Two-factor authentication required |
| `30` | `CaseCodeInvalidOTP` | Invalid OTP |

### Not Found (31-44)

| Code | Constant | Description |
|------|----------|-------------|
| `31` | `CaseCodeNotFound` | Resource not found |
| `32` | `CaseCodeUserNotFound` | User not found |
| `33` | `CaseCodeAdminNotFound` | Admin not found |
| `34` | `CaseCodeMerchantNotFound` | Merchant not found |
| `35` | `CaseCodeTransactionNotFound` | Transaction not found |
| `36` | `CaseCodeSettingNotFound` | Setting not found |
| `37` | `CaseCodeRoleNotFound` | Role not found |
| `38` | `CaseCodeNotificationTemplateNotFound` | Notification template not found |
| `39` | `CaseCodeNotificationTemplateChannelNotFound` | Notification template channel not found |
| `40` | `CaseCodeNotificationNotFound` | Notification not found |
| `41` | `CaseCodeMethodNotFound` | Method not found |
| `42` | `CaseCodeRouteNotFound` | Route not found |
| `43` | `CaseCodeResourceNotFound` | General resource not found |
| `44` | `CaseCodeApiKeyNotFound` | API key not found |

### Business Logic (45-54)

| Code | Constant | Description |
|------|----------|-------------|
| `45` | `CaseCodeInsufficientBalance` | Insufficient balance |
| `46` | `CaseCodeInvalidAmount` | Invalid amount |
| `47` | `CaseCodeTransactionFailed` | Transaction failed |
| `48` | `CaseCodeLimitExceeded` | Limit exceeded |
| `49` | `CaseCodeInvalidStatus` | Invalid status |
| `50` | `CaseCodeOperationNotAllowed` | Operation not allowed |
| `51` | `CaseCodeAlreadyProcessed` | Already processed |
| `52` | `CaseCodePendingTransaction` | Pending transaction |
| `53` | `CaseCodeExpiredTransaction` | Expired transaction |
| `54` | `CaseCodeInvalidCurrency` | Invalid currency |

### Server Errors (55-64)

| Code | Constant | Description |
|------|----------|-------------|
| `55` | `CaseCodeInternalError` | Internal server error |
| `56` | `CaseCodeDatabaseError` | Database error |
| `57` | `CaseCodeExternalServiceError` | External service error |
| `58` | `CaseCodeTimeout` | Request timeout |
| `59` | `CaseCodeServiceUnavailable` | Service unavailable |
| `60` | `CaseCodeMaintenance` | Under maintenance |
| `61` | `CaseCodeRateLimitExceeded` | Rate limit exceeded |
| `62` | `CaseCodeConfigurationError` | Configuration error |
| `63` | `CaseCodeEncryptionError` | Encryption error |
| `64` | `CaseCodeDecryptionError` | Decryption error |

### Conflict (65-69)

| Code | Constant | Description |
|------|----------|-------------|
| `65` | `CaseCodeConflict` | General conflict |
| `66` | `CaseCodeResourceExists` | Resource already exists |
| `67` | `CaseCodeConcurrentModification` | Concurrent modification |
| `68` | `CaseCodeVersionMismatch` | Version mismatch |
| `69` | `CaseCodeStateConflict` | State conflict |

### Email Change (70-74)

| Code | Constant | Description |
|------|----------|-------------|
| `70` | `CaseCodeEmailChangeRequested` | Email change OTP sent |
| `71` | `CaseCodeEmailChangeVerified` | Email change confirmed |
| `72` | `CaseCodeEmailChangeCancelled` | Email change cancelled |
| `73` | `CaseCodeEmailAlreadyUsed` | Email already registered to another account |
| `74` | `CaseCodeEmailVerificationFailed` | Email OTP verification failed |

### Phone Change (75-79)

| Code | Constant | Description |
|------|----------|-------------|
| `75` | `CaseCodePhoneChangeRequested` | Phone change OTP sent |
| `76` | `CaseCodePhoneChangeVerified` | Phone change confirmed |
| `77` | `CaseCodePhoneChangeCancelled` | Phone change cancelled |
| `78` | `CaseCodePhoneAlreadyUsed` | Phone already registered to another account |
| `79` | `CaseCodePhoneVerificationFailed` | Phone OTP verification failed |

### Two-Factor Authentication (80-89)

| Code | Constant | Description |
|------|----------|-------------|
| `80` | `CaseCode2FAEnabled` | 2FA enabled |
| `81` | `CaseCode2FADisabled` | 2FA disabled |
| `82` | `CaseCode2FASetupInitiated` | 2FA setup started |
| `83` | `CaseCode2FASetupVerified` | 2FA setup confirmed |
| `84` | `CaseCode2FAInvalidCode` | 2FA code invalid or expired |
| `85` | `CaseCode2FACodeRequired` | 2FA code missing from request |
| `86` | `CaseCode2FANotEnabled` | 2FA not enabled on account |
| `87` | `CaseCode2FAAlreadyEnabled` | 2FA already enabled |
| `88` | `CaseCode2FARecoveryCodeUsed` | 2FA bypass via recovery code |
| `89` | `CaseCode2FARecoveryCodeInvalid` | Recovery code invalid or already used |

### Bank (90-94)

| Code | Constant | Description |
|------|----------|-------------|
| `90` | `CaseCodeBankNotFound` | Bank not found |
| `91` | `CaseCodeBankInactive` | Bank inactive or unavailable |
| `92` | `CaseCodeBankAlreadyExists` | Bank already registered |
| `93` | `CaseCodeBankCreated` | Bank created |
| `94` | `CaseCodeBankUpdated` | Bank updated |

### Bank Account (95-99)

| Code | Constant | Description |
|------|----------|-------------|
| `95` | `CaseCodeBankAccountNotFound` | Bank account not found |
| `96` | `CaseCodeBankAccountInvalid` | Bank account number invalid or unverifiable |
| `97` | `CaseCodeBankAccountAlreadyExists` | Bank account already registered |
| `98` | `CaseCodeBankAccountCreated` | Bank account created |
| `99` | `CaseCodeBankAccountDeleted` | Bank account deleted |

---

## Build and Parse Logic

Use these helpers in backend and client SDKs:

- `BuildResponseCode(httpStatus, serviceCode, caseCode)` combines all segments into a 7-digit integer.
- `ParseResponseCode(code)` splits a 7-digit integer into:
  - HTTP status (first 3 digits)
  - service code (next 2 digits)
  - case code (last 2 digits)

### Example

```text
BuildResponseCode(200, "20", "06") => 2002006
ParseResponseCode(2002006) => (200, "20", "06")
```

## Best Practices

- Keep response codes immutable once published to external clients.
- Add new cases instead of reusing old case codes for different meanings.
- Document newly introduced service and case codes in this page before release.
- Ensure public error messages are safe and do not expose sensitive internal details.
