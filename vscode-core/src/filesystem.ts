import * as vscode from 'vscode';
import * as path from 'path';
import { TextDocument } from 'vscode-languageserver-textdocument';

export interface AndroidFilesystemProvider {
  readFile(uri: vscode.Uri): Promise<Uint8Array>;
  writeFile(uri: vscode.Uri, content: Uint8Array): Promise<void>;
  deleteFile(uri: vscode.Uri): Promise<void>;
  renameFile(oldUri: vscode.Uri, newUri: vscode.Uri): Promise<void>;
  copyFile(sourceUri: vscode.Uri, targetUri: vscode.Uri): Promise<void>;
  createDirectory(uri: vscode.Uri): Promise<void>;
  deleteDirectory(uri: vscode.Uri): Promise<void>;
  listFiles(uri: vscode.Uri): Promise<vscode.FileStat[]>;
}

export class AndroidFilesystem implements AndroidFilesystemProvider {
  private workspacePath: string;

  constructor(workspacePath: string) {
    this.workspacePath = workspacePath;
  }

  async readFile(uri: vscode.Uri): Promise<Uint8Array> {
    const filePath = this.getRealPath(uri);
    
    try {
      const content = await fs.promises.readFile(filePath);
      return content;
    } catch (error) {
      throw vscode.FileSystemError.ReadFailed(uri, `Failed to read file: ${error}`);
    }
  }

  async writeFile(uri: vscode.Uri, content: Uint8Array): Promise<void> {
    const filePath = this.getRealPath(uri);
    const dirPath = path.dirname(filePath);
    
    try {
      // Ensure directory exists
      await fs.promises.mkdir(dirPath, { recursive: true });
      
      // Write file
      await fs.promises.writeFile(filePath, content);
    } catch (error) {
      throw vscode.FileSystemError.WriteFailed(uri, `Failed to write file: ${error}`);
    }
  }

  async deleteFile(uri: vscode.Uri): Promise<void> {
    const filePath = this.getRealPath(uri);
    
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      throw vscode.FileSystemError.DeleteFailed(uri, `Failed to delete file: ${error}`);
    }
  }

  async renameFile(oldUri: vscode.Uri, newUri: vscode.Uri): Promise<void> {
    const oldPath = this.getRealPath(oldUri);
    const newPath = this.getRealPath(newUri);
    
    try {
      await fs.promises.rename(oldPath, newPath);
    } catch (error) {
      throw vscode.FileSystemError.RenameFailed(oldUri, newUri, `Failed to rename file: ${error}`);
    }
  }

  async copyFile(sourceUri: vscode.Uri, targetUri: vscode.Uri): Promise<void> {
    const sourcePath = this.getRealPath(sourceUri);
    const targetPath = this.getRealPath(targetUri);
    
    try {
      await fs.promises.copyFile(sourcePath, targetPath);
    } catch (error) {
      throw vscode.FileSystemError.CopyFailed(sourceUri, targetUri, `Failed to copy file: ${error}`);
    }
  }

  async createDirectory(uri: vscode.Uri): Promise<void> {
    const dirPath = this.getRealPath(uri);
    
    try {
      await fs.promises.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw vscode.FileSystemError.CreateDirectoryFailed(uri, `Failed to create directory: ${error}`);
    }
  }

  async deleteDirectory(uri: vscode.Uri): Promise<void> {
    const dirPath = this.getRealPath(uri);
    
    try {
      await fs.promises.rmdir(dirPath);
    } catch (error) {
      throw vscode.FileSystemError.DeleteFailed(uri, `Failed to delete directory: ${error}`);
    }
  }

  async listFiles(uri: vscode.Uri): Promise<vscode.FileStat[]> {
    const dirPath = this.getRealPath(uri);
    
    try {
      const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
      const files: vscode.FileStat[] = [];
      
      for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);
        const stat = await fs.promises.stat(entryPath);
        
        files.push({
          ctime: stat.ctime.getTime(),
          mtime: stat.mtime.getTime(),
          size: stat.size,
          uri: vscode.Uri.file(entryPath),
          isDirectory: entry.isDirectory(),
          isSymbolicLink: entry.isSymbolicLink(),
        });
      }
      
      return files;
    } catch (error) {
      throw vscode.FileSystemError.ReadDirectoryFailed(uri, `Failed to read directory: ${error}`);
    }
  }

  private getRealPath(uri: vscode.Uri): string {
    // Convert vscode:// scheme to local file path
    if (uri.scheme === 'vscode') {
      const relativePath = uri.path.substring(1); // Remove leading '/'
      return path.join(this.workspacePath, relativePath);
    }
    
    // For file:// scheme, convert to local path
    if (uri.scheme === 'file') {
      return uri.fsPath;
    }
    
    // For other schemes, try to handle them appropriately
    return uri.fsPath;
  }
}

export function registerAndroidFilesystemProvider(
  context: vscode.ExtensionContext,
  workspacePath: string
): vscode.Disposable {
  const provider = new AndroidFilesystem(workspacePath);
  
  // Register filesystem provider
  const disposable = vscode.workspace.registerFileSystemProvider('vscode', provider, {
    isCaseSensitive: true,
  });
  
  return disposable;
}