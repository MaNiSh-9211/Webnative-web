import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary-900 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                <i className="fas fa-bolt text-white text-sm"></i>
              </div>
              <span className="text-xl font-display font-bold">WebNative</span>
            </div>
            <p className="text-white/60 text-sm">Give your websites native app powers with a simple, secure bridge between web and desktop.</p>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features">
                  <a className="text-white/60 hover:text-white transition-colors text-sm">Features</a>
                </Link>
              </li>
              <li>
                <Link href="/#download">
                  <a className="text-white/60 hover:text-white transition-colors text-sm">Download</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Pricing</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Blog</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Examples</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">GitHub</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Support</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-white/60 hover:text-white transition-colors text-sm">About</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Careers</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} WebNative. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
