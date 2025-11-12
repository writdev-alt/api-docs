---
id: ip-whitelist
title: IP Whitelist Configuration
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enhance your API security by restricting access to specific IP addresses. Only whitelisted IPs can make API requests to your merchant account.

> **Security Enhancement** IP whitelisting adds an extra protection layer. Requests from non-whitelisted IPs are automatically rejected even when they include valid credentials.

## Managing the IP Whitelist

Access the management interface to add, view, and remove authorized addresses: [Manage IP Whitelist](https://sandbox.ilonapay.com/user/brand).

The dashboard lets you configure address type, description, CIDR ranges, expiration dates, and activation status.

![IP Whitelist management interface](https://sandbox.ilonapay.com/general/static/ip-whitelist.png)

## Benefits of IP Whitelisting

- **Enhanced Security**: Prevent unauthorized access even if API credentials are compromised.
- **Access Control**: Restrict API access to specific servers or environments.
- **Audit Trail**: Track and monitor which IPs have access to your API.
- **Compliance**: Meet payment security compliance requirements.

## How to Add IP Addresses

1. **Navigate to IP Whitelist Settings**: Open your merchant dashboard and go to the Security > IP Whitelist section.
2. **Add IP Address**: Click **Add IP** and enter the IPv4 or IPv6 address you want to authorize.
3. **Add Description (Optional)**: Include a description that explains the address purpose (for example, `Production Server`).
4. **Save and Activate**: Save the entry. Whitelist updates take effect immediately.

## Supported IP Formats

| Format | Example | Description |
| --- | --- | --- |
| `IPv4` | `192.168.1.100` | Standard IPv4 address format |

## Find Your Server IP Address

Use one of the following methods to determine your server's public IP address.

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
# Get your public IP address
curl -s https://api.ipify.org

# Or with more details
curl -s https://ipinfo.io/json
```

</TabItem>

<TabItem value="php-ip">

```
<?php
// Get public IP address
$ip = file_get_contents('https://api.ipify.org');
echo "Your server IP: " . $ip . "\n";

// Alternative: Get IP from request
$serverIp = $_SERVER['SERVER_ADDR'] ?? gethostbyname(gethostname());
echo "Server IP: " . $serverIp . "\n";

// Get detailed IP information
$ipInfo = json_decode(file_get_contents('https://ipinfo.io/json'), true);
echo "IP: " . $ipInfo['ip'] . "\n";
echo "Location: " . $ipInfo['city'] . ", " . $ipInfo['country'] . "\n";
```

</TabItem>

<TabItem value="node-ip">

```
const https = require('https');

// Get public IP address
https.get('https://api.ipify.org', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log('Your server IP:', data));
});

// Alternative: Using axios
const axios = require('axios');

async function getServerIP() {
    try {
        const response = await axios.get('https://ipinfo.io/json');
        console.log('IP:', response.data.ip);
        console.log('Location:', response.data.city, response.data.country);
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

# Get public IP address
response = requests.get('https://api.ipify.org')
print(f"Your server IP: {response.text}")

# Get detailed IP information
response = requests.get('https://ipinfo.io/json')
data = response.json()
print(f"IP: {data['ip']}")
print(f"Location: {data['city']}, {data['country']}")

# Alternative: Get from socket
import socket
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
print(f"Local IP: {local_ip}")
```

</TabItem>

</Tabs>

## Best Practices

> **Important Considerations**
> 
> - Always add your production server IP before deploying.
> - Maintain a secure backup of authorized IPs.
> - Use descriptive names to identify each entry.
> - Review and remove unused or outdated addresses regularly.
> - Prefer CIDR ranges for dynamic IP environments or update the whitelist whenever IPs change.
> - Test API access after adding new addresses to confirm the configuration.

## Testing IP Access

After whitelisting an IP address, validate access with a test request.

<Tabs
  defaultValue="curl-test"
  values={[{label: 'cURL', value: 'curl-test'}]}
>

<TabItem value="curl-test">

```
# Test API access from your server
curl -X GET "https://sandbox.ilonapay.com/api/v1/check-status/TEST123" \
  -H "Accept: application/json" \
  -H "X-MERCHANT-KEY: your_merchant_key" \
  -H "X-API-KEY: your_api_key"

# Expected response if IP is whitelisted:
# {"success": true, "status": "...", "transaction": {...}}

# Response if IP is not whitelisted:
# {"error": "Access denied. IP address not whitelisted", "status_code": 403}
```

</TabItem>

</Tabs>

## Troubleshooting

| Issue | Possible Cause | Solution |
| --- | --- | --- |
| 403 Access Denied | IP not whitelisted | Add the server IP to the whitelist and wait a few seconds for propagation. |
| Request fails after IP change | Server IP changed (dynamic IP) | Update the whitelist with the new address or use a CIDR range. |
| Load balancer issues | Multiple server IPs | Add every load balancer IP or use a CIDR range. |
| Proxy server blocking | Requests routed through a proxy | Add the proxy server IP to the whitelist. |

## IP Whitelist Response Codes

| Status Code | Message | Description |
| --- | --- | --- |
| `200` | Success | IP is whitelisted and the request is authorized. |
| `403` | Forbidden | IP address is not in the whitelist. |
| `401` | Unauthorized | Invalid API credentials even with a whitelisted IP. |