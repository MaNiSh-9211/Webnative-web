import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { useState, useEffect } from "react";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  // Default state for authentication check
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      try {
        // Attempt to fetch the current user
        const response = await fetch('/api/user');
        if (response.ok) {
          const user = await response.json();
          setIsAuthenticated(!!user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsAuthLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Show loading spinner while checking auth
  if (isAuthLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }
  
  // Redirect to auth page if not authenticated
  if (isAuthenticated === false) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }
  
  // Render the protected component if authenticated
  return <Route path={path} component={Component} />;
}
