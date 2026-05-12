---
id: rate-limits-v2
title: Rate Limit
sidebar_position: 5
---

## Rate Limit

Rate limit melindungi stabilitas platform dan memastikan penggunaan API yang adil untuk semua integrator.

## Kebijakan Umum

- Terapkan throttling request berdasarkan kredensial dan/atau IP.
- Burst bisa saja diperbolehkan, tetapi trafik tinggi yang berkelanjutan dapat dibatasi.
- Jika melebihi batas, respons dapat berupa HTTP `429 Too Many Requests`.

## Rekomendasi Perilaku Client

- Implementasikan exponential backoff dengan jitter untuk retry.
- Hormati `Retry-After` jika ada.
- Hindari loop polling yang agresif untuk pengecekan status.
- Gunakan pola asinkron (webhook/event) jika memungkinkan.

## Panduan Retry untuk `429`

1. Hentikan retry beruntun secara langsung.
2. Tunggu sesuai `Retry-After` atau kebijakan backoff.
3. Retry hanya untuk operasi idempotent.
