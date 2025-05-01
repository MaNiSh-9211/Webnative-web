import MainLayout from "@/layouts/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/");
      }
    });
  };
  
  return (
    <MainLayout>
      <div className="py-20 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-primary-800/90 backdrop-blur-md border-white/5 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-display">
                <span className="highlight-text">Profile</span>
              </CardTitle>
              <CardDescription>
                Manage your WebNative account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-white/70 mb-1">Username</h3>
                <p className="text-lg">{user?.username}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-white/70 mb-1">Account Type</h3>
                <p className="text-lg">Free Tier</p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 text-white"
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "Logging out..." : "Sign Out"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary-800/90 backdrop-blur-md border-white/5">
            <CardHeader>
              <CardTitle className="text-2xl font-display">
                Website Permissions
              </CardTitle>
              <CardDescription>
                Manage which websites can access your system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6">
                <i className="fas fa-lock text-4xl text-white/30 mb-4 block"></i>
                <p className="text-white/60">
                  You don't have any websites with permission to use WebNative yet.
                </p>
                <p className="text-white/60 mt-2">
                  When you use the WebNative service, permissions will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
