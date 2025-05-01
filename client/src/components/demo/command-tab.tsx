import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommandTab() {
  const [cmdInput, setCmdInput] = useState<string>("");
  const [cmdOutput, setCmdOutput] = useState<string>("Command output will appear here...");
  
  const BASE = "http://localhost:35555";
  
  const runCmd = async () => {
    try {
      const res = await fetch(`${BASE}/cmd/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmdInput })
      });
      setCmdOutput(await res.text());
    } catch (err) {
      setCmdOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Run Command */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-medium flex items-center">
          <i className="fas fa-terminal mr-2 text-accent-blue"></i> Run Shell Command
        </h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
          <Input
            value={cmdInput}
            onChange={(e) => setCmdInput(e.target.value)}
            placeholder="Enter command (e.g., dir, echo Hello)"
            className="flex-grow bg-primary-900/50 border-white/10 focus:ring-accent-blue/50 rounded-md sm:rounded-r-none"
          />
          <Button
            onClick={runCmd}
            className="px-4 py-2 h-auto bg-primary-700 hover:bg-primary-600 transition-colors sm:rounded-l-none rounded-md"
          >
            Run
          </Button>
        </div>
        <div className="bg-primary-900/50 rounded-md p-3 h-60 overflow-y-auto">
          <pre className="text-sm text-white/70">{cmdOutput}</pre>
        </div>
      </div>
    </div>
  );
}
