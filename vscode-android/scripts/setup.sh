#!/bin/bash

# VS Code Android Development Setup Script
# This script sets up the development environment for VS Code Android

set -e

echo "🚀 Setting up VS Code Android development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build native modules
echo "🔨 Building native modules..."
npm run build:vscode-core
npm run build:termux-integration

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p android/app/src/main/assets
mkdir -p android/app/src/main/res/drawable
mkdir -p android/app/src/main/res/values
mkdir -p android/app/src/main/res/xml

# Copy placeholder assets
echo "🎨 Copying placeholder assets..."
cp -r ../assets/* android/app/src/main/assets/ 2>/dev/null || true

# Set up environment variables
echo "⚙️ Setting up environment variables..."
cat > .env << EOF
# VS Code Android Environment Variables
EXPO_PUBLIC_API_URL=https://api.vscode-android.com
EXPO_PUBLIC_VERSION=1.0.0
EXPO_PUBLIC_BUILD_NUMBER=1
ANDROID_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
TERMUX_PACKAGE_NAME=com.termux
EOF

echo "✅ Setup complete!"
echo ""
echo "📱 To run the app:"
echo "   npm start          # Start development server"
echo "   npm run android    # Run on Android"
echo "   npm run ios        # Run on iOS"
echo ""
echo "🔧 For development:"
echo "   npm run lint       # Run linting"
echo "   npm test          # Run tests"
echo "   npm run type-check # Type checking"
echo ""
echo "📚 Documentation: README.md"