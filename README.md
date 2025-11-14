# IlonaPay API Documentation

[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.9.2-blue.svg)](https://docusaurus.io/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![Website](https://img.shields.io/badge/Website-Online-brightgreen.svg)](https://apidocs.ilonapay.com)

This is the official API documentation website for IlonaPay, built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Features

- 📚 Comprehensive API documentation
- 🌐 Multi-language support (English & Bahasa Indonesia)
- 💻 Interactive code examples with syntax highlighting
- 🔍 Search functionality
- 📱 Responsive design

## Prerequisites

- Node.js >= 20.0
- npm or yarn

## Installation

```bash
npm install
```

or

```bash
yarn install
```

## Local Development

```bash
npm start
```

or

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

The site will be available at `http://localhost:3000`

## Build

```bash
npm run build
```

or

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Serve Production Build

To test the production build locally:

```bash
npm run serve
```

or

```bash
yarn serve
```

## Clear Cache

If you encounter build issues, clear the cache:

```bash
npm run clear
```

or

```bash
yarn clear
```

## Deployment

The site is deployed to `https://apidocs.ilonapay.com`

For GitHub Pages deployment:

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

## Project Structure

```
api-docs/
├── docs/                    # English documentation
├── i18n/id/                 # Indonesian translations
├── src/                     # Source files
│   ├── components/          # React components
│   ├── css/                 # Custom styles
│   └── pages/               # Custom pages
├── static/                  # Static assets
└── docusaurus.config.ts     # Docusaurus configuration
```

## Contributing

1. Make your changes to the documentation files
2. Test locally using `npm start`
3. Submit a pull request

## License

Copyright © 2025 IlonaPay. All rights reserved.
