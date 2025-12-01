import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export interface VSCodeAndroidConfig {
  workspacePath: string;
  defaultTheme: 'vs-dark' | 'vs' | 'hc-black';
  fontSize: number;
  tabSize: number;
  insertSpaces: boolean;
  autoSave: boolean;
  useTermux: boolean;
  termuxPath: string;
}

export class VSCodeAndroidExtension implements vscode.ExtensionContext {
  private _extensionPath: string;
  private _workspacePath: string;
  private _config: VSCodeAndroidConfig;

  constructor(extensionPath: string, workspacePath: string) {
    this._extensionPath = extensionPath;
    this._workspacePath = workspacePath;
    this._config = this.loadConfig();
  }

  get extensionPath(): string {
    return this._extensionPath;
  }

  get subscriptions(): any[] {
    return [];
  }

  get workspaceState(): vscode.Memento {
    return new MemoryMemento();
  }

  get globalState(): vscode.Memento {
    return new MemoryMemento();
  }

  get secrets(): vscode.SecretStorage {
    return new InMemorySecretStorage();
  }

  get storagePath(): string | undefined {
    return path.join(this._workspacePath, '.vscode');
  }

  get globalStoragePath(): string | undefined {
    return path.join(this._workspacePath, '.vscode', 'globalStorage');
  }

  get logPath(): string | undefined {
    return path.join(this._workspacePath, '.vscode', 'logs');
  }

  get extensionUri(): vscode.Uri {
    return vscode.Uri.file(this._extensionPath);
  }

  get workspaceFile(): vscode.Uri | undefined {
    return vscode.Uri.file(path.join(this._workspacePath, 'workspace.code-workspace'));
  }

  get workspaceFolders(): readonly vscode.WorkspaceFolder[] | undefined {
    return [
      {
        uri: vscode.Uri.file(this._workspacePath),
        name: path.basename(this._workspacePath),
        index: 0,
      }
    ];
  }

  get asAbsolutePath(relativePath: string): string {
    return path.join(this._extensionPath, relativePath);
  }

  get config(): VSCodeAndroidConfig {
    return this._config;
  }

  updateConfig(newConfig: Partial<VSCodeAndroidConfig>): void {
    this._config = { ...this._config, ...newConfig };
    this.saveConfig();
  }

  private loadConfig(): VSCodeAndroidConfig {
    const configPath = path.join(this._workspacePath, '.vscode', 'settings.json');
    
    if (fs.existsSync(configPath)) {
      try {
        const configData = fs.readFileSync(configPath, 'utf8');
        return { ...defaultConfig, ...JSON.parse(configData) };
      } catch (error) {
        console.error('Error loading config:', error);
      }
    }
    
    return defaultConfig;
  }

  private saveConfig(): void {
    const configPath = path.join(this._workspacePath, '.vscode', 'settings.json');
    const vscodeDir = path.dirname(configPath);
    
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }
    
    fs.writeFileSync(configPath, JSON.stringify(this._config, null, 2));
  }
}

const defaultConfig: VSCodeAndroidConfig = {
  workspacePath: '',
  defaultTheme: 'vs-dark',
  fontSize: 14,
  tabSize: 4,
  insertSpaces: true,
  autoSave: true,
  useTermux: true,
  termuxPath: '/data/data/com.termux/files/home',
};

class MemoryMemento implements vscode.Memento {
  private _items: Map<string, any> = new Map();

  get<T>(key: string, defaultValue?: T): T | undefined {
    return this._items.get(key) ?? defaultValue;
  }

  update(key: string, value: any): Thenable<void> {
    this._items.set(key, value);
    return Promise.resolve();
  }

  keys(): readonly string[] {
    return Array.from(this._items.keys());
  }
}

class InMemorySecretStorage implements vscode.SecretStorage {
  private _secrets: Map<string, string> = new Map();

  get(key: string): Thenable<string | undefined> {
    return Promise.resolve(this._secrets.get(key));
  }

  store(key: string, value: string): Thenable<void> {
    this._secrets.set(key, value);
    return Promise.resolve();
  }

  delete(key: string): Thenable<void> {
    this._secrets.delete(key);
    return Promise.resolve();
  }
}

export function createVSCodeAndroidContext(
  extensionPath: string,
  workspacePath: string
): VSCodeAndroidExtension {
  return new VSCodeAndroidExtension(extensionPath, workspacePath);
}