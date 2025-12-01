import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      title: 'Open Folder',
      icon: 'folder-open',
      action: () => navigation.navigate('Editor'),
    },
    {
      title: 'Terminal',
      icon:terminal',
      action: () => navigation.navigate('Terminal'),
    },
    {
      title: 'Settings',
      icon: 'settings',
      action: () => navigation.navigate('Settings'),
    },
    {
      title: 'Extensions',
      icon: 'extension',
      action: () => console.log('Extensions'),
    },
    {
      title: 'Git',
      icon: 'git-branch',
      action: () => console.log('Git'),
    },
    {
      title: 'Debug',
      icon: 'bug',
      action: () => console.log('Debug'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>VS Code Android</Text>
        <Text style={styles.subtitle}>Mobile Development Environment</Text>
      </View>
      
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.action}
          >
            <Ionicons name={item.icon as any} size={24} color="#007acc" />
            <Text style={styles.menuItemText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 16,
  },
});

export default HomeScreen;