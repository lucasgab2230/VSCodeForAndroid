import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/utils/theme';
import { useTermuxIntegration } from '@/services/termuxIntegration';
import { useVSCodeCore } from '@/services/vscodeCore';

import HomeScreen from '@/screens/HomeScreen';
import EditorScreen from '@/screens/EditorScreen';
import TerminalScreen from '@/screens/TerminalScreen';
import SettingsScreen from '@/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  const { isTermuxAvailable, initializeTermux } = useTermuxIntegration();
  const { initializeVSCodeCore } = useVSCodeCore();

  React.useEffect(() => {
    initializeTermux();
    initializeVSCodeCore();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1e1e1e',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'VS Code Android' }} 
            />
            <Stack.Screen 
              name="Editor" 
              component={EditorScreen} 
              options={{ title: 'Editor' }} 
            />
            <Stack.Screen 
              name="Terminal" 
              component={TerminalScreen} 
              options={{ 
                title: isTermuxAvailable ? 'Terminal (Termux)' : 'Terminal' 
              }} 
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ title: 'Settings' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}