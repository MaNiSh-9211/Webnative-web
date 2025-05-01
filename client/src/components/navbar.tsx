import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary-900/80 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                <i className="fas fa-bolt text-white text-sm"></i>
              </div>
              <span className="text-xl font-display font-bold">WebNative</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/#features" className={`${location === "/#features" ? "text-white" : "text-white/70"} hover:text-white transition-colors duration-200`}>
                Features
              </Link>
              <Link href="/#how-it-works" className={`${location === "/#how-it-works" ? "text-white" : "text-white/70"} hover:text-white transition-colors duration-200`}>
                How It Works
              </Link>
              <Link href="/demo" className={`${location === "/demo" ? "text-white" : "text-white/70"} hover:text-white transition-colors duration-200`}>
                Demo
              </Link>
              <Link href="/about" className={`${location === "/about" ? "text-white" : "text-white/70"} hover:text-white transition-colors duration-200`}>
                About
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a href="#" className="hidden md:block px-4 py-2 text-sm rounded-md text-white/80 hover:text-white transition-colors duration-200">
              Documentation
            </a>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth" className="hidden md:block px-4 py-2 text-sm rounded-md text-white hover:text-white transition-colors duration-200 bg-gradient-to-r from-accent-blue to-accent-purple">
                Sign In
              </Link>
            )}
            
            <button 
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-primary-800/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
              <Link href="/#features" className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md">
                Features
              </Link>
              <Link href="/#how-it-works" className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md">
                How It Works
              </Link>
              <Link href="/demo" className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md">
                Demo
              </Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md">
                About
              </Link>
              <a href="#" className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md">Documentation</a>
              
              {user ? (
                <>
                  <Link href="/profile" className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md">
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link href="/auth" className="block px-3 py-2 text-base font-medium text-white hover:text-white hover:bg-white/5 rounded-md">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
