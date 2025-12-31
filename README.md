# Ksense Healthcare API – Risk Scoring Assessment

## Overview
This project integrates with the Ksense Healthcare API to retrieve patient data, handle real-world API challenges, compute patient risk scores, generate alert lists, and submit the results back to the assessment API.

The implementation is designed to be resilient to rate limiting, intermittent server failures, pagination, and inconsistent or missing data.

## Tech Stack
- Node.js (ES Modules)
- TypeScript
- Axios
- ts-node (development)

## Setup

### 1. Install dependencies
```
npm install
```

### 2. .env Config
```
DEMO_MED_API_KEY=your-api-key-here
```
### 3. Run project
```
npm run dev
```

