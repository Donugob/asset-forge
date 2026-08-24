# 🖨️ Asset Forge

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

Asset Forge is a stateless, developer-first rendering engine for generating dynamic PDFs and shareable graphics via a simple REST API.

Built as an open-source alternative to proprietary template generators, Asset Forge allows you to deploy a lightning-fast image/PDF microservice to Vercel or Docker with zero database configuration required.

## ✨ Features

- **Stateless & Edge-Ready:** No PostgreSQL or Redis needed. Just send JSON, get a binary buffer back.
- **Dual Engine:** 
  - Generates high-res, multi-page PDFs using `@react-pdf/renderer`.
  - Generates fast PNGs (like Social Share Cards) using `satori`.
- **Bring Your Own Brand:** Dynamically pass custom hex colors, fonts, and logos through the API payload.
- **React Templates:** Write your templates in React and Tailwind instead of clunky drag-and-drop web editors.

## 🚀 Quick Start (Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/Donugob/asset-forge.git
   cd asset-forge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server and visual playground:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to access the visual testing dashboard.

## 📡 API Usage Example

Send a POST request to generate an asset:

```bash
curl -X POST http://localhost:3000/api/v1/generate/pdf \
-H "Content-Type: application/json" \
-d '{
  "template_id": "modern_classic_cert",
  "data": {
    "recipient_name": "John Doe",
    "award_title": "First Place",
    "event_name": "Global Hackathon"
  }
}' --output certificate.pdf
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details on how to build new templates or improve the core engine.

## 📄 License

Asset Forge is MIT Licensed.
