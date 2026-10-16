# DineGo Mobile (React Native / Expo)

Customer app from the DineGo architecture: login, register, forgot password, and a route-search home screen.

## Run
    npm install
    npx expo start

Scan the QR code with Expo Go (same Wi-Fi), or press `a` for an Android emulator / `i` for an iOS simulator.

## Demo mode
`src/config.ts` has `DEMO_MODE = true`. While it is true, auth and restaurant search resolve locally and the app shows a "Demo mode" banner
and SAMPLE badges. Set it to `false` once the FastAPI backend is connected, and fill in the functions in `src/services/`.
