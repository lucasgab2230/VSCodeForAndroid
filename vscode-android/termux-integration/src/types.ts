import { NativeModules } from 'react-native';

const { TermuxIntegration } = NativeModules;

export interface TermuxCommandResult {
  success: boolean;
  output: string;
  error?: string;
}

export interface TermuxService {
  isAvailable(): Promise<boolean>;
  start(): Promise<void>;
  executeCommand(command: string): Promise<string>;
  openInDirectory(directory: string): Promise<void>;
  install(): Promise<void>;
  getVersion(): Promise<string>;
  onCommandExecuted(callback: (event: any) => void): () => void;
  onTerminalOutput(callback: (event: any) => void): () => void;
}

export default TermuxIntegration as TermuxService;