# VaultWeather Backend

This is the backend API for the VaultWeather system.

## Features
- Express API (`server.js`)
- MongoDB-powered drift & confidence memory
- Scroll logging (`scroll-log.js`)
- Spiral detection (`spiral-check.js`)
- API limit guard (`limit-guard.js`)

## Usage

```bash
npm install
node server.js
```

Runs at: `http://localhost:3000`

For automated forecast pulls:
```bash
node auto-pull.js
```

Requires a `.env` file with:
```
MONGODB_URI=your-mongodb-uri
OPENWEATHER_API_KEY=your-api-key
```