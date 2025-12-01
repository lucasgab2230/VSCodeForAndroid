import { Platform } from 'react-native';
import TermuxIntegration from './native';

class TermuxService {
  private instance: any;

  constructor() {
    this.instance = Platform.OS === 'android' ? TermuxIntegration : null;
  }

  async isAvailable(): Promise<boolean> {
    if (!this.instance) {
      return false;
    }

    try {
      return await this.instance.checkTermuxAvailability();
    } catch (error) {
      console.error('Error checking Termux availability:', error);
      return false;
    }
  }

  async start(): Promise<void> {
    if (!this.instance) {
      throw new Error('Termux is not available on this platform');
    }

    try {
      await this.instance.startTermux();
    } catch (error) {
      console.error('Error starting Termux:', error);
      throw error;
    }
  }

  async executeCommand(command: string): Promise<string> {
    if (!this.instance) {
      throw new Error('Termux is not available on this platform');
    }

    try {
      return await this.instance.executeTermuxCommand(command);
    } catch (error) {
      console.error('Error executing Termux command:', error);
      throw error;
    }
  }

  async openInDirectory(directory: string): Promise<void> {
    if (!this.instance) {
      throw new Error('Termux is not available on this platform');
    }

    try {
      await this.instance.openTermuxInDirectory(directory);
    } catch (error) {
      console.error('Error opening Termux in directory:', error);
      throw error;
    }
  }

  async install(): Promise<void> {
    if (!this.instance) {
      throw new Error('Termux is not available on this platform');
    }

    try {
      await this.instance.installTermux();
    } catch (error) {
      console.error('Error opening Termux installation page:', error);
      throw error;
    }
  }

  async getVersion(): Promise<string> {
    if (!this.instance) {
      throw new Error('Termux is not available on this platform');
    }

    try {
      return await this.instance.getTermuxVersion();
    } catch (error) {
      console.error('Error getting Termux version:', error);
      throw error;
    }
  }

  onCommandExecuted(callback: (event: any) => void): () => void {
    if (!this.instance) {
      return () => {};
    }

    return this.instance.onCommandExecuted(callback);
  }

  onTerminalOutput(callback: (event: any) => void): () => void {
    if (!this.instance) {
      return () => {};
    }

    return this.instance.onTerminalOutput(callback);
  }
}

export default new TermuxService();