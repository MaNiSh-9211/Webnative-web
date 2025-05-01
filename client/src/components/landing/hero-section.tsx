import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden hero-grid">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-purple/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-blue/20 rounded-full filter blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
          >
            Give your websites <span className="highlight-text">native app powers</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10"
          >
            Unlock filesystem access, run commands, and bridge the gap between web and native applications with a simple API.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20"
          >
            <Link href="#download">
              <Button className="px-8 py-6 rounded-md text-lg font-medium bg-gradient-to-r from-accent-blue to-accent-purple hover:from-accent-blue/90 hover:to-accent-purple/90 transition-all duration-300 shadow-lg shadow-accent-purple/20 h-auto">
                <i className="fas fa-download mr-2"></i> Download Now
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="px-8 py-6 rounded-md text-lg font-medium border border-white/20 hover:bg-white/5 transition-all duration-300 h-auto">
                <i className="fas fa-play mr-2"></i> Try Demo
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative animate-float"
          >
            <div className="glass-card rounded-xl p-4 shadow-2xl max-w-4xl mx-auto">
              <div className="flex items-center mb-3 px-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm text-white/50">WebNative API Demo</div>
              </div>
              <div className="bg-primary-800 rounded-lg p-4 overflow-hidden">
                <div className="text-left text-sm overflow-x-auto whitespace-pre">
                  <code className="language-javascript text-white/80">
                    // Access the file system with a simple API<br/>
                    const files = await fetch(&apos;http://localhost:35555/fs/list?path=Documents&apos;)<br/>
                      .then(res =&gt; res.json());<br/>
                    <br/>
                    // Read file contents<br/>
                    const content = await fetch(&apos;http://localhost:35555/fs/read?path=Documents/notes.txt&apos;)<br/>
                      .then(res =&gt; res.text());<br/>
                    <br/>
                    // Run commands and get output<br/>
                    const result = await fetch(&apos;http://localhost:35555/cmd/run&apos;, {`{`}<br/>
                      method: &apos;POST&apos;,<br/>
                      headers: {`{`} &apos;Content-Type&apos;: &apos;application/json&apos; {`}`},<br/>
                      body: JSON.stringify({`{`} command: &apos;dir&apos; {`}`})<br/>
                    {`}`});
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
