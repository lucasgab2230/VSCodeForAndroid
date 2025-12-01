# VS Code Android

A mobile-first Visual Studio Code implementation for Android devices with Termux integration, built with React Native and Expo.

## Features

- 📱 **Mobile-First Design**: Optimized for touch interaction and mobile workflows
- 🔧 **VS Code Core**: Full VS Code editor functionality adapted for mobile
- 🖥️ **Termux Integration**: Native terminal access through Termux app
- 🎨 **Dark/Light Themes**: VS Code themes with mobile adaptations
- 📁 **File Management**: Complete file system access and management
- 🌐 **Cross-Platform**: Built with React Native and Expo
- ⚡ **Fast Performance**: Optimized for mobile devices

## Quick Start

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio (for Android development)
- Termux app (for terminal functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/vscode-android.git
cd vscode-android
```

2. Run the setup script:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

3. Start the development server:
```bash
npm start
```

### Running on Android

```bash
npm run android
```

## Architecture

```
vscode-android/
├── mobile/                 # React Native + Expo mobile app
├── vscode-core/           # VS Code core functionality
├── termux-integration/    # Termux native module
└── docs/                 # Documentation
```

## Development

### Building for Production

```bash
./scripts/build.sh
```

### Running on Different Platforms

```bash
./scripts/run.sh android    # Android only
./scripts/run.sh ios       # iOS only (macOS)
./scripts/run.sh web       # Web
./scripts/run.sh all       # All platforms
```

## Termux Integration

The app integrates with Termux for full terminal functionality:

1. Install Termux from F-Droid
2. Enable Termux integration in app settings
3. Use the built-in terminal with full command-line access

## Configuration

Create a `.vscode/settings.json` file for VS Code settings:

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 4,
  "editor.wordWrap": "on",
  "workbench.colorTheme": "vs-dark"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- 📧 Email: support@vscode-android.com
- 🐛 Issues: GitHub Issues
- 💬 Discord: Join our community server