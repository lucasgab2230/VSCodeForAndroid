#!/bin/bash

# VS Code Android Run Script
# This script runs the app on the specified platform

set -e

PLATFORM=${1:-"all"}

echo "🚀 Running VS Code Android on $PLATFORM..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build native modules
echo "🔨 Building native modules..."
npm run build:vscode-core
npm run build:termux-integration

case $PLATFORM in
    "android")
        echo "📱 Running on Android..."
        npm run android
        ;;
    "ios")
        echo "🍎 Running on iOS..."
        npm run ios
        ;;
    "web")
        echo "🌐 Running on Web..."
        npm run web
        ;;
    "all")
        echo "🚀 Running on all platforms..."
        echo "📱 Starting Android..."
        npm run android &
        ANDROID_PID=$!
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "🍎 Starting iOS..."
            npm run ios &
            IOS_PID=$!
        fi
        
        echo "🌐 Starting Web..."
        npm run web &
        WEB_PID=$!
        
        echo "🚀 All platforms started. Press Ctrl+C to stop."
        
        # Wait for all processes
        wait $ANDROID_PID $IOS_PID $WEB_PID 2>/dev/null || true
        ;;
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Usage: $0 [android|ios|web|all]"
        exit 1
        ;;
esac