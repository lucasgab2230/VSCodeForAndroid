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

## Architecture

```
vscode-android/
├── mobile/                 # React Native + Expo mobile app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # App screens (Home, Editor, Terminal, Settings)
│   │   ├── services/      # Business logic services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── App.tsx            # Main app component
│   └── index.tsx          # App entry point
├── vscode-core/           # VS Code core functionality
│   ├── src/
│   │   ├── vs/           # VS Code core modules
│   │   ├── workbench/    # Workbench functionality
│   │   ├── editor/       # Editor components
│   │   ├── platform/     # Platform adaptations
│   │   └── node/         # Node.js runtime
│   └── resources/        # VS Code resources
├── termux-integration/    # Termux native module
│   ├── android/          # Android native code
│   ├── ios/              # iOS native code
│   └── src/              # TypeScript interfaces
└── docs/                 # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- Termux app (for terminal functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/vscode-android.git
cd vscode-android
```

2. Install dependencies:
```bash
npm install
```

3. Build native modules:
```bash
npm run build:vscode-core
npm run build:termux-integration
```

4. Start the development server:
```bash
npm start
```

### Running on Android

1. Start the Android emulator or connect a device
2. Run:
```bash
npm run android
```

### Running on iOS

1. Start the iOS simulator or connect a device
2. Run:
```bash
npm run ios
```

## Termux Integration

The app integrates with Termux for full terminal functionality:

1. **Install Termux**: Install Termux from F-Droid or Google Play
2. **Enable Integration**: The app will automatically detect Termux installation
3. **Terminal Access**: Use the built-in terminal with full command-line access
4. **File Access**: Access and edit files through both the editor and terminal

## Development

### Project Structure

- **Mobile App**: React Native + Expo components and screens
- **VS Code Core**: Adapted VS Code functionality for mobile
- **Termux Integration**: Native module for terminal access
- **Android Resources**: Android-specific configurations and assets

### Building for Production

```bash
# Build Android APK
npm run build:android

# Build iOS IPA
npm run build:ios
```

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Configuration

### VS Code Settings

The app uses VS Code settings format. Create a `.vscode/settings.json` file:

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 4,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.lineNumbers": "on",
  "editor.minimap.enabled": true,
  "workbench.colorTheme": "vs-dark",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.fontFamily": "monospace"
}
```

### Termux Configuration

Termux integration can be configured in the app settings:
- Enable/disable Termux usage
- Set default working directory
- Configure terminal appearance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- 📧 Email: support@vscode-android.com
- 🐛 Issues: GitHub Issues
- 💬 Discord: Join our community server

## Roadmap

- [ ] iOS support
- [ ] Extension marketplace
- [ ] Git integration
- [ ] Debugging tools
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Multi-window support
- [ ] Cloud workspace integration