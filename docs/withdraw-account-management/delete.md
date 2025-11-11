---
id: withdraw-account-management/delete
title: Delete Withdrawal Account
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Delete a withdrawal account. Only accounts belonging to the authenticated user can be deleted.

**DELETE** `/api/v1/withdraw-accounts/{id}`

## Path Parameters

| Parameter | Type    | Required | Description                         |
|-----------|---------|----------|-------------------------------------|
| `id`      | integer | ✅       | The withdrawal account ID to delete.|

## Request Headers

| Header           | Value               | Required | Description                      |
|------------------|---------------------|----------|----------------------------------|
| `Accept`         | `application/json`  | ✅       | Specifies the response format.   |
| `X-MERCHANT-KEY` | `{merchant_key}`    | ✅       | Your Merchant ID.                |
| `X-API-KEY`      | `{api_key}`         | ✅       | Your API Key.                    |

## Code Examples

<Tabs groupId="withdraw-delete-code" defaultValue="curl" values={[
    { label: 'cURL', value: 'curl' },
    { label: 'PHP (Laravel)', value: 'php' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
]}>

<TabItem value="curl">

```bash
curl -X DELETE "https://api.example.com/api/v1/withdraw-accounts/1" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: merchant_key" \
  -H "X-API-KEY: api_key"
```

</TabItem>

<TabItem value="php">

```php
<?php

use Illuminate\Support\Facades\Http;

$baseUrl = 'https://api.example.com/api/v1';
$merchantKey = 'merchant_key';
$apiKey = 'api_key';
$accountId = 1;

$response = Http::timeout(60)->withHeaders([
    'Accept' => 'application/json',
    'X-MERCHANT-KEY' => $merchantKey,
    'X-API-KEY' => $apiKey,
])->delete("{$baseUrl}/withdraw-accounts/{$accountId}");

if ($response->successful()) {
    echo 'Account deleted successfully';
}
```

</TabItem>

<TabItem value="node">

```javascript
const axios = require('axios');

const baseUrl = 'https://api.example.com/api/v1';
const merchantKey = 'merchant_key';
const apiKey = 'api_key';
const accountId = 1;

axios
  .delete(`${baseUrl}/withdraw-accounts/${accountId}`, {
    headers: {
      Accept: 'application/json',
      'X-MERCHANT-KEY': merchantKey,
      'X-API-KEY': apiKey,
    },
  })
  .then(() => {
    console.log('Account deleted successfully');
  })
  .catch((error) => {
    console.error(error.response?.data || error.message);
  });
```

</TabItem>

<TabItem value="python">

```python
import requests

base_url = 'https://api.example.com/api/v1'
merchant_key = 'merchant_key'
api_key = 'api_key'
account_id = 1

headers = {
    'Accept': 'application/json',
    'X-MERCHANT-KEY': merchant_key,
    'X-API-KEY': api_key,
}

response = requests.delete(f"{base_url}/withdraw-accounts/{account_id}", headers=headers)

if response.status_code == 200:
    print('Account deleted successfully')
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```

</TabItem>

</Tabs>

## Responses

<Tabs groupId="withdraw-delete-response" defaultValue="success" values={[
    { label: 'Success', value: 'success' },
]}>

<TabItem value="success">

```json
{
  "message": "Withdraw account deleted successfully"
}
```

</TabItem>

</Tabs>

> **⚠️ Warning**  
> This action is permanent and cannot be undone. Make sure you want to delete this account before proceeding.

