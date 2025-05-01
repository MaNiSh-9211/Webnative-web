import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Wrap the authentication logic with error handling
  let user = null;
  let logoutMutation = { mutate: () => {}, isPending: false };
  
  try {
    const auth = useAuth();
    user = auth.user;
    logoutMutation = auth.logoutMutation;
  } catch (error) {
    console.error("Auth context not available:", error);
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] z-50 border-b border-[#374151]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-[#8a63d2] to-[#3b82f6] mr-3 flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="text-xl font-semibold text-white">WebNative</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${location === '/' ? 'text-white' : 'text-[#d1d5db] hover:text-white'} transition duration-300`}>
              Home
            </Link>
            <Link href="/about" className={`${location === '/about' ? 'text-white' : 'text-[#d1d5db] hover:text-white'} transition duration-300`}>
              About
            </Link>
            <Link href="/demo" className={`${location === '/demo' ? 'text-white' : 'text-[#d1d5db] hover:text-white'} transition duration-300`}>
              Demo
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-[#d1d5db]">Hi, {user.username}</span>
                <Link href="/profile" className="text-[#d1d5db] hover:text-white transition duration-300">
                  Profile
                </Link>
                <Button
                  variant="ghost"
                  className="text-[#d1d5db] hover:text-white"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth" className="text-[#d1d5db] hover:text-white transition duration-300">
                Sign In
              </Link>
            )}
            <a 
              href="#download" 
              className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] text-white px-4 py-2 rounded-md hover:opacity-90 transition duration-300"
            >
              Download
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            type="button" 
            className="md:hidden bg-[#1f2937] rounded-md p-2 text-white"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1f2937] border-t border-[#374151]">
            <Link href="/" className="block px-3 py-2 text-[#d1d5db] hover:text-white transition duration-300">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 text-[#d1d5db] hover:text-white transition duration-300">
              About
            </Link>
            <Link href="/demo" className="block px-3 py-2 text-[#d1d5db] hover:text-white transition duration-300">
              Demo
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block px-3 py-2 text-[#d1d5db] hover:text-white transition duration-300">
                  Profile ({user.username})
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-[#d1d5db] hover:text-white transition duration-300"
                  onClick={() => {
                    logoutMutation.mutate();
                    setMobileMenuOpen(false);
                  }}
                  disabled={logoutMutation.isPending}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth" className="block px-3 py-2 text-[#d1d5db] hover:text-white transition duration-300">
                Sign In
              </Link>
            )}
            <a 
              href="#download" 
              className="block px-3 py-2 text-white bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] rounded-md"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
