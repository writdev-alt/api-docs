---
id: headers-v2
title: Header
sidebar_position: 4
---

## Header

Sebagian besar endpoint API yang aman memerlukan header JSON standar serta header autentikasi token dan API key.

## Header Standar

| Header | Required | Example | Description |
|---|---|---|---|
| `Accept` | ✅ | `application/json` | Tipe konten respons yang diharapkan |
| `Content-Type` | ✅ | `application/json` | Format payload request |
| `Authorization` | ✅ | `Bearer {token}` | Access token yang didapat dari login |
| `X-API-KEY` | ✅ | `{apiKey}` | API key yang ditetapkan ke akun Anda |

## Contoh Penggunaan Header

```bash
curl --location 'https://sandbox.ilonapay.com/api/v2/example' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {token}' \
  --header 'X-API-KEY: {apiKey}'
```

## Best Practices

- Selalu kirim `Accept: application/json` agar parsing konsisten.
- Jangan mengekspos token atau API key pada aplikasi client-side/browser.
- Segera rotasi kredensial yang terkompromi.
