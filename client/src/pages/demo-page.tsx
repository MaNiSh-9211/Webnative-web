import MainLayout from "@/layouts/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileSystemTab from "@/components/demo/file-system-tab";
import CommandTab from "@/components/demo/command-tab";
import MetadataTab from "@/components/demo/metadata-tab";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("file-system");
  
  return (
    <MainLayout>
      <section className="py-20 bg-primary-800 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Try It Now
            </motion.h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl text-white/70 max-w-3xl mx-auto"
            >
              Experience the power of WebNative with this interactive demo.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass-card rounded-xl p-6 max-w-5xl mx-auto"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="border-b border-white/10 mb-6 w-full justify-start bg-transparent">
                <TabsTrigger 
                  value="file-system" 
                  className={`py-2 px-4 text-base data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-accent-blue text-white/70 data-[state=active]:shadow-none rounded-none`}
                >
                  <i className="fas fa-folder-open mr-2 text-accent-blue"></i> File System
                </TabsTrigger>
                <TabsTrigger 
                  value="command" 
                  className={`py-2 px-4 text-base data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-accent-purple text-white/70 data-[state=active]:shadow-none rounded-none`}
                >
                  <i className="fas fa-terminal mr-2 text-accent-purple"></i> Command Execution
                </TabsTrigger>
                <TabsTrigger 
                  value="meta" 
                  className={`py-2 px-4 text-base data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-accent-pink text-white/70 data-[state=active]:shadow-none rounded-none`}
                >
                  <i className="fas fa-info-circle mr-2 text-accent-pink"></i> Metadata
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="file-system">
                <FileSystemTab />
              </TabsContent>
              
              <TabsContent value="command">
                <CommandTab />
              </TabsContent>
              
              <TabsContent value="meta">
                <MetadataTab />
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-sm text-white/50">
                <p><i className="fas fa-info-circle mr-1"></i> This demo requires WebNative service to be running on your device. <a href="/#download" className="text-accent-blue hover:underline">Download and install</a> it first.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </MainLayout>
  );
}
