import { useState, useEffect } from "react";
import { Redirect, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useReplitAuth } from "@/hooks/use-replit-auth";

export default function ReplitAuthPage() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Check for OAuth error in URL
  const searchParams = new URLSearchParams(window.location.search);
  const oauthError = searchParams.get('error');
  
  // Show error message if OAuth authentication failed
  useEffect(() => {
    if (oauthError) {
      toast({
        title: "Authentication Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
      });
    }
  }, [oauthError, toast]);
  
  // Use Replit Auth
  const { user, isLoading: userLoading } = useReplitAuth();
  
  // Redirect if user is already logged in
  if (user && !userLoading) {
    return <Redirect to="/" />;
  }
  
  return (
    <>
      <Helmet>
        <title>Sign In - WebNative</title>
        <meta name="description" content="Sign in to access WebNative's demo features" />
      </Helmet>
      
      <div className="flex min-h-screen pt-16 items-center justify-center bg-[#030712]">
        <div className="grid lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
          {/* Auth Form */}
          <div className="p-8 bg-[#1f2937] rounded-lg border border-[#374151] shadow-xl relative overflow-hidden">
            {/* Background graphic elements */}
            <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full -top-32 -right-32 blur-2xl"></div>
            <div className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full -bottom-32 -left-32 blur-2xl"></div>
            
            <div className="mb-6 flex justify-center relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-[#8a63d2] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-[#8a63d2]/20">
                <span className="text-white text-2xl font-bold">W</span>
              </div>
            </div>
            
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Welcome to WebNative</h1>
              <p className="text-[#9ca3af] mt-2 text-lg">Sign in to explore the full power of the web</p>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="p-8 rounded-lg bg-[#111827]/50 backdrop-blur-sm">
                <p className="text-white text-center mb-6">Sign in to your account to access all features</p>
                
                <a 
                  href="/api/login" 
                  className="flex items-center justify-center bg-[#5E5ADB] text-white rounded-md px-4 py-3 w-full text-sm font-medium hover:bg-[#4A47B1] transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="mr-2">
                    <path fill="currentColor" d="M10.25 0H7v9a1 1 0 0 0 1 1h5.375a1 1 0 0 0 .952-1.297l-3.125-8A1 1 0 0 0 10.25 0zM0 10a10.016 10.016 0 0 0 10 10c5.493 0 10-4.507 10-10h-3.897a6.116 6.116 0 0 1-6.103 5.936c-3.321 0-6-2.75-6-6.163V7H0v3z"/>
                  </svg>
                  Log in with Replit
                </a>
              </div>
            </div>
          </div>
          
          {/* Hero Section */}
          <div className="hidden lg:flex flex-col justify-center text-white">
            <h2 className="text-4xl font-bold mb-6">Access to Native Features</h2>
            <p className="text-[#9ca3af] mb-8 text-lg">
              WebNative bridges the gap between web and native applications, providing secure access to file systems and command execution capabilities.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Secure File System Access</h3>
                  <p className="text-[#9ca3af]">Enable web applications to access file systems with configurable permissions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Execute Commands</h3>
                  <p className="text-[#9ca3af]">Run system commands from web applications with security controls.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Real-time Updates</h3>
                  <p className="text-[#9ca3af]">Get real-time file system and command execution events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}