import { motion } from "framer-motion";

const features = [
  {
    icon: "fas fa-folder-open",
    color: "text-accent-blue",
    title: "File System Access",
    description: "Read, write, and manage files on the user's device with a simple API. Seamlessly access local storage from any website.",
    code: "fetch('/fs/read?path=Documents/file.txt')"
  },
  {
    icon: "fas fa-terminal",
    color: "text-accent-purple",
    title: "Command Execution",
    description: "Execute shell commands and scripts from your web app. Interact with local processes and system capabilities.",
    code: "fetch('/cmd/run', { method: 'POST', body: JSON.stringify({ command: 'dir' }) })"
  },
  {
    icon: "fas fa-shield-alt",
    color: "text-accent-pink",
    title: "Secure Permissions",
    description: "User-controlled permissions for websites. Manage access to files and system functions per domain through an intuitive interface.",
    code: "// Permissions requested by domain and approved by user"
  },
  {
    icon: "fas fa-cogs",
    color: "text-accent-blue",
    title: "Background Service",
    description: "Lightweight service that runs in the background. Provides a bridge between web and native functionality without performance overhead.",
    code: "// Runs quietly in the system tray, minimal resource usage"
  },
  {
    icon: "fas fa-network-wired",
    color: "text-accent-purple",
    title: "Simple REST API",
    description: "RESTful endpoints that are easy to integrate with any framework or vanilla JavaScript. Works with any modern web technology.",
    code: "// Compatible with fetch(), axios, or any HTTP client"
  },
  {
    icon: "fas fa-rocket",
    color: "text-accent-pink",
    title: "Cross-Platform",
    description: "Works on Windows, macOS, and Linux. Consistent API across all platforms for truly universal web applications.",
    code: "// Same API interface across all operating systems"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-primary-800 relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover" style={{ filter: 'grayscale(100%) brightness(20%)' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Revolutionary Features</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">Break the constraints of traditional web applications with powerful native capabilities.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="gradient-border p-6"
            >
              <div className={`${feature.color} mb-4`}>
                <i className={`${feature.icon} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
              <p className="text-white/70 mb-4">{feature.description}</p>
              <div className="text-sm bg-primary-900/50 p-3 rounded-md">
                <code className="text-white/80">{feature.code}</code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
