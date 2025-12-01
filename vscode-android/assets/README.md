# VS Code Android Assets

This directory contains assets for the VS Code Android app.

## Asset Requirements

### Icons
- `icon.png` - App icon (1024x1024)
- `adaptive-icon.png` - Adaptive icon (336x336)
- `splash.png` - Splash screen (2732x2732)
- `splash_logo.png` - Splash screen logo (512x512)

### Images
- `favicon.png` - Web favicon (32x32)
- `logo.png` - App logo (512x512)

### Android Resources
- `ic_*.xml` - Vector drawables for icons
- `colors.xml` - Color definitions
- `strings.xml` - String resources
- `styles.xml` - Style definitions

## Asset Guidelines

### App Icon
- Size: 1024x1024 pixels
- Format: PNG
- Background: Transparent or dark theme compatible
- Style: Consistent with VS Code branding

### Splash Screen
- Size: 2732x2732 pixels (3x iPhone 13 Pro Max resolution)
- Format: PNG
- Background: Dark theme (#1e1e1e)
- Logo: VS Code logo in white

### Adaptive Icon
- Size: 336x336 pixels
- Format: PNG
- Background: Dark theme (#1e1e1e)
- Foreground: VS Code logo in white

## Generating Assets

### Using Expo Asset Generator
```bash
npx expo install expo-asset
npx expo asset:generate
```

### Using Android Studio
1. Open Android Studio
2. Right-click on the `res` folder
3. Select "New" > "Asset Folder"
4. Follow the wizard to create asset folders

### Using Xcode (for iOS)
1. Open Xcode
2. Drag and drop assets into the Assets.xcassets folder
3. Configure all required sizes and resolutions

## Asset Optimization

### Image Compression
- Use tools like ImageOptim or TinyPNG
- Ensure images are WebP format for better performance
- Keep file sizes under 1MB where possible

### Vector Assets
- Use SVG format for vector graphics
- Convert to XML for Android vector drawables
- Use SF Symbols for iOS when available

## Asset Management

### Version Control
- Add all assets to version control
- Use descriptive filenames
- Organize by type and resolution

### Asset Updates
- Update assets when app branding changes
- Maintain consistency across platforms
- Test assets on all target devices

## Troubleshooting

### Common Issues
- **Icon not showing**: Check asset sizes and formats
- **Splash screen not working**: Verify splash.png dimensions
- **Colors not applying**: Check color resource names in styles.xml

### Debugging
- Use React Native's Image component to test assets
- Check Android logcat for asset loading errors
- Use iOS simulator to verify asset display