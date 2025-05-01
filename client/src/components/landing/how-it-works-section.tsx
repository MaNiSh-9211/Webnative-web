import { motion } from "framer-motion";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-primary-900 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accent-blue/5 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">A simple but powerful architecture that bridges the gap between web and native.</p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 mb-8 md:mb-0 md:pr-12"
          >
            <div className="glass-card p-8 rounded-xl relative glow">
              <h3 className="text-2xl font-display font-bold mb-4">Secure Architecture</h3>
              <p className="text-white/70 mb-6">WebNative runs as a background service on your device, exposing a local API that websites can access. All requests are validated against user-defined permissions to ensure security.</p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent-blue mt-1 mr-3"></i>
                  <span className="text-white/80">Website makes a fetch request to localhost</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent-blue mt-1 mr-3"></i>
                  <span className="text-white/80">WebNative service validates permissions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent-blue mt-1 mr-3"></i>
                  <span className="text-white/80">If allowed, the service performs the requested operation</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent-blue mt-1 mr-3"></i>
                  <span className="text-white/80">Results are returned to the website</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="relative p-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl">
              <svg className="w-full h-auto rounded-lg bg-primary-800 p-8" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                {/* Browser representation */}
                <rect x="50" y="50" width="200" height="150" rx="5" fill="#1A3A75" stroke="#00A8FF" strokeWidth="2" />
                <rect x="50" y="50" width="200" height="30" rx="5" fill="#102C5A" />
                <circle cx="70" cy="65" r="5" fill="#FF0080" />
                <circle cx="90" cy="65" r="5" fill="#FFC107" />
                <circle cx="110" cy="65" r="5" fill="#4CAF50" />
                <text x="150" y="70" textAnchor="middle" fill="white" fontSize="12">Website</text>
                <text x="150" y="120" textAnchor="middle" fill="white" fontSize="12">fetch('http://localhost:35555/fs/read')</text>

                {/* Arrow pointing to WebNative Service */}
                <path d="M250 125 L350 125" stroke="#00A8FF" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="350,125 340,120 340,130" fill="#00A8FF" />

                {/* WebNative Service */}
                <rect x="350" y="50" width="200" height="150" rx="5" fill="#1A3A75" stroke="#7928CA" strokeWidth="2" />
                <text x="450" y="80" textAnchor="middle" fill="white" fontSize="14">WebNative Service</text>
                <text x="450" y="110" textAnchor="middle" fill="white" fontSize="12">Permission Check</text>
                <text x="450" y="130" textAnchor="middle" fill="white" fontSize="12">File System Operations</text>
                <text x="450" y="150" textAnchor="middle" fill="white" fontSize="12">Command Execution</text>

                {/* Arrow pointing to System */}
                <path d="M450 200 L450 250" stroke="#7928CA" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="450,250 445,240 455,240" fill="#7928CA" />

                {/* System representation */}
                <rect x="350" y="250" width="200" height="100" rx="5" fill="#102C5A" stroke="#FF0080" strokeWidth="2" />
                <text x="450" y="280" textAnchor="middle" fill="white" fontSize="14">System Resources</text>
                <text x="450" y="310" textAnchor="middle" fill="white" fontSize="12">Files / Commands / APIs</text>

                {/* User icon */}
                <circle cx="200" cy="300" r="40" fill="#1A3A75" stroke="#00A8FF" strokeWidth="2" />
                <circle cx="200" cy="280" r="15" fill="none" stroke="#FFF" strokeWidth="2" />
                <path d="M170 320 Q200 350 230 320" fill="none" stroke="#FFF" strokeWidth="2" />

                {/* Permission flow */}
                <path d="M230 280 L350 150" stroke="#FFC107" strokeWidth="2" strokeDasharray="5,5" />
                <text x="290" y="240" textAnchor="middle" fill="#FFC107" fontSize="12" transform="rotate(-30, 290, 240)">Manages Permissions</text>
              </svg>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 mt-8 md:mt-0 md:pr-12"
          >
            <div className="relative p-2 bg-gradient-to-r from-accent-purple to-accent-pink rounded-xl">
              <svg className="w-full h-auto rounded-lg bg-primary-800 p-8" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                {/* Permission UI mockup */}
                <rect x="100" y="50" width="400" height="300" rx="8" fill="#102C5A" stroke="#7928CA" strokeWidth="2" />
                <rect x="100" y="50" width="400" height="40" rx="8" fill="#0A1F3F" />
                <text x="300" y="75" textAnchor="middle" fill="white" fontSize="16">WebNative Permission Manager</text>
              
                {/* Website permission entry */}
                <rect x="120" y="110" width="360" height="70" rx="5" fill="#1A3A75" stroke="#00A8FF" strokeWidth="1" />
                <text x="140" y="135" fill="white" fontSize="14">example.com</text>
                <text x="140" y="155" fill="white" opacity="0.7" fontSize="12">File access: Documents folder</text>
              
                {/* Toggle switch */}
                <rect x="420" y="130" width="40" height="20" rx="10" fill="#00A8FF" />
                <circle cx="450" cy="140" r="10" fill="white" />
              
                {/* Second website entry */}
                <rect x="120" y="190" width="360" height="70" rx="5" fill="#1A3A75" stroke="#white" strokeWidth="1" />
                <text x="140" y="215" fill="white" fontSize="14">another-site.org</text>
                <text x="140" y="235" fill="white" opacity="0.7" fontSize="12">Command access: Limited</text>
              
                {/* Toggle switch (off) */}
                <rect x="420" y="210" width="40" height="20" rx="10" fill="#3A4F6A" />
                <circle cx="430" cy="220" r="10" fill="white" />
              
                {/* Add button */}
                <rect x="120" y="280" width="360" height="50" rx="5" fill="#102C5A" stroke="#FF0080" strokeWidth="1" />
                <text x="300" y="310" textAnchor="middle" fill="white" fontSize="14">+ Add Website Permission</text>
              </svg>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 md:pl-12"
          >
            <div className="glass-card p-8 rounded-xl relative blue-glow">
              <h3 className="text-2xl font-display font-bold mb-4">User-Controlled Permissions</h3>
              <p className="text-white/70 mb-6">The companion app gives you complete control over which websites can access your system and what actions they can perform.</p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-lock text-accent-purple mt-1 mr-3"></i>
                  <span className="text-white/80">Grant/revoke permissions per website</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-lock text-accent-purple mt-1 mr-3"></i>
                  <span className="text-white/80">Limit file access to specific directories</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-lock text-accent-purple mt-1 mr-3"></i>
                  <span className="text-white/80">Whitelist allowed commands</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-lock text-accent-purple mt-1 mr-3"></i>
                  <span className="text-white/80">View detailed access logs</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
