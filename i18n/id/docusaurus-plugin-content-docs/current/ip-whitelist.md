---
id: ip-whitelist
title: Konfigurasi Daftar Putih IP
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tingkatkan keamanan API Anda dengan membatasi akses hanya untuk alamat IP tertentu. Hanya IP yang terdaftar yang dapat mengirim permintaan ke akun merchant Anda.

> **Peningkatan Keamanan**  
> Daftar putih IP menambah lapisan perlindungan tambahan. Permintaan dari IP yang tidak terdaftar akan otomatis ditolak meskipun menggunakan kredensial yang valid.

## Mengelola Daftar Putih IP

Akses antarmuka manajemen untuk menambah, melihat, dan menghapus alamat yang diizinkan: [Kelola IP Whitelist](https://sandbox.ilonapay.com/user/brand).

Dasbor memungkinkan Anda mengatur jenis alamat, deskripsi, rentang CIDR, tanggal kedaluwarsa, dan status aktivasi.

![Antarmuka manajemen IP Whitelist](/img/ip-whitelist.png)

## Manfaat Daftar Putih IP

- **Keamanan Lebih Tinggi**: Mencegah akses tidak sah meskipun kredensial API bocor.
- **Kontrol Akses**: Batasi akses API hanya untuk server atau lingkungan tertentu.
- **Jejak Audit**: Lacak dan pantau IP mana saja yang memiliki akses ke API.
- **Kepatuhan**: Memenuhi persyaratan kepatuhan keamanan pembayaran.

## Cara Menambahkan Alamat IP

1. **Masuk ke Pengaturan IP Whitelist**: Buka dasbor merchant dan pergi ke Security → IP Whitelist.
2. **Tambahkan Alamat IP**: Klik **Add IP** dan masukkan alamat IPv4 atau IPv6 yang ingin diizinkan.
3. **Tambahkan Deskripsi (Opsional)**: Sertakan deskripsi yang menjelaskan tujuan alamat tersebut (contoh: `Production Server`).
4. **Simpan dan Aktifkan**: Simpan entri. Perubahan daftar putih berlaku seketika.

## Format IP yang Didukung

| Format | Contoh | Deskripsi |
| --- | --- | --- |
| `IPv4` | `192.168.1.100` | Format alamat IPv4 standar |
| `CIDR Range (IPv4)` | `192.168.1.0/24` | Rentang IPv4 dalam notasi CIDR |
| `CIDR Range (IPv6)` | `2001:0db8::/32` | Rentang IPv6 dalam notasi CIDR |

## Cari Alamat IP Server Anda

Gunakan salah satu metode berikut untuk mengetahui alamat IP publik server Anda.

<Tabs
  defaultValue="curl-ip"
  values={[
    {label: 'cURL', value: 'curl-ip'},
    {label: 'PHP', value: 'php-ip'},
    {label: 'Node.js', value: 'node-ip'},
    {label: 'Python', value: 'python-ip'},
  ]}
>

<TabItem value="curl-ip">

```
# Mendapatkan alamat IP publik Anda
curl -s https://api.ipify.org

# Atau dengan detail lebih lengkap
curl -s https://ipinfo.io/json
```

</TabItem>

<TabItem value="php-ip">

```
<?php
// Mendapatkan alamat IP publik
$ip = file_get_contents('https://api.ipify.org');
echo "IP server Anda: " . $ip . "\n";

// Alternatif: mengambil IP dari request
$serverIp = $_SERVER['SERVER_ADDR'] ?? gethostbyname(gethostname());
echo "IP Server: " . $serverIp . "\n";

// Mendapatkan informasi IP lebih detail
$ipInfo = json_decode(file_get_contents('https://ipinfo.io/json'), true);
echo "IP: " . $ipInfo['ip'] . "\n";
echo "Lokasi: " . $ipInfo['city'] . ", " . $ipInfo['country'] . "\n";
```

</TabItem>

<TabItem value="node-ip">

```
const https = require('https');

// Mendapatkan alamat IP publik
https.get('https://api.ipify.org', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log('IP server Anda:', data));
});

// Alternatif: menggunakan axios
const axios = require('axios');

async function getServerIP() {
    try {
        const response = await axios.get('https://ipinfo.io/json');
        console.log('IP:', response.data.ip);
        console.log('Lokasi:', response.data.city, response.data.country);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getServerIP();
```

</TabItem>

<TabItem value="python-ip">

```
import requests

# Mendapatkan alamat IP publik
response = requests.get('https://api.ipify.org')
print(f"IP server Anda: {response.text}")

# Mendapatkan informasi IP lebih detail
response = requests.get('https://ipinfo.io/json')
data = response.json()
print(f"IP: {data['ip']}")
print(f"Lokasi: {data['city']}, {data['country']}")

# Alternatif: mengambil dari socket
import socket
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
print(f"IP Lokal: {local_ip}")
```

</TabItem>

</Tabs>

## Praktik Terbaik

> **Hal-hal yang Perlu Diperhatikan**
>
> - Selalu tambahkan IP server produksi sebelum melakukan deployment.
> - Simpan cadangan daftar IP yang diizinkan secara aman.
> - Gunakan nama deskriptif untuk mengidentifikasi setiap entri.
> - Tinjau dan hapus alamat yang tidak digunakan secara berkala.
> - Gunakan rentang CIDR untuk lingkungan IP dinamis atau perbarui daftar putih ketika IP berubah.
> - Uji akses API setelah menambahkan alamat baru untuk memastikan konfigurasi tepat.

## Menguji Akses IP

Setelah menambahkan alamat IP ke whitelist, validasi akses dengan permintaan uji.

<Tabs
  defaultValue="curl-test"
  values={[{label: 'cURL', value: 'curl-test'}]}
>

<TabItem value="curl-test">

```
# Menguji akses API dari server Anda
curl -X GET "https://sandbox.ilonapay.com/api/v1/check-status/TEST123" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: your_merchant_key" \
  -H "X-API-KEY: your_api_key"

# Respon yang diharapkan jika IP terdaftar:
# {"success": true, "status": "...", "transaction": {...}}

# Respon jika IP tidak terdaftar:
# {"error": "Access denied. IP address not whitelisted", "status_code": 403}
```

</TabItem>

</Tabs>

## Pemecahan Masalah

| Masalah | Kemungkinan Penyebab | Solusi |
| --- | --- | --- |
| 403 Access Denied | IP belum terdaftar | Tambahkan IP server ke whitelist dan tunggu beberapa detik untuk propagasi. |
| Permintaan gagal setelah IP berubah | IP server berubah (dinamis) | Perbarui whitelist dengan alamat baru atau gunakan rentang CIDR. |
| Masalah load balancer | IP server lebih dari satu | Tambahkan seluruh IP load balancer atau gunakan rentang CIDR. |
| Proxy memblokir | Permintaan melalui proxy | Tambahkan IP proxy ke whitelist. |

## Kode Respon Whitelist IP

| Status Code | Pesan | Deskripsi |
| --- | --- | --- |
| `200` | Success | IP terdaftar dan permintaan diizinkan. |
| `403` | Forbidden | Alamat IP tidak ada dalam whitelist. |
| `401` | Unauthorized | Kredensial API tidak valid meskipun IP terdaftar. |
