import { Helmet } from "react-helmet";
import { Check } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About WebNative - Bridging Web and Native</title>
        <meta name="description" content="Learn about WebNative's mission to bridge the gap between web and native applications with secure access to local resources." />
      </Helmet>
      <section className="py-20 bg-[#1f2937] relative overflow-hidden mt-16">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#030712] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#030712] to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Bridging the Gap Between Web and Native</h2>
              
              <p className="text-[#d1d5db] mb-4">WebNative was born from a simple observation: web applications have incredible reach, but are limited in what they can do compared to native apps.</p>
              
              <p className="text-[#d1d5db] mb-4">Our mission is to eliminate that gap by providing a secure, permission-based bridge that gives web applications the same power as native ones - without compromising security or user control.</p>
              
              <p className="text-[#d1d5db] mb-6">With WebNative, any website can access files, execute commands, and interact with the operating system - but only when the user explicitly grants permission.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-[#10b981]">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Open Source and Free</h4>
                    <p className="text-[#9ca3af]">WebNative is 100% open source, freely available for anyone to use, modify, and contribute to.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-[#10b981]">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Security First</h4>
                    <p className="text-[#9ca3af]">User control and security are paramount. All access is explicitly granted and can be revoked at any time.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-[#10b981]">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Developer Friendly</h4>
                    <p className="text-[#9ca3af]">Simple, intuitive API that works with any web technology stack or framework.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-[#1f2937] p-6 rounded-lg border border-[#374151] gradient-border">
                <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6d28d9] flex items-center justify-center mr-4">
                      <span className="font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Install Background Service</h4>
                      <p className="text-[#9ca3af] text-sm mt-1">The lightweight background service runs on your device and handles communication between websites and your system.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6d28d9] flex items-center justify-center mr-4">
                      <span className="font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Website Requests Access</h4>
                      <p className="text-[#9ca3af] text-sm mt-1">When a website wants to access your files or run commands, it makes a request to the background service.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6d28d9] flex items-center justify-center mr-4">
                      <span className="font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">You Control Permissions</h4>
                      <p className="text-[#9ca3af] text-sm mt-1">You decide which websites can access which parts of your system, with detailed control over permissions.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6d28d9] flex items-center justify-center mr-4">
                      <span className="font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Secure Communication</h4>
                      <p className="text-[#9ca3af] text-sm mt-1">All communication happens locally via secure localhost connections - your data never leaves your device.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/4 -left-20 w-40 h-40 rounded-full bg-[#6d28d9]/10 blur-3xl"></div>
              <div className="absolute -z-10 bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#3b82f6]/10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
