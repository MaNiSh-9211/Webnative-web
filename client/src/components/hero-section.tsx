import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function HeroSection() {
  const [terminalVisible, setTerminalVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-28 pb-20 overflow-hidden relative grid-pattern">
      <div className="absolute inset-0 bg-gradient-radial from-[#4c1d95]/20 via-[#030712] to-[#030712] z-0"></div>
      
      {/* Floating Elements Animation */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <div className="absolute h-32 w-32 rounded-full bg-[#3b82f6]/5 top-1/4 left-1/4 animate-float"></div>
        <div className="absolute h-24 w-24 rounded-full bg-[#ec4899]/5 top-1/3 right-1/3 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute h-40 w-40 rounded-full bg-[#6d28d9]/5 bottom-1/4 right-1/4 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Native Power</span>
            <span className="block">for the Modern Web</span>
          </h1>
          
          <p className="text-xl text-[#d1d5db] mb-10 max-w-2xl mx-auto">
            Unleash the full potential of web applications with direct access to file systems and OS capabilities. Bridge the gap between web and native.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="#download" className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Now
            </a>
            <Link href="/demo" className="border border-[#374151] hover:border-[#4b5563] text-white px-6 py-3 rounded-md text-lg font-medium transition duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Try Demo
            </Link>
          </div>
        </div>
        
        {/* Interactive Demo Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="code-window rounded-lg overflow-hidden glow">
            <div className="flex items-center justify-between bg-[#1f2937] px-4 py-2 border-b border-[#374151]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-[#9ca3af] text-sm font-mono">webnative-demo.js</div>
              <div></div>
            </div>
            
            <div className="p-6 text-sm font-mono bg-[#1f2937]/90 text-[#e5e7eb] overflow-x-auto">
              <div>
                <span className="text-[#ec4899]">const</span> <span className="text-[#3b82f6]">webnative</span> <span className="text-white">=</span> <span className="text-[#ec4899]">require</span><span className="text-white">(</span><span className="text-[#10b981]">'webnative'</span><span className="text-white">);</span>
              </div>
              <div className="mt-2">
                <span className="text-[#9ca3af]">// List files on the user's system</span>
              </div>
              <div className="mt-1">
                <span className="text-[#3b82f6]">webnative</span><span className="text-white">.</span><span className="text-[#06b6d4]">fs</span><span className="text-white">.</span><span className="text-[#8a63d2]">list</span><span className="text-white">(</span><span className="text-[#10b981]">"/Documents"</span><span className="text-white">)</span>
              </div>
              <div className="mt-1">
                <span className="text-white">&nbsp;&nbsp;.</span><span className="text-[#8a63d2]">then</span><span className="text-white">(</span><span className="text-[#ec4899]">files</span> <span className="text-white">{'=>'}</span> <span className="text-white">{`{`}</span>
              </div>
              <div className="mt-1">
                <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;console.</span><span className="text-[#8a63d2]">log</span><span className="text-white">(</span><span className="text-[#10b981]">"Files found:"</span><span className="text-white">,</span> <span className="text-[#ec4899]">files</span><span className="text-white">);</span>
              </div>
              <div className="mt-1">
                <span className="text-white">&nbsp;&nbsp;{`})`}</span>
              </div>
              <div className="mt-2">
                <span className="text-[#9ca3af]">// Execute a command on the user's system</span>
              </div>
              <div className="mt-1">
                <span className="text-[#3b82f6]">webnative</span><span className="text-white">.</span><span className="text-[#06b6d4]">cmd</span><span className="text-white">.</span><span className="text-[#8a63d2]">run</span><span className="text-white">(</span><span className="text-[#10b981]">"echo Hello from the web!"</span><span className="text-white">)</span>
              </div>
              <div className="mt-1">
                <span className="text-white">&nbsp;&nbsp;.</span><span className="text-[#8a63d2]">then</span><span className="text-white">(</span><span className="text-[#ec4899]">output</span> <span className="text-white">{'=>'}</span> <span className="text-white">{`{`}</span>
              </div>
              <div className="mt-1">
                <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;console.</span><span className="text-[#8a63d2]">log</span><span className="text-white">(</span><span className="text-[#10b981]">"Command output:"</span><span className="text-white">,</span> <span className="text-[#ec4899]">output</span><span className="text-white">);</span>
              </div>
              <div className="mt-1">
                <span className="text-white">&nbsp;&nbsp;{`})`}</span>
              </div>
            </div>
          </div>
          
          {/* Terminal Output Animation */}
          <div 
            className={`absolute -bottom-6 right-4 left-4 bg-[#1f2937] text-white p-4 rounded-lg border border-[#374151] transform translate-y-0 transition-all duration-700 ${terminalVisible ? 'opacity-100' : 'opacity-0'} animate-pulse-slow`}
          >
            <p className="font-mono text-sm text-[#10b981]">$ Command output: Hello from the web!</p>
          </div>
        </div>
        
        {/* Tech Logos */}
        <div className="mt-20 pt-10 border-t border-[#1f2937]">
          <p className="text-center text-[#9ca3af] mb-6">Seamlessly integrates with your tech stack</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="flex items-center justify-center w-24 h-16">
              <span className="text-[#d1d5db] font-mono font-bold">React</span>
            </div>
            <div className="flex items-center justify-center w-24 h-16">
              <span className="text-[#d1d5db] font-mono font-bold">Vue</span>
            </div>
            <div className="flex items-center justify-center w-24 h-16">
              <span className="text-[#d1d5db] font-mono font-bold">Angular</span>
            </div>
            <div className="flex items-center justify-center w-24 h-16">
              <span className="text-[#d1d5db] font-mono font-bold">Next.js</span>
            </div>
            <div className="flex items-center justify-center w-24 h-16">
              <span className="text-[#d1d5db] font-mono font-bold">Express</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
