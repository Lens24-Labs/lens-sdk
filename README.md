# 👁️ Lens SDK (@lens24-labs/sdk)

[![NPM Version](https://img.shields.io/npm/v/@lens24-labs/sdk?color=blue)](https://www.npmjs.com/package/@lens24-labs/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Lens** is a lightweight, high-performance observability SDK for Node.js designed specifically for LLM applications. It helps developers track unit economics, token usage, and latency without sacrificing application performance.

---

## ✨ Key Features

- 📦 **Automated Event Batching**: Reduces network overhead by grouping events (50 events or 5s window).
- 🔌 **Graceful Shutdown**: Zero data loss. Listens to `SIGINT` and `SIGTERM` to flush the buffer before the process exits.
- 💰 **Unit Economics**: Out-of-the-box tracking for token costs and per-user usage.
- 🚀 **Ultra-low Latency**: Buffered architecture ensures your LLM calls aren't blocked by logging.
- 🛡️ **Fully Type-Safe**: Built with TypeScript for the best developer experience.

---

## 🚀 Getting Started

### Installation

```bash
npm install @lens24-labs/sdk

```

Basic Usage
Initialize the SDK and start tracking LLM interactions in seconds.

import { Lens } from '@lens24-labs/sdk';

const lens = new Lens({
  apiKey: 'YOUR_LENS_API_KEY',
  batchSize: 50,    // Optional: Defaults to 50
  flushInterval: 5000 // Optional: Defaults to 5s
});

// Track an LLM call
lens.track({
  userId: 'user_123',
  model: 'gpt-4o',
  prompt: 'What is unit economics?',
  response: 'Unit economics are...',
  tokens: 150,
  cost: 0.002
});
