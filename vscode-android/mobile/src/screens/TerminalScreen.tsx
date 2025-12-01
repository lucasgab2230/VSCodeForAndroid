import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TerminalScreen = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isTermuxAvailable, setIsTermuxAvailable] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('/data/data/com.termux/files/home');

  useEffect(() => {
    // Check if Termux is available
    checkTermuxAvailability();
  }, []);

  const checkTermuxAvailability = async () => {
    try {
      // In a real app, this would check if Termux is installed and accessible
      const available = true; // This would be determined by actual device check
      setIsTermuxAvailable(available);
      if (available) {
        addOutput('Termux terminal available', 'success');
        addOutput(`Current directory: ${currentDirectory}`, 'info');
      } else {
        addOutput('Termux not found. Using built-in terminal.', 'warning');
      }
    } catch (error) {
      addOutput('Error checking Termux availability', 'error');
    }
  };

  const addOutput = (text: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const coloredText = `[${timestamp}] ${text}`;
    setOutput(prev => [...prev, coloredText]);
  };

  const executeCommand = async () => {
    if (!command.trim()) return;

    addOutput(`$ ${command}`, 'command');
    
    try {
      if (isTermuxAvailable) {
        // Execute command through Termux
        const result = await executeTermuxCommand(command);
        addOutput(result, 'success');
      } else {
        // Execute command through built-in terminal
        const result = await executeBuiltInCommand(command);
        addOutput(result, 'success');
      }
    } catch (error) {
      addOutput(`Error: ${error}`, 'error');
    }
    
    setCommand('');
  };

  const executeTermuxCommand = async (cmd: string): Promise<string> => {
    // This would interface with Termux API to execute commands
    // For now, return mock responses
    const mockResponses: Record<string, string> = {
      'ls': 'README.md  main.js  package.json  node_modules',
      'pwd': currentDirectory,
      'whoami': 'u0_a123',
      'date': new Date().toString(),
      'echo hello': 'hello',
    };

    const lowerCmd = cmd.trim().toLowerCase();
    
    if (mockResponses[lowerCmd]) {
      return mockResponses[lowerCmd];
    }

    if (lowerCmd.startsWith('cd ')) {
      const newDir = cmd.substring(3).trim();
      setCurrentDirectory(`${currentDirectory}/${newDir}`);
      return `Changed directory to: ${currentDirectory}/${newDir}`;
    }

    return `Command executed: ${cmd}`;
  };

  const executeBuiltInCommand = async (cmd: string): Promise<string> => {
    // Built-in terminal commands
    const lowerCmd = cmd.trim().toLowerCase();
    
    if (lowerCmd === 'help') {
      return 'Available commands: help, clear, echo, ls, pwd, date';
    }
    
    if (lowerCmd === 'clear') {
      setOutput([]);
      return 'Terminal cleared';
    }
    
    if (lowerCmd.startsWith('echo ')) {
      return cmd.substring(5);
    }
    
    if (lowerCmd === 'ls') {
      return 'README.md  main.js  package.json  node_modules';
    }
    
    if (lowerCmd === 'pwd') {
      return currentDirectory;
    }
    
    if (lowerCmd === 'date') {
      return new Date().toString();
    }

    return `Command not found: ${cmd}`;
  };

  const clearTerminal = () => {
    setOutput([]);
    addOutput('Terminal cleared', 'info');
  };

  const quickCommands = [
    { label: 'ls', command: 'ls' },
    { label: 'pwd', command: 'pwd' },
    { label: 'clear', command: 'clear' },
    { label: 'help', command: 'help' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Terminal {isTermuxAvailable && '(Termux)'}
        </Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearTerminal}>
          <Ionicons name="trash" size={20} color="#ffffff" />
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.outputContainer}>
        <ScrollView style={styles.output}>
          {output.map((line, index) => (
            <Text key={index} style={styles.outputLine}>
              {line}
            </Text>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={command}
          onChangeText={setCommand}
          placeholder={isTermuxAvailable ? '$ ' : 'Enter command...'}
          placeholderTextColor="#666"
          multiline
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.executeButton} onPress={executeCommand}>
          <Ionicons name="play" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.quickCommands}>
        <Text style={styles.quickCommandsTitle}>Quick Commands:</Text>
        <View style={styles.quickCommandsList}>
          {quickCommands.map((qc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickCommandButton}
              onPress={() => {
                setCommand(qc.command);
                executeCommand();
              }}
            >
              <Text style={styles.quickCommandText}>{qc.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 4,
  },
  outputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    margin: 16,
    borderRadius: 4,
  },
  output: {
    flex: 1,
    padding: 12,
  },
  outputLine: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: '#252526',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    fontFamily: 'monospace',
    borderWidth: 1,
    borderColor: '#333',
  },
  executeButton: {
    marginLeft: 8,
    backgroundColor: '#007acc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickCommands: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quickCommandsTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  quickCommandsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickCommandButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  quickCommandText: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default TerminalScreen;