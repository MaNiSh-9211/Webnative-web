import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DownloadSection() {
  return (
    <section id="download" className="py-20 bg-primary-900 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-purple/20 rounded-full filter blur-[100px]"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-blue/20 rounded-full filter blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to transform your web experience?</h2>
          <p className="text-xl text-white/70 mb-8">Download WebNative today and give your websites native superpowers.</p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-card p-8 rounded-xl mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="border border-white/10 rounded-lg p-4 hover:border-accent-blue/40 transition-colors"
              >
                <div className="text-4xl mb-3"><i className="fab fa-windows text-accent-blue"></i></div>
                <h3 className="font-display font-medium mb-2">Windows</h3>
                <p className="text-sm text-white/60 mb-4">Windows 10/11 64-bit</p>
                <Button className="inline-block px-4 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 transition-colors text-white rounded-md">
                  <i className="fas fa-download mr-1"></i> Download (64 MB)
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="border border-white/10 rounded-lg p-4 hover:border-accent-purple/40 transition-colors"
              >
                <div className="text-4xl mb-3"><i className="fab fa-apple text-accent-purple"></i></div>
                <h3 className="font-display font-medium mb-2">macOS</h3>
                <p className="text-sm text-white/60 mb-4">macOS 10.15+ Intel/ARM</p>
                <Button className="inline-block px-4 py-2 bg-accent-purple/20 hover:bg-accent-purple/30 transition-colors text-white rounded-md">
                  <i className="fas fa-download mr-1"></i> Download (58 MB)
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="border border-white/10 rounded-lg p-4 hover:border-accent-pink/40 transition-colors"
              >
                <div className="text-4xl mb-3"><i className="fab fa-linux text-accent-pink"></i></div>
                <h3 className="font-display font-medium mb-2">Linux</h3>
                <p className="text-sm text-white/60 mb-4">Ubuntu, Debian, Fedora</p>
                <Button className="inline-block px-4 py-2 bg-accent-pink/20 hover:bg-accent-pink/30 transition-colors text-white rounded-md">
                  <i className="fas fa-download mr-1"></i> Download (52 MB)
                </Button>
              </motion.div>
            </div>
            
            <div className="mt-6 text-sm text-white/50">
              <p>By downloading, you agree to our <a href="#" className="text-accent-blue hover:underline">Terms of Service</a> and <a href="#" className="text-accent-blue hover:underline">Privacy Policy</a>.</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center space-x-6"
          >
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <i className="fab fa-npm text-2xl"></i>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <i className="fas fa-book text-2xl"></i>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
