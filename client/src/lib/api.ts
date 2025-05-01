// Base URL for the WebNative service
const BASE_URL = 'http://localhost:35555';

// Interface for API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// File or directory entry returned by list
interface FileEntry {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  lastModified?: string;
}

// Metadata returned by meta
interface FileMeta {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  created?: string;
  lastModified?: string;
  isHidden?: boolean;
  permissions?: string;
}

// Command execution result
interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

// Return paths result
interface PathsResult {
  paths: string[];
}

export async function getDrives(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/fs/drives`);
    const data = await res.json();
    if (data.success) {
      return data.drives;
    }
    throw new Error(data.error || 'Failed to fetch drives');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while fetching drives');
  }
}

export async function listDirectory(path: string): Promise<FileEntry[]> {
  try {
    const res = await fetch(`${BASE_URL}/fs/list?path=${encodeURIComponent(path)}`);
    const data = await res.json();
    if (data.success) {
      return data.entries;
    }
    throw new Error(data.error || 'Failed to list directory');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while listing directory');
  }
}

export async function readFile(path: string): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/fs/read?path=${encodeURIComponent(path)}`);
    const data = await res.text();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while reading file');
  }
}

export async function writeFile(path: string, content: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/fs/write?path=${encodeURIComponent(path)}`, {
      method: 'POST',
      body: content
    });
    const data = await res.json();
    if (data.success) {
      return true;
    }
    throw new Error(data.error || 'Failed to write file');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while writing file');
  }
}

export async function appendFile(path: string, content: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/fs/append?path=${encodeURIComponent(path)}`, {
      method: 'POST',
      body: content
    });
    const data = await res.json();
    if (data.success) {
      return true;
    }
    throw new Error(data.error || 'Failed to append to file');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while appending to file');
  }
}

export async function getFileMeta(path: string): Promise<FileMeta> {
  try {
    const res = await fetch(`${BASE_URL}/fs/meta?path=${encodeURIComponent(path)}`);
    const data = await res.json();
    if (data.success) {
      return data.meta;
    }
    throw new Error(data.error || 'Failed to get file metadata');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while getting file metadata');
  }
}

export async function checkExists(path: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/fs/exists?path=${encodeURIComponent(path)}`);
    const data = await res.json();
    return data.exists;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while checking file existence');
  }
}

export async function runCommand(command: string): Promise<CommandResult> {
  try {
    const res = await fetch(`${BASE_URL}/cmd/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command })
    });
    const data = await res.json();
    if (data.success) {
      return data.result;
    }
    throw new Error(data.error || 'Failed to run command');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while running command');
  }
}

export async function exploreSystem(): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/fs/explore`);
    const data = await res.json();
    if (data.success) {
      return data.result;
    }
    throw new Error(data.error || 'Failed to explore system');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while exploring system');
  }
}

export async function resolveFilePath(name: string): Promise<PathsResult> {
  try {
    const res = await fetch(`${BASE_URL}/fs/resolve-file-path?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    if (data.success) {
      return { paths: data.paths };
    }
    throw new Error(data.error || 'Failed to resolve file path');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while resolving file path');
  }
}

export async function resolveFolderPath(name: string): Promise<PathsResult> {
  try {
    const res = await fetch(`${BASE_URL}/fs/resolve-folder-path?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    if (data.success) {
      return { paths: data.paths };
    }
    throw new Error(data.error || 'Failed to resolve folder path');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while resolving folder path');
  }
}
