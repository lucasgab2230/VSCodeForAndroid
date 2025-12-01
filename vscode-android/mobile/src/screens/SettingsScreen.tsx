import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    lineNumbers: true,
    wordWrap: true,
    autoIndent: true,
    showMinimap: true,
    useTermux: true,
    fontSize: 14,
    theme: 'vs-dark',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingsSections = [
    {
      title: 'Editor',
      items: [
        {
          id: 'darkMode',
          label: 'Dark Mode',
          type: 'switch',
          value: settings.darkMode,
          icon: 'moon',
          onChange: (value: boolean) => handleSettingChange('darkMode', value),
        },
        {
          id: 'fontSize',
          label: 'Font Size',
          type: 'select',
          value: settings.fontSize,
          icon: 'text',
          options: [12, 14, 16, 18, 20],
          onChange: (value: number) => handleSettingChange('fontSize', value),
        },
        {
          id: 'theme',
          label: 'Theme',
          type: 'select',
          value: settings.theme,
          icon: 'palette',
          options: ['vs-dark', 'vs', 'hc-black'],
          onChange: (value: string) => handleSettingChange('theme', value),
        },
        {
          id: 'lineNumbers',
          label: 'Line Numbers',
          type: 'switch',
          value: settings.lineNumbers,
          icon: 'list',
          onChange: (value: boolean) => handleSettingChange('lineNumbers', value),
        },
        {
          id: 'wordWrap',
          label: 'Word Wrap',
          type: 'switch',
          value: settings.wordWrap,
          icon: 'wrap',
          onChange: (value: boolean) => handleSettingChange('wordWrap', value),
        },
        {
          id: 'autoIndent',
          label: 'Auto Indent',
          type: 'switch',
          value: settings.autoIndent,
          icon: 'indent',
          onChange: (value: boolean) => handleSettingChange('autoIndent', value),
        },
        {
          id: 'showMinimap',
          label: 'Show Minimap',
          type: 'switch',
          value: settings.showMinimap,
          icon: 'map',
          onChange: (value: boolean) => handleSettingChange('showMinimap', value),
        },
      ],
    },
    {
      title: 'Terminal',
      items: [
        {
          id: 'useTermux',
          label: 'Use Termux',
          type: 'switch',
          value: settings.useTermux,
          icon: 'terminal',
          onChange: (value: boolean) => handleSettingChange('useTermux', value),
        },
        {
          id: 'autoSave',
          label: 'Auto Save',
          type: 'switch',
          value: settings.autoSave,
          icon: 'save',
          onChange: (value: boolean) => handleSettingChange('autoSave', value),
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          id: 'version',
          label: 'Version',
          type: 'info',
          value: '1.0.0',
          icon: 'information-circle',
        },
        {
          id: 'license',
          label: 'License',
          type: 'info',
          value: 'MIT',
          icon: 'document-text',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView style={styles.settingsContainer}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name={item.icon as any} size={20} color="#007acc" />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                
                {item.type === 'switch' && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onChange}
                    trackColor={{ false: '#767577', true: '#007acc' }}
                    thumbColor={item.value ? '#f5dd4b' : '#f4f3f4'}
                  />
                )}
                
                {item.type === 'select' && (
                  <TouchableOpacity style={styles.selectButton}>
                    <Text style={styles.selectText}>
                      {item.options.find(opt => opt === item.value) || item.value}
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                )}
                
                {item.type === 'info' && (
                  <Text style={styles.settingValue}>{item.value}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsContainer: {
    flex: 1,
  },
  section: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 16,
    color: '#888',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  selectText: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 8,
  },
});

export default SettingsScreen;