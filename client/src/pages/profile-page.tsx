import { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UserCircle, Key, Settings, History, Shield } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  displayName: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional(),
});

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  securityAlerts: z.boolean().default(true),
  productUpdates: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;
type NotificationsFormValues = z.infer<typeof notificationsSchema>;

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
  });
  
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      securityAlerts: true,
      productUpdates: true,
    },
  });
  
  const onProfileSubmit = (values: ProfileFormValues) => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const onSecuritySubmit = (values: SecurityFormValues) => {
    toast({
      title: "Password changed",
      description: "Your password has been successfully changed.",
    });
  };
  
  const onNotificationsSubmit = (values: NotificationsFormValues) => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#030712]">
        <Loader2 className="h-8 w-8 animate-spin text-[#8a63d2]" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#030712]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
            <CardDescription>
              You need to be logged in to access your profile.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => window.location.href = "/auth"}>
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Profile - WebNative</title>
        <meta name="description" content="Manage your WebNative profile and preferences" />
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-16 bg-[#030712]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-6">
              <Avatar className="h-24 w-24 border-2 border-[#3b82f6] shadow-lg">
                <AvatarImage 
                  src={user.profilePicture || undefined} 
                  alt={user.username} 
                />
                <AvatarFallback className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] text-2xl text-white">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {user.displayName || user.username}
            </h1>
            <p className="text-[#9ca3af]">
              Joined on {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <Card className="border-[#374151] bg-[#1f2937] shadow-xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full bg-[#111827]">
                <TabsTrigger value="profile" className="data-[state=active]:bg-[#374151]">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-[#374151]">
                  <Key className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-[#374151]">
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and email address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your display name"
                                className="bg-[#111827] border-[#374151]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              This is the name that will be displayed to other users
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com"
                                className="bg-[#111827] border-[#374151]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Your email address will not be made public
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6]"
                      >
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="security">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Change your password and manage security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...securityForm}>
                    <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                      <FormField
                        control={securityForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter your current password"
                                className="bg-[#111827] border-[#374151]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter your new password"
                                className="bg-[#111827] border-[#374151]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Confirm your new password"
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
                        className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6]"
                      >
                        Update Password
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="mt-8 pt-8 border-t border-[#374151]">
                    <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex items-start p-4 border border-[#374151] rounded-md bg-[#111827]">
                        <div className="mr-4 mt-1">
                          <Shield className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Current Session</h4>
                              <p className="text-sm text-[#9ca3af]">
                                {navigator.userAgent}
                              </p>
                            </div>
                            <p className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                              Active
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-xs text-[#9ca3af]">
                            <History className="h-3 w-3 mr-1" />
                            Started {new Date().toLocaleTimeString()} today
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="notifications">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control how you receive notifications and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...notificationsForm}>
                    <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                      <FormField
                        control={notificationsForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border border-[#374151] rounded-md bg-[#111827]">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription>
                                Receive notifications via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="securityAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border border-[#374151] rounded-md bg-[#111827]">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Security Alerts</FormLabel>
                              <FormDescription>
                                Get notified about account security events
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="productUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border border-[#374151] rounded-md bg-[#111827]">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Product Updates</FormLabel>
                              <FormDescription>
                                Receive updates about new features and releases
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6]"
                      >
                        Save Preferences
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
}