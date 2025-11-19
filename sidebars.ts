import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'ip-whitelist',
    'sandbox-guide',
    'generate-qris',
    'set-status',
    {
      type: 'category',
      label: 'Wallets',
      items: [
        'wallets/wallets-index',
        'wallets/wallets-list',
        'wallets/wallets-details',
      ],
    },
    'withdrawal',
    {
      type: 'category',
      label: 'Withdraw Account Management',
      items: [
        'withdraw-account-management/withdraw-account-management-index',
        'withdraw-account-management/withdraw-account-management-list',
        'withdraw-account-management/withdraw-account-management-info',
        'withdraw-account-management/withdraw-account-management-methods',
        'withdraw-account-management/withdraw-account-management-banks-wallets',
        'withdraw-account-management/withdraw-account-management-create',
        'withdraw-account-management/withdraw-account-management-details',
        'withdraw-account-management/withdraw-account-management-update',
        'withdraw-account-management/withdraw-account-management-delete',
      ],
    },
    'webhooks',
    'support',
  ],
};

export default sidebars;
