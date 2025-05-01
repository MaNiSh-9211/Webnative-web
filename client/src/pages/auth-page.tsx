import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };
  
  const onRegisterSubmit = (data: RegisterFormData) => {
    const { username, password } = data;
    registerMutation.mutate({ username, password });
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 hero-grid">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-purple/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-blue/20 rounded-full filter blur-[120px]"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-6 w-full max-w-5xl z-10"
      >
        <Card className="bg-primary-800/90 backdrop-blur-md border-white/5">
          <CardHeader className="space-y-1">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center mr-2">
                <i className="fas fa-bolt text-white text-sm"></i>
              </div>
              <CardTitle className="text-2xl font-display">WebNative</CardTitle>
            </div>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
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
                            <Input placeholder="Enter your username" {...field} />
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
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 transition-opacity"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
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
                            <Input placeholder="Choose a username" {...field} />
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
                            <Input type="password" placeholder="Choose a password" {...field} />
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
                            <Input type="password" placeholder="Confirm your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 transition-opacity"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-white/5 pt-4">
            <p className="text-sm text-white/60">
              By continuing, you agree to our <a href="#" className="text-accent-blue hover:underline">Terms of Service</a> and <a href="#" className="text-accent-blue hover:underline">Privacy Policy</a>
            </p>
          </CardFooter>
        </Card>
        
        <div className="hidden md:flex flex-col justify-center p-6 blue-glow rounded-xl bg-primary-800/30 backdrop-blur-lg border border-white/5">
          <h2 className="text-3xl font-display font-bold mb-6">
            Give Your Websites <span className="highlight-text">Native Powers</span>
          </h2>
          <p className="text-white/70 mb-6">
            WebNative bridges the gap between web and native applications, allowing websites to access files, run commands, and more - all with user permission.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <i className="fas fa-check-circle text-accent-blue mt-1 mr-3"></i>
              <span>Access the file system securely</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-accent-purple mt-1 mr-3"></i>
              <span>Execute system commands</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-accent-pink mt-1 mr-3"></i>
              <span>User-controlled permissions</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-accent-blue mt-1 mr-3"></i>
              <span>Open source and free to use</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
