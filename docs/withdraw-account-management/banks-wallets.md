---
id: withdraw-account-management-banks-wallets
slug: /withdraw-account-management/banks-wallets
title: Get Banks and Wallets Lists
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Retrieve available banks and e-wallets from the payment gateway. Use these lists to get valid bank or wallet codes when creating withdrawal accounts.

**GET** `/api/v1/withdraw-accounts/lists`

## Request Headers

| Header           | Value               | Required | Description                      |
|------------------|---------------------|----------|----------------------------------|
| `Accept`         | `application/json`  | ✅       | Specifies the response format.   |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅       | Your Merchant ID.                |
| `X-API-KEY`      | `{api_key}`         | ✅       | Your API Key.                    |

## Code Examples

<Tabs groupId="withdraw-lists-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X GET "/api/v1/withdraw-accounts/lists" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: merchant_key" \
  -H "X-API-KEY: api_key"
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = '/api/v1';
$merchantKey = 'merchant_key';
$apiKey = 'api_key';

$response = Http::timeout(60)->withHeaders([
    'Accept' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->get("{$baseUrl}/withdraw-accounts/lists");

$lists = $response->json();
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = '/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';

axios
  .get(`${baseUrl}/withdraw-accounts/lists`, {
    headers: {
      Accept: 'application/json',
      'X-MERCHANT-KEY': merchantKey,
      'X-API-KEY': apiKey,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response?.data || error.message);
  });
```

</TabItem>

<TabItem value="python">

```python
import requests

base_url = '/api/v1'
merchant_key = 'merchant_key'
api_key = 'api_key'

headers = {
    'Accept': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.get(f"{base_url}/withdraw-accounts/lists", headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Responses

<Tabs groupId="withdraw-lists-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
]}>

<TabItem value="success">

```json
{
    "success": true,
    "code": "2000301",
    "message": "Bank and wallet lists retrieved successfully",
    "data": {
        "banks": [
            {
                "bank_id": "1",
                "bank_name": "BANK RAKYAT INDONESIA"
            },
            {
                "bank_id": "2",
                "bank_name": "BANK MANDIRI"
            },
            {
                "bank_id": "3",
                "bank_name": "BANK NEGARA INDONESIA"
            },
            {
                "bank_id": "4",
                "bank_name": "BANK DANAMON INDONESIA"
            },
            {
                "bank_id": "5",
                "bank_name": "BANK PERMATA"
            },
            {
                "bank_id": "6",
                "bank_name": "BANK Central Asia"
            },
            {
                "bank_id": "7",
                "bank_name": "BANK MAYBANK INDONESIA"
            },
            {
                "bank_id": "8",
                "bank_name": "BANK PANIN"
            },
            {
                "bank_id": "9",
                "bank_name": "BANK CIMB NIAGA"
            },
            {
                "bank_id": "10",
                "bank_name": "BANK UOB INDONESIA"
            },
            {
                "bank_id": "11",
                "bank_name": "BANK OCBC NISP"
            },
            {
                "bank_id": "12",
                "bank_name": "BANK CITIBANK"
            },
            {
                "bank_id": "13",
                "bank_name": "BANK CCB INDONESIA"
            },
            {
                "bank_id": "14",
                "bank_name": "BANK ARTHA GRAHA INTERNASIONAL"
            },
            {
                "bank_id": "15",
                "bank_name": "BANK OF TOKYO MITSUBISHI UFJ"
            },
            {
                "bank_id": "16",
                "bank_name": "BANK DBS INDONESIA"
            },
            {
                "bank_id": "17",
                "bank_name": "BANK STANDARD CHARTERED"
            },
            {
                "bank_id": "18",
                "bank_name": "BANK CAPITAL INDONESIA"
            },
            {
                "bank_id": "19",
                "bank_name": "BANK ANZ INDONESIA"
            },
            {
                "bank_id": "20",
                "bank_name": "BANK OF CHINA HONGKONG"
            },
            {
                "bank_id": "21",
                "bank_name": "BANK HSBC INDONESIA"
            },
            {
                "bank_id": "22",
                "bank_name": "BANK RABOBANK"
            },
            {
                "bank_id": "23",
                "bank_name": "BANK JTRUST INDONESIA"
            },
            {
                "bank_id": "24",
                "bank_name": "BANK MAYAPADA"
            },
            {
                "bank_id": "25",
                "bank_name": "BANK OF INDIA INDONESIA"
            },
            {
                "bank_id": "26",
                "bank_name": "BANK MUAMALAT"
            },
            {
                "bank_id": "27",
                "bank_name": "BANK MESTIKA DHARMA"
            },
            {
                "bank_id": "28",
                "bank_name": "BANK SINARMAS"
            },
            {
                "bank_id": "29",
                "bank_name": "BANK MASPION"
            },
            {
                "bank_id": "30",
                "bank_name": "BANK GANESHA"
            },
            {
                "bank_id": "31",
                "bank_name": "BANK ICBC INDONESIA"
            },
            {
                "bank_id": "32",
                "bank_name": "BANK QNB INDONESIA"
            },
            {
                "bank_id": "33",
                "bank_name": "BANK TABUNGAN NEGARA"
            },
            {
                "bank_id": "34",
                "bank_name": "BANK WOORI SAUDARA"
            },
            {
                "bank_id": "35",
                "bank_name": "BANK BTPN"
            },
            {
                "bank_id": "36",
                "bank_name": "BANK VICTORIA SYARIAH"
            },
            {
                "bank_id": "37",
                "bank_name": "BANK BRI SYARIAH"
            },
            {
                "bank_id": "38",
                "bank_name": "BANK BJB SYARIAH"
            },
            {
                "bank_id": "39",
                "bank_name": "BANK MEGA"
            },
            {
                "bank_id": "40",
                "bank_name": "BANK BNI SYARIAH"
            },
            {
                "bank_id": "41",
                "bank_name": "BANK BUKOPIN"
            },
            {
                "bank_id": "42",
                "bank_name": "BANK SYARIAH MANDIRI"
            },
            {
                "bank_id": "43",
                "bank_name": "BANK JASA JAKARTA"
            },
            {
                "bank_id": "44",
                "bank_name": "BANK HANA"
            },
            {
                "bank_id": "45",
                "bank_name": "BANK MNC INTERNASIONAL"
            },
            {
                "bank_id": "46",
                "bank_name": "BANK YUDHA BHAKTI"
            },
            {
                "bank_id": "47",
                "bank_name": "BANK BRI AGRO"
            },
            {
                "bank_id": "48",
                "bank_name": "BANK SBI INDONESIA"
            },
            {
                "bank_id": "49",
                "bank_name": "BANK ROYAL INDONESIA"
            },
            {
                "bank_id": "50",
                "bank_name": "BANK NATIONALNOBU"
            },
            {
                "bank_id": "51",
                "bank_name": "BANK MEGA SYARIAH"
            },
            {
                "bank_id": "52",
                "bank_name": "BANK INA PERDANA"
            },
            {
                "bank_id": "53",
                "bank_name": "BANK PANIN DUBAI SYARIAH"
            },
            {
                "bank_id": "54",
                "bank_name": "BANK PRIMA MASTER BANK"
            },
            {
                "bank_id": "55",
                "bank_name": "BANK SYARIAH BUKOPIN"
            },
            {
                "bank_id": "56",
                "bank_name": "BANK SAHABAT SAMPOERNA"
            },
            {
                "bank_id": "57",
                "bank_name": "BANK OK INDONESIA"
            },
            {
                "bank_id": "58",
                "bank_name": "BANK KESEJAHTERAAN. EKONOMI / PT. BANK SEABANK INDONESIA"
            },
            {
                "bank_id": "59",
                "bank_name": "BANK BCA SYARIAH"
            },
            {
                "bank_id": "60",
                "bank_name": "BANK ARTOS / BANK JAGO"
            },
            {
                "bank_id": "61",
                "bank_name": "BANK BTPN SYARIAH"
            },
            {
                "bank_id": "62",
                "bank_name": "BANK MULTIARTA SENTOSA"
            },
            {
                "bank_id": "63",
                "bank_name": "BANK MAYORA"
            },
            {
                "bank_id": "64",
                "bank_name": "BANK INDEX SELINDO"
            },
            {
                "bank_id": "65",
                "bank_name": "BANK MANTAP"
            },
            {
                "bank_id": "66",
                "bank_name": "BANK VICTORIA INTERNATIONAL"
            },
            {
                "bank_id": "67",
                "bank_name": "BANK HARDA INTERNASIONAL"
            },
            {
                "bank_id": "68",
                "bank_name": "BANK IBK"
            },
            {
                "bank_id": "69",
                "bank_name": "BANK CTBC INDONESIA"
            },
            {
                "bank_id": "70",
                "bank_name": "BANK COMMONWEALTH"
            },
            {
                "bank_id": "71",
                "bank_name": "BPD BJB"
            },
            {
                "bank_id": "72",
                "bank_name": "BPD DKI"
            },
            {
                "bank_id": "73",
                "bank_name": "BPD DIY"
            },
            {
                "bank_id": "74",
                "bank_name": "BPD JATENG"
            },
            {
                "bank_id": "75",
                "bank_name": "BPD JATIM"
            },
            {
                "bank_id": "76",
                "bank_name": "BPD JAMBI"
            },
            {
                "bank_id": "77",
                "bank_name": "BPD ACEH SYARIAH"
            },
            {
                "bank_id": "78",
                "bank_name": "BPD SUMATERA UTARA"
            },
            {
                "bank_id": "79",
                "bank_name": "BPD SUMBAR"
            },
            {
                "bank_id": "80",
                "bank_name": "BPD RIAU KEPRI"
            },
            {
                "bank_id": "81",
                "bank_name": "BPD SUMSELBABEL"
            },
            {
                "bank_id": "82",
                "bank_name": "BPD LAMPUNG"
            },
            {
                "bank_id": "83",
                "bank_name": "BPD KALIMANTAN SELATAN"
            },
            {
                "bank_id": "84",
                "bank_name": "BPD KALBAR"
            },
            {
                "bank_id": "85",
                "bank_name": "BPD KALTIM KALTARA"
            },
            {
                "bank_id": "86",
                "bank_name": "BPD KALIMANTAN TENGAH"
            },
            {
                "bank_id": "87",
                "bank_name": "BPD SULSELBAR"
            },
            {
                "bank_id": "88",
                "bank_name": "BPD SULUT GO"
            },
            {
                "bank_id": "89",
                "bank_name": "BPD NUSA TENGGARA BARAT"
            },
            {
                "bank_id": "90",
                "bank_name": "BPD BALI"
            },
            {
                "bank_id": "91",
                "bank_name": "BPD NUSA TENGGARA TIMUR"
            },
            {
                "bank_id": "92",
                "bank_name": "BPD MALUKU DAN MALUKU UTARA"
            },
            {
                "bank_id": "93",
                "bank_name": "BPD PAPUA"
            },
            {
                "bank_id": "94",
                "bank_name": "BPD BENGKULU"
            },
            {
                "bank_id": "95",
                "bank_name": "BPD SULAWESI TENGAH"
            },
            {
                "bank_id": "96",
                "bank_name": "BPD SULAWESI TENGGARA"
            },
            {
                "bank_id": "97",
                "bank_name": "BPD BANTEN"
            },
            {
                "bank_id": "98",
                "bank_name": "PT. BANK CIMB NIAGA TBK - UUS"
            },
            {
                "bank_id": "100",
                "bank_name": "PT. BPD KALIMANTAN BARAT UUS"
            },
            {
                "bank_id": "101",
                "bank_name": "PT. BPD SUMSEL BABEL - UUS"
            },
            {
                "bank_id": "102",
                "bank_name": "PT. BANK JAGO TBK UUS"
            },
            {
                "bank_id": "103",
                "bank_name": "PT. BPD KALIMANTAN SELATAN UUS"
            },
            {
                "bank_id": "104",
                "bank_name": "PT BPD DIY - UUS"
            },
            {
                "bank_id": "105",
                "bank_name": "PT. BANK NAGARI - UUS"
            },
            {
                "bank_id": "106",
                "bank_name": "PT. BANK MAYBANK INDONESIA - UUS"
            },
            {
                "bank_id": "107",
                "bank_name": "PT. BANK DANAMON INDONESIA UUS"
            },
            {
                "bank_id": "108",
                "bank_name": "PT. BANK SINARMAS TBK. - UUS"
            },
            {
                "bank_id": "109",
                "bank_name": "PT. BANK TABUNGAN NEGARA UUS"
            },
            {
                "bank_id": "110",
                "bank_name": "PT. BANK PERMATA,TBK UUS"
            },
            {
                "bank_id": "111",
                "bank_name": "PT. BPD RIAU KEPRI SYARIAH"
            },
            {
                "bank_id": "112",
                "bank_name": "PT. BPD JAWA TENGAH UUS"
            },
            {
                "bank_id": "113",
                "bank_name": "PT. BANK DKI UUS"
            },
            {
                "bank_id": "114",
                "bank_name": "PT. BPD JAWA TIMUR UUS"
            },
            {
                "bank_id": "115",
                "bank_name": "PT. KSEI"
            },
            {
                "bank_id": "116",
                "bank_name": "PT. BANK SYARIAH INDONESIA"
            },
            {
                "bank_id": "117",
                "bank_name": "PT. BANK PANIN DUBAI SYARIAH"
            },
            {
                "bank_id": "118",
                "bank_name": "PT AIRPAY INTERNATIONAL"
            },
            {
                "bank_id": "119",
                "bank_name": "PT. BANK VICTORIA INTERNATIONAL"
            },
            {
                "bank_id": "120",
                "bank_name": "PT. BANK SULSELBAR UUS"
            },
            {
                "bank_id": "121",
                "bank_name": "PT BANK KB BUKOPIN SYARIAH"
            },
            {
                "bank_id": "122",
                "bank_name": "PT. BANK COMMONWEALTH"
            },
            {
                "bank_id": "123",
                "bank_name": "PT. BANK OCBC NISP UUS"
            },
            {
                "bank_id": "124",
                "bank_name": "PT. BANK ACEH SYARIAH"
            },
            {
                "bank_id": "125",
                "bank_name": "PT. ESPAY DEBIT INDONESIA KOE"
            },
            {
                "bank_id": "126",
                "bank_name": "PT BPD SULAWESI TENGAH"
            },
            {
                "bank_id": "127",
                "bank_name": "PT BANK AMAR INDONESIA"
            },
            {
                "bank_id": "128",
                "bank_name": "PT BANK JTRUST INDONESIA, TBK"
            },
            {
                "bank_id": "129",
                "bank_name": "PT OKE INDONESIA TBK"
            },
            {
                "bank_id": "130",
                "bank_name": "PT. BANK MIZUHO INDONESIA"
            },
            {
                "bank_id": "131",
                "bank_name": "KC JPMORGAN CHASE BANK, N.A"
            },
            {
                "bank_id": "132",
                "bank_name": "BANK OF AMERICA, N.A"
            },
            {
                "bank_id": "133",
                "bank_name": "PT. BPD BANTEN, TBK"
            },
            {
                "bank_id": "134",
                "bank_name": "PT. BPD KALTIM DAN KALTARA"
            },
            {
                "bank_id": "135",
                "bank_name": "PT. BANK ALADIN SYARIAH TBK"
            },
            {
                "bank_id": "136",
                "bank_name": "PT. BPD BENGKULU"
            },
            {
                "bank_id": "137",
                "bank_name": "PT. BANK IBK INDONESIA, TBK"
            },
            {
                "bank_id": "138",
                "bank_name": "PT. BPD MALUKU DAN MALUKU UTARA"
            },
            {
                "bank_id": "139",
                "bank_name": "PT.BPD SUMATERA UTARA UUS"
            },
            {
                "bank_id": "140",
                "bank_name": "PT. BANK SULSELBAR"
            },
            {
                "bank_id": "141",
                "bank_name": "PT. BANK MEGA SYARIAH"
            },
            {
                "bank_id": "142",
                "bank_name": "PT. BANK RESONA PERDANIA"
            },
            {
                "bank_id": "143",
                "bank_name": "PT. BPD SUMATERA UTARA"
            },
            {
                "bank_id": "144",
                "bank_name": "PT. BANK CHINA CONSTRUCTION, TBK"
            },
            {
                "bank_id": "145",
                "bank_name": "PT. BANK QNB INDONESIA TBK"
            },
            {
                "bank_id": "146",
                "bank_name": "PT. BPD SULAWESI TENGGARA"
            },
            {
                "bank_id": "147",
                "bank_name": "PT. BPD SULUT GORONTALO"
            },
            {
                "bank_id": "148",
                "bank_name": "PT. BPD KALTIM DAN KALTARA UUS"
            },
            {
                "bank_id": "149",
                "bank_name": "PT BANK SHINHAN INDONESIA"
            },
            {
                "bank_id": "150",
                "bank_name": "PT BANK ANZ INDONESIA"
            },
            {
                "bank_id": "151",
                "bank_name": "PT BPD LAMPUNG"
            },
            {
                "bank_id": "152",
                "bank_name": "PT BANK BNP PARIBAS INDONESIA"
            },
            {
                "bank_id": "153",
                "bank_name": "PT. BPD JAMBI UUS"
            },
            {
                "bank_id": "154",
                "bank_name": "PT. BPD JAMBI"
            },
            {
                "bank_id": "155",
                "bank_name": "PT. BPD KALIMANTAN TENGAH"
            },
            {
                "bank_id": "156",
                "bank_name": "PT. BANK BTPN SYARIAH TBK"
            },
            {
                "bank_id": "157",
                "bank_name": "PT. BANK NTB SYARIAH"
            },
            {
                "bank_id": "158",
                "bank_name": "PT. BANK OF CHINA (HONG KONG)"
            },
            {
                "bank_id": "159",
                "bank_name": "BANK INDONESIA"
            },
            {
                "bank_id": "160",
                "bank_name": "PT BANK KB BUKOPIN, TBK"
            },
            {
                "bank_id": "161",
                "bank_name": "STANDARD CHARTERED BANK"
            },
            {
                "bank_id": "162",
                "bank_name": "MUFG Bank, LTD."
            },
            {
                "bank_id": "163",
                "bank_name": "BANK SHINHAN"
            },
            {
                "bank_id": "168",
                "bank_name": "BANK CNB"
            },
            {
                "bank_id": "169",
                "bank_name": "PT.SUPER BANK INDONESIA"
            },
            {
                "bank_id": "170",
                "bank_name": "PT KROM BANK INDONESIA, TBK"
            },
            {
                "bank_id": "171",
                "bank_name": "PT BANK NANO SYARIAH"
            },
            {
                "bank_id": "172",
                "bank_name": "BANK BNP"
            },
            {
                "bank_id": "173",
                "bank_name": "KOP INTIDANA"
            },
            {
                "bank_id": "174",
                "bank_name": "BANK BARCLAYS"
            },
            {
                "bank_id": "175",
                "bank_name": "BPR SUPRA"
            },
            {
                "bank_id": "176",
                "bank_name": "MANDIRI - BPR"
            },
            {
                "bank_id": "177",
                "bank_name": "BPR KS"
            },
            {
                "bank_id": "178",
                "bank_name": "SGOD PAY"
            },
            {
                "bank_id": "179",
                "bank_name": "IMKAS"
            },
            {
                "bank_id": "180",
                "bank_name": "FINNET"
            },
            {
                "bank_id": "181",
                "bank_name": "ALTOCASH"
            },
            {
                "bank_id": "182",
                "bank_name": "XL TUNAI"
            },
            {
                "bank_id": "183",
                "bank_name": "BANK EKA"
            },
            {
                "bank_id": "184",
                "bank_name": "ALTOPAY"
            },
            {
                "bank_id": "185",
                "bank_name": "BANK ANDA"
            },
            {
                "bank_id": "186",
                "bank_name": "ISO"
            },
            {
                "bank_id": "187",
                "bank_name": "BPR KRYJATNIKA SDY"
            },
            {
                "bank_id": "188",
                "bank_name": "TELKOM"
            },
            {
                "bank_id": "189",
                "bank_name": "DOKU"
            },
            {
                "bank_id": "191",
                "bank_name": "ATMI"
            },
            {
                "bank_id": "192",
                "bank_name": "ATMI-EN"
            },
            {
                "bank_id": "193",
                "bank_name": "BANK SLEMAN"
            },
            {
                "bank_id": "194",
                "bank_name": "ATMBPLUS"
            },
            {
                "bank_id": "195",
                "bank_name": "DIGITAL SOLUSI PTM"
            }
        ],
        "wallets": [
            {
                "wallet_id": "164",
                "wallet_name": "OVO"
            },
            {
                "wallet_id": "165",
                "wallet_name": "DANA"
            },
            {
                "wallet_id": "167",
                "wallet_name": "GOPAY"
            }
        ]
    }
}
```

</TabItem>

<TabItem value="error">

```json
{
  "message": "Error retrieving bank and wallet lists"
}
```

</TabItem>

</Tabs>

> **💡 Note**  
> - Use the `bank_id` from the banks array as the `bank_code` parameter when creating bank withdrawal accounts.  
> - Use the `wallet_id` from the wallets array as the `bank_code` parameter when creating e-wallet withdrawal accounts.


