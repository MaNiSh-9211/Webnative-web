import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MetadataTab() {
  const [metaPath, setMetaPath] = useState<string>("");
  const [metaOutput, setMetaOutput] = useState<string>("Metadata will appear here...");
  const [existsPath, setExistsPath] = useState<string>("");
  const [existsOutput, setExistsOutput] = useState<string>("Existence check result will appear here...");
  
  const BASE = "http://localhost:35555";
  
  const getMeta = async () => {
    try {
      const res = await fetch(`${BASE}/fs/meta?path=${encodeURIComponent(metaPath)}`);
      setMetaOutput(await res.text());
    } catch (err) {
      setMetaOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };
  
  const checkExists = async () => {
    try {
      const res = await fetch(`${BASE}/fs/exists?path=${encodeURIComponent(existsPath)}`);
      setExistsOutput(await res.text());
    } catch (err) {
      setExistsOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* File/Directory Metadata */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-medium flex items-center">
          <i className="fas fa-info-circle mr-2 text-accent-purple"></i> File/Directory Metadata
        </h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
          <Input
            value={metaPath}
            onChange={(e) => setMetaPath(e.target.value)}
            placeholder="Enter path"
            className="sm:w-64 bg-primary-900/50 border-white/10 focus:ring-accent-blue/50 rounded-md sm:rounded-r-none"
          />
          <Button
            onClick={getMeta}
            className="px-4 py-2 h-auto bg-primary-700 hover:bg-primary-600 transition-colors sm:rounded-l-none rounded-md"
          >
            Get Meta
          </Button>
        </div>
        <div className="bg-primary-900/50 rounded-md p-3 h-40 overflow-y-auto">
          <pre className="text-sm text-white/70">{metaOutput}</pre>
        </div>
      </div>
      
      {/* Check Existence */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-medium flex items-center">
          <i className="fas fa-check-circle mr-2 text-accent-pink"></i> Check Existence
        </h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
          <Input
            value={existsPath}
            onChange={(e) => setExistsPath(e.target.value)}
            placeholder="Enter path"
            className="sm:w-64 bg-primary-900/50 border-white/10 focus:ring-accent-blue/50 rounded-md sm:rounded-r-none"
          />
          <Button
            onClick={checkExists}
            className="px-4 py-2 h-auto bg-primary-700 hover:bg-primary-600 transition-colors sm:rounded-l-none rounded-md"
          >
            Check
          </Button>
        </div>
        <div className="bg-primary-900/50 rounded-md p-3 h-20 overflow-y-auto">
          <pre className="text-sm text-white/70">{existsOutput}</pre>
        </div>
      </div>
    </div>
  );
}
