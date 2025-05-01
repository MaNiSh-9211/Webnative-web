import { HardDrive, Terminal, Shield, Zap, Globe, Lock } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-gradient-to-br from-[#1f2937] to-[#1f2937] p-6 rounded-lg border border-[#374151] hover:shadow-lg hover:shadow-[#6d28d9]/5 transition duration-300 group">
      <div className="w-12 h-12 bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#d1d5db]">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-[#030712] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#1f2937]/50 to-[#030712] z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Revolutionary Web Capabilities</h2>
          <p className="text-xl text-[#d1d5db] max-w-2xl mx-auto">Breaking down the barriers between web and native applications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature 
            icon={<HardDrive className="h-6 w-6 text-white" />}
            title="File System Access"
            description="Read, write, and manipulate files directly from your web application with secure, permission-based access controls."
          />
          
          <Feature 
            icon={<Terminal className="h-6 w-6 text-white" />}
            title="Command Execution"
            description="Run shell commands directly from your web app with controlled permissions and security safeguards."
          />
          
          <Feature 
            icon={<Shield className="h-6 w-6 text-white" />}
            title="Permission Management"
            description="Fine-grained control over what websites can access with an intuitive permission management interface."
          />
          
          <Feature 
            icon={<Lock className="h-6 w-6 text-white" />}
            title="Secure by Design"
            description="Built with security as a core principle. User controls permissions for each website and action."
          />
          
          <Feature 
            icon={<Zap className="h-6 w-6 text-white" />}
            title="Lightweight & Fast"
            description="Optimized background service with minimal resource usage and quick response times."
          />
          
          <Feature 
            icon={<Globe className="h-6 w-6 text-white" />}
            title="Cross-Platform Support"
            description="Works seamlessly across Windows, macOS, and Linux with consistent API and behavior."
          />
        </div>
      </div>
    </section>
  );
}
