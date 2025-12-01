import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditorScreen = () => {
  const [currentFile, setCurrentFile] = useState('main.js');
  const [content, setContent] = useState(`// VS Code Android Editor
// Welcome to mobile development!

function greet(name) {
  return \`Hello, \${name}! Welcome to VS Code Android!\`;
}

console.log(greet('Developer'));

// Start coding here...
`);

  const files = [
    'main.js',
    'package.json',
    'README.md',
    'styles.css',
    'index.html',
  ];

  const handleFileChange = (fileName: string) => {
    setCurrentFile(fileName);
    // In a real app, this would load the file content
    setContent(`// Content of ${fileName}\n// File content would be loaded here...`);
  };

  const handleSave = () => {
    console.log(`Saving ${currentFile}...`);
    // Save logic would go here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentFile}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save" size={20} color="#ffffff" />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.fileTabs}>
        {files.map((file) => (
          <TouchableOpacity
            key={file}
            style={[
              styles.fileTab,
              currentFile === file && styles.activeFileTab,
            ]}
            onPress={() => handleFileChange(file)}
          >
            <Text style={[
              styles.fileTabText,
              currentFile === file && styles.activeFileTabText,
            ]}>
              {file}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView style={styles.editorContainer}>
        <TextInput
          style={styles.editor}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholder="Start coding..."
          placeholderTextColor="#666"
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007acc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 4,
  },
  fileTabs: {
    flexDirection: 'row',
    backgroundColor: '#252526',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  fileTab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFileTab: {
    borderBottomColor: '#007acc',
  },
  fileTabText: {
    color: '#888',
    fontSize: 14,
  },
  activeFileTabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  editorContainer: {
    flex: 1,
  },
  editor: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'monospace',
  },
});

export default EditorScreen;