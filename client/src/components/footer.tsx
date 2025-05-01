import { Link } from "wouter";
import { Github, Twitter, AtSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030712] py-12 border-t border-[#1f2937]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-[#8a63d2] to-[#3b82f6] mr-3 flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="text-xl font-semibold text-white">WebNative</span>
            </Link>
            
            <p className="text-[#9ca3af] mt-4">
              Bridging the gap between web and native applications with secure, permission-based access.
            </p>
            
            <div className="flex space-x-4 mt-6">
              <a href="#github" className="text-[#9ca3af] hover:text-white transition duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#twitter" className="text-[#9ca3af] hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#contact" className="text-[#9ca3af] hover:text-white transition duration-300">
                <AtSign className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-[#9ca3af] hover:text-white transition duration-300">Features</a></li>
              <li><Link href="/demo" className="text-[#9ca3af] hover:text-white transition duration-300">Demo</Link></li>
              <li><a href="#download" className="text-[#9ca3af] hover:text-white transition duration-300">Download</a></li>
              <li><a href="#roadmap" className="text-[#9ca3af] hover:text-white transition duration-300">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#docs" className="text-[#9ca3af] hover:text-white transition duration-300">Documentation</a></li>
              <li><a href="#github" className="text-[#9ca3af] hover:text-white transition duration-300">GitHub</a></li>
              <li><a href="#api" className="text-[#9ca3af] hover:text-white transition duration-300">API Reference</a></li>
              <li><a href="#blog" className="text-[#9ca3af] hover:text-white transition duration-300">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[#9ca3af] hover:text-white transition duration-300">About</Link></li>
              <li><a href="#contact" className="text-[#9ca3af] hover:text-white transition duration-300">Contact</a></li>
              <li><a href="#privacy" className="text-[#9ca3af] hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#terms" className="text-[#9ca3af] hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#1f2937] text-center">
          <p className="text-[#9ca3af]">
            &copy; {new Date().getFullYear()} WebNative Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
