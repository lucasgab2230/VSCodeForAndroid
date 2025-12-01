#!/bin/bash

# VS Code Android Build Script
# This script builds the app for production

set -e

echo "🔨 Building VS Code Android for production..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build native modules
echo "🔨 Building native modules..."
npm run build:vscode-core
npm run build:termux-integration

# Run tests
echo "🧪 Running tests..."
npm test

# Run linting
echo "🔍 Running linting..."
npm run lint

# Type checking
echo "📝 Type checking..."
npm run type-check

# Build for Android
echo "📱 Building for Android..."
npm run build:android

# Build for iOS (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Building for iOS..."
    npm run build:ios
fi

echo "✅ Build complete!"
echo ""
echo "📱 Android APK: android/app/build/outputs/apk/release/app-release.apk"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 iOS IPA: ios/build/ios.ipa"
fi