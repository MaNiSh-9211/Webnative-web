import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FileSystemTab() {
  const [drivesOutput, setDrivesOutput] = useState<string>("Drive information will appear here...");
  const [listPath, setListPath] = useState<string>("");
  const [listOutput, setListOutput] = useState<string>("Directory contents will appear here...");
  const [readPath, setReadPath] = useState<string>("");
  const [readOutput, setReadOutput] = useState<string>("File contents will appear here...");
  
  const BASE = "http://localhost:35555";
  
  const getDrives = async () => {
    try {
      const res = await fetch(`${BASE}/fs/drives`);
      const data = await res.json();
      if (data.success) {
        setDrivesOutput(data.drives.join('\n'));
      } else {
        setDrivesOutput("Failed to fetch drives.");
      }
    } catch (err) {
      setDrivesOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };
  
  const listDir = async () => {
    try {
      const res = await fetch(`${BASE}/fs/list?path=${encodeURIComponent(listPath)}`);
      setListOutput(await res.text());
    } catch (err) {
      setListOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };
  
  const readFile = async () => {
    try {
      const res = await fetch(`${BASE}/fs/read?path=${encodeURIComponent(readPath)}`);
      setReadOutput(await res.text());
    } catch (err) {
      setReadOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* List Drives */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-medium flex items-center">
          <i className="fas fa-hdd mr-2 text-accent-blue"></i> List All Drives
        </h3>
        <div className="flex">
          <Button 
            onClick={getDrives} 
            className="px-4 py-2 h-auto bg-primary-700 hover:bg-primary-600 transition-colors rounded-l-md border-r border-white/10 flex-none"
          >
            Fetch Drives
          </Button>
          <div className="flex-grow bg-primary-900/50 rounded-r-md p-3 overflow-x-auto">
            <pre className="text-sm text-white/70">{drivesOutput}</pre>
          </div>
        </div>
      </div>
      
      {/* List Directory */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-medium flex items-center">
          <i className="fas fa-folder-open mr-2 text-accent-purple"></i> List Directory
        </h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
          <Input
            value={listPath}
            onChange={(e) => setListPath(e.target.value)}
            placeholder="Enter directory path (e.g., C:/)"
            className="sm:w-64 bg-primary-900/50 border-white/10 focus:ring-accent-blue/50 rounded-md sm:rounded-r-none"
          />
          <Button
            onClick={listDir}
            className="px-4 py-2 h-auto bg-primary-700 hover:bg-primary-600 transition-colors sm:rounded-l-none rounded-md"
          >
            List
          </Button>
        </div>
        <div className="bg-primary-900/50 rounded-md p-3 h-40 overflow-y-auto">
          <pre className="text-sm text-white/70">{listOutput}</pre>
        </div>
      </div>
      
      {/* Read File */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-medium flex items-center">
          <i className="fas fa-file-alt mr-2 text-accent-pink"></i> Read File
        </h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
          <Input
            value={readPath}
            onChange={(e) => setReadPath(e.target.value)}
            placeholder="Enter file path to read"
            className="sm:w-64 bg-primary-900/50 border-white/10 focus:ring-accent-blue/50 rounded-md sm:rounded-r-none"
          />
          <Button
            onClick={readFile}
            className="px-4 py-2 h-auto bg-primary-700 hover:bg-primary-600 transition-colors sm:rounded-l-none rounded-md"
          >
            Read
          </Button>
        </div>
        <div className="bg-primary-900/50 rounded-md p-3 h-40 overflow-y-auto">
          <pre className="text-sm text-white/70">{readOutput}</pre>
        </div>
      </div>
    </div>
  );
}
