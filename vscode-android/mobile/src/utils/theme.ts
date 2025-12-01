import { ThemeContextType, Theme } from '@/types/theme';

export const useTheme = (): ThemeContextType => {
  const [theme, setTheme] = React.useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getThemeColors = () => {
    return theme === 'dark' ? {
      background: '#1e1e1e',
      surface: '#252526',
      primary: '#007acc',
      secondary: '#0080ff',
      accent: '#007acc',
      text: '#ffffff',
      textSecondary: '#888888',
      border: '#333333',
      error: '#d32f2f',
      success: '#4caf50',
      warning: '#ff9800',
    } : {
      background: '#ffffff',
      surface: '#f5f5f5',
      primary: '#007acc',
      secondary: '#0080ff',
      accent: '#007acc',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0',
      error: '#d32f2f',
      success: '#4caf50',
      warning: '#ff9800',
    };
  };

  return {
    theme,
    toggleTheme,
    colors: getThemeColors(),
  };
};