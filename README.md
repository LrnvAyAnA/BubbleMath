# BubbleMath

BubbleMath is a math learning application built with **Expo** and **React Native**. It provides interactive lessons and practice exercises to help students improve their math skills.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) installed globally

```sh
npm install -g expo-cli
```

## Installation

Clone the repository and install dependencies:

```sh
git clone <repo-url>
cd BubbleMath
npm install
```

## Available Commands

The following npm scripts are defined in `package.json`:

| Command | Description |
| ------- | ----------- |
| `npm start` | Start the Expo development server |
| `npm run android` | Launch the app on an Android emulator or device |
| `npm run ios` | Launch the app on an iOS simulator or device |
| `npm run web` | Run the web version of the app |

## Firebase Configuration

This project uses Firebase for authentication and data storage. Provide the following environment variables (for example in a `.env` file) before running the app:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

These values correspond to your Firebase project credentials.

## Running the App

After installing dependencies and configuring the environment variables, start the development server:

```sh
npm start
```

Use `npm run android`, `npm run ios`, or `npm run web` to run the app on the desired platform.
