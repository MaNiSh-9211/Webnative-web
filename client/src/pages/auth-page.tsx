import { useState, useEffect } from "react";
import { Redirect, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";

const loginSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Fetch the current user
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          return res.json();
        }
        return null;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
    retry: false
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
      }
      return await res.json() as User;
    },
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: Omit<RegisterFormValues, "confirmPassword">) => {
      const res = await apiRequest("POST", "/api/register", userData);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Registration failed");
      }
      return await res.json() as User;
    },
    onSuccess: () => {
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onLoginSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };
  
  const onRegisterSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...registerData } = values;
    registerMutation.mutate(registerData);
  };
  
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
          <div className="p-8 bg-[#1f2937] rounded-lg border border-[#374151] shadow-xl">
            <div className="mb-6 flex justify-center">
              <div className="h-12 w-12 rounded-md bg-gradient-to-r from-[#8a63d2] to-[#3b82f6] mr-3 flex items-center justify-center">
                <span className="text-white text-xl font-bold">W</span>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome to WebNative</h1>
              <p className="text-[#9ca3af] mt-2">Sign in to explore the full power of the web</p>
            </div>
            
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your username"
                              className="bg-[#111827] border-[#374151]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Enter your password"
                              className="bg-[#111827] border-[#374151]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#6d28d9] to-[#3b82f6]"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...</>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6">
                  <p className="text-center text-[#9ca3af]">
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("register")} 
                      className="text-[#8a63d2] hover:text-[#a78bdd] font-medium"
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Choose a username"
                              className="bg-[#111827] border-[#374151]"  
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Create a password"
                              className="bg-[#111827] border-[#374151]"  
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Confirm your password"
                              className="bg-[#111827] border-[#374151]"  
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#6d28d9] to-[#3b82f6]"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6">
                  <p className="text-center text-[#9ca3af]">
                    Already have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("login")} 
                      className="text-[#8a63d2] hover:text-[#a78bdd] font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Hero Section */}
          <div className="hidden lg:flex flex-col justify-center p-8 rounded-lg gradient-border relative overflow-hidden bg-[#1f2937]/30 backdrop-blur-sm">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                <span className="gradient-text">Unlock the Web's</span>
                <span className="block mt-2">Full Potential</span>
              </h2>
              
              <p className="text-lg text-[#d1d5db] mb-8">
                Connect your websites to your device's filesystem and command capabilities, all with secure permission controls.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-[#10b981]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Secure by Design</h4>
                    <p className="text-[#9ca3af]">Complete control over what each website can access on your device.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-[#10b981]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Full File System Access</h4>
                    <p className="text-[#9ca3af]">Read and write files directly from web applications.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-[#10b981]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Execute Commands</h4>
                    <p className="text-[#9ca3af]">Run system commands safely from your web browser.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background effects */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#6d28d9]/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#3b82f6]/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
