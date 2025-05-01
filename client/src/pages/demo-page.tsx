import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Info,
  FileText,
  FolderPlus,
  HardDrive,
  Terminal,
  Copy,
  X,
} from "lucide-react";
import {
  getDrives,
  listDirectory,
  readFile,
  writeFile,
  appendFile,
  getFileMeta,
  checkExists,
  runCommand,
  exploreSystem,
  FileEntry,
  resolveFilePath,
  resolveFolderPath
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function DemoPage() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Input states
  const [drivePath, setDrivePath] = useState("");
  const [directoryPath, setDirectoryPath] = useState("");
  const [filePath, setFilePath] = useState("");
  const [commandInput, setCommandInput] = useState("");
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"write" | "append">("write");
  const [dialogPath, setDialogPath] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  
  // Output state
  const [outputResults, setOutputResults] = useState<string[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Test connection
  const testConnection = async () => {
    try {
      setIsLoading(true);
      await getDrives();
      setIsConnected(true);
      appendToOutput("✅ Successfully connected to WebNative service");
    } catch (error) {
      setIsConnected(false);
      appendToOutput("❌ Failed to connect to WebNative service");
      appendToOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper to append to output
  const appendToOutput = (text: string) => {
    setOutputResults(prev => [...prev, text]);
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
      }
    }, 100);
  };
  
  // Clear output
  const clearOutput = () => {
    setOutputResults([]);
  };
  
  // Copy output
  const copyOutput = () => {
    navigator.clipboard.writeText(outputResults.join("\n"))
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Output results have been copied to your clipboard."
        });
      })
      .catch(error => {
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard: " + error.message,
          variant: "destructive"
        });
      });
  };
  
  // Handlers for operations
  const handleGetDrives = async () => {
    try {
      setIsLoading(true);
      const drives = await getDrives();
      appendToOutput(`> Drives retrieved successfully`);
      drives.forEach(drive => {
        appendToOutput(`${drive}`);
      });
    } catch (error) {
      appendToOutput(`> Error fetching drives: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  

  
  const handleListDirectory = async () => {
    if (!directoryPath) {
      toast({
        title: "Path required",
        description: "Please enter a directory path",
        variant: "destructive"
      });
      return;
    }
  
    try {
      setIsLoading(true);
      const response = await listDirectory(directoryPath);
  
      if (!response.success || !Array.isArray(response.entries)) {
        appendToOutput("> Invalid response format from server");
        return;
      }
  
      appendToOutput(`> Directory ${directoryPath} listed`);
  
      response.entries.forEach((entry: FileEntry) => {
        appendToOutput(JSON.stringify(entry, null, 2)); // full object, pretty printed
      });
    } catch (error) {
      appendToOutput(`> Error listing directory: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  

  
  const handleReadFile = async () => {
    if (!filePath) {
      toast({
        title: "Path required",
        description: "Please enter a file path",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const content = await readFile(filePath);
      appendToOutput(`> Reading file: ${filePath}`);
      appendToOutput("Content:");
      appendToOutput("-------------------");
      appendToOutput(content);
      appendToOutput("-------------------");
    } catch (error) {
      appendToOutput(`> Error reading file: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const openWriteDialog = () => {
    setDialogMode("write");
    setDialogPath("");
    setDialogContent("");
    setDialogOpen(true);
  };
  
  const openAppendDialog = () => {
    setDialogMode("append");
    setDialogPath("");
    setDialogContent("");
    setDialogOpen(true);
  };
  
  const handleDialogSubmit = async () => {
    if (!dialogPath) {
      toast({
        title: "Path required",
        description: "Please enter a file path",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      if (dialogMode === "write") {
        await writeFile(dialogPath, dialogContent);
        appendToOutput(`> File successfully written: ${dialogPath}`);
      } else {
        await appendFile(dialogPath, dialogContent);
        appendToOutput(`> Content successfully appended to: ${dialogPath}`);
      }
      setDialogOpen(false);
    } catch (error) {
      appendToOutput(`> Error ${dialogMode === "write" ? "writing to" : "appending to"} file: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  

  
  const handleGetFileMeta = async () => {
    if (!filePath) {
      toast({
        title: "Path required",
        description: "Please enter a file path",
        variant: "destructive"
      });
      return;
    }
  
    try {
      setIsLoading(true);
      const meta = await getFileMeta(filePath);
      appendToOutput(`> Metadata for: ${filePath}`);
      appendToOutput(`Type: ${meta.isDirectory ? 'directory' : 'file'}`);
      if (meta.size !== undefined) appendToOutput(`Size: ${formatFileSize(meta.size)}`);
      if (meta.created) appendToOutput(`Created: ${meta.created}`);
      if (meta.modified) appendToOutput(`Modified: ${meta.modified}`);
      if (meta.accessed) appendToOutput(`Accessed: ${meta.accessed}`);
      if (meta.changed) appendToOutput(`Changed: ${meta.changed}`);
      if (meta.mimeType) appendToOutput(`MIME Type: ${meta.mimeType}`);
      if (meta.permissions) appendToOutput(`Permissions: ${meta.permissions}`);
      if (meta.mode) appendToOutput(`Mode: ${meta.mode}`);
      appendToOutput(`\nFull Metadata:\n${JSON.stringify(meta, null, 2)}`);
    } catch (error) {
      appendToOutput(`> Error getting metadata: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleCheckExists = async () => {
    if (!filePath) {
      toast({
        title: "Path required",
        description: "Please enter a file path",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const exists = await checkExists(filePath);
      appendToOutput(`> Path ${filePath} ${exists ? 'exists' : 'does not exist'}`);
    } catch (error) {
      appendToOutput(`> Error checking existence: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  


  const handleRunCommand = async () => {
    if (!commandInput) {
      toast({
        title: "Command required",
        description: "Please enter a command to execute",
        variant: "destructive"
      });
      return;
    }
  
    try {
      setIsLoading(true);
      const result = await runCommand(commandInput);
      appendToOutput(`> Command executed: ${commandInput}`);
      appendToOutput(JSON.stringify(result, null, 2)); // 👈 full pretty-printed output
    } catch (error) {
      appendToOutput(`> Error running command: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleExploreSystem = async () => {
    try {
      setIsLoading(true);
      const explorationResult = await exploreSystem();
      appendToOutput(`> System exploration completed`);
      appendToOutput(JSON.stringify(explorationResult, null, 2));
    } catch (error) {
      appendToOutput(`> Error exploring system: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format file size helper
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };
  
  return (
    <>
      <Helmet>
        <title>WebNative Demo - Try File System Access</title>
        <meta name="description" content="Interactive demo of WebNative capabilities. Access your file system and run commands directly from the web." />
      </Helmet>
      
      <section className="py-20 bg-[#030712] relative overflow-hidden grid-pattern mt-16">
        <div className="absolute inset-0 bg-gradient-radial from-[#4c1d95]/10 via-[#030712] to-[#030712] z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience the Power</h2>
            <p className="text-xl text-[#d1d5db] max-w-2xl mx-auto">
              Try out WebNative's core features right in your browser.
              <span className="block mt-2 text-base text-[#9ca3af]">
                (Requires the WebNative background service to be installed and running)
              </span>
            </p>
          </div>
          
          {isConnected === false && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Connection Failed</AlertTitle>
              <AlertDescription>
                Cannot connect to WebNative service. Make sure the service is installed and running on port 35555.
              </AlertDescription>
            </Alert>
          )}
          
          {isConnected === null && (
            <div className="text-center mb-6">
              <Button 
                onClick={testConnection}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6]"
              >
                Test Connection
              </Button>
            </div>
          )}
          
          <div className="code-window rounded-lg overflow-hidden shadow-xl bg-[#1f2937] border border-[#374151]">
            <div className="flex items-center justify-between bg-[#1f2937] px-4 py-2 border-b border-[#374151]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-[#9ca3af] text-sm font-mono">WebNative Demo</div>
              <div className="flex items-center">
                <div className="px-2 py-1 rounded bg-[#1f2937] text-xs text-[#9ca3af]">localhost:35555</div>
              </div>
            </div>
            
            {/* Demo Interface */}
            <div className="p-6 bg-[#1f2937] text-[#e5e7eb]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Navigation and Controls */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">WebNative Drive Explorer</h3>
                  
                  {/* Drive Selection */}
                  <div className="mb-6">
                    <label className="block text-[#d1d5db] text-sm font-medium mb-2">🖴 Available Drives</label>
                    <div className="flex items-center space-x-2">
                      <Select onValueChange={setDrivePath} value={drivePath}>
                        <SelectTrigger className="w-full bg-[#1f2937] border border-[#374151]">
                          <SelectValue placeholder="Select a drive" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="C:">C: (System)</SelectItem>
                          <SelectItem value="D:">D: (Data)</SelectItem>
                          <SelectItem value="/home">Home (Linux)</SelectItem>
                          <SelectItem value="/Users">Users (macOS)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleGetDrives} disabled={isLoading} size="sm" variant="secondary">
                        <HardDrive className="h-4 w-4 mr-1" />
                        List
                      </Button>
                    </div>
                  </div>
                  
                  {/* Directory Operations */}
                  <div className="mb-6">
                    <label className="block text-[#d1d5db] text-sm font-medium mb-2">📁 Browse Directory</label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        value={directoryPath}
                        onChange={(e) => setDirectoryPath(e.target.value)}
                        className="flex-1 bg-[#1f2937] border border-[#374151]" 
                        placeholder="Enter directory path" 
                      />
                      <Button onClick={handleListDirectory} disabled={isLoading} size="sm" variant="secondary">
                        <FolderPlus className="h-4 w-4 mr-1" />
                        List
                      </Button>
                    </div>
                  </div>
                  
                  {/* File Path */}
                  <div className="mb-6">
                    <label className="block text-[#d1d5db] text-sm font-medium mb-2">📄 File Path</label>
                    <Input 
                      type="text" 
                      value={filePath}
                      onChange={(e) => setFilePath(e.target.value)}
                      className="w-full bg-[#1f2937] border border-[#374151] mb-2" 
                      placeholder="Enter file path for operations below" 
                    />
                  </div>
                  
                  {/* File Operations */}
                  <div className="mb-6">
                    <label className="block text-[#d1d5db] text-sm font-medium mb-2">📄 File Operations</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={handleReadFile} disabled={isLoading} variant="secondary" className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Read File
                      </Button>
                      <Button onClick={openWriteDialog} disabled={isLoading} variant="secondary" className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Write File
                      </Button>
                      <Button onClick={openAppendDialog} disabled={isLoading} variant="secondary" className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Append to File
                      </Button>
                      <Button onClick={handleGetFileMeta} disabled={isLoading} variant="secondary" className="flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        File Info
                      </Button>
                      <Button onClick={handleCheckExists} disabled={isLoading} variant="secondary" className="flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        Check Exists
                      </Button>
                    </div>
                  </div>
                  
                  {/* Command Execution */}
                  <div>
                    <label className="block text-[#d1d5db] text-sm font-medium mb-2">🚀 Run Command</label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        className="flex-1 bg-[#1f2937] border border-[#374151]" 
                        placeholder="Enter command (e.g., echo Hello)" 
                      />
                      <Button onClick={handleRunCommand} disabled={isLoading} size="sm" variant="secondary">
                        <Terminal className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Results Display */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Results</h3>
                    <div className="flex space-x-2">
                      <Button onClick={clearOutput} size="sm" variant="outline" className="h-8 px-2">
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                      <Button onClick={copyOutput} size="sm" variant="outline" className="h-8 px-2">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  {/* Results Panel */}
                  <div 
                    ref={resultsRef}
                    className="h-96 bg-[#1f2937] border border-[#374151] rounded-md p-4 overflow-auto font-mono text-sm"
                  >
                    {outputResults.length === 0 ? (
                      <div className="text-[#9ca3af]">// Results will appear here</div>
                    ) : (
                      outputResults.map((line, index) => (
                        <div 
                          key={index} 
                          className={`${line.startsWith('>') ? 'text-[#3b82f6]' : line.startsWith('Error:') ? 'text-[#ef4444]' : line.startsWith('✅') ? 'text-[#10b981]' : line.startsWith('❌') ? 'text-[#ef4444]' : 'text-[#e5e7eb]'} ${index > 0 ? 'mt-1' : ''}`}
                        >
                          {line}
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Status Bar */}
                  <div className="mt-2 flex justify-between text-xs text-[#9ca3af]">
                    <div>Status: <span className={isConnected ? "text-[#10b981]" : "text-[#ef4444]"}>
                      {isConnected === null ? 'Unknown' : isConnected ? 'Connected' : 'Disconnected'}
                    </span></div>
                    <div>Endpoint: localhost:35555</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Write/Append Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="bg-[#1f2937] text-white border border-[#374151]">
              <DialogHeader>
                <DialogTitle>{dialogMode === "write" ? "Write to File" : "Append to File"}</DialogTitle>
                <DialogDescription className="text-[#9ca3af]">
                  {dialogMode === "write" 
                    ? "Enter the file path and content to write." 
                    : "Enter the file path and content to append."}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#d1d5db]">File Path</label>
                  <Input
                    value={dialogPath}
                    onChange={(e) => setDialogPath(e.target.value)}
                    placeholder="Enter file path"
                    className="bg-[#1f2937] border border-[#374151]"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#d1d5db]">Content</label>
                  <Textarea
                    value={dialogContent}
                    onChange={(e) => setDialogContent(e.target.value)}
                    placeholder="Enter content"
                    className="bg-[#1f2937] border border-[#374151] min-h-[100px]"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDialogSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6]"
                >
                  {dialogMode === "write" ? "Write" : "Append"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}
