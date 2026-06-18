import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/core/session";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, Lock, ShieldCheck } from "lucide-react";

export default async function ProfilePage() {
  const user = await getUserSession();
  
  // Fallback initials
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "U";

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Management</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent w-full"></div>
            <CardContent className="px-6 pb-6 pt-0 flex flex-col items-center text-center -mt-12 relative">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                  <AvatarImage src={user?.image || "https://i.pravatar.cc/150?img=5"} alt={user?.name || "User"} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">{initials}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{user?.name || "User Name"}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                {user?.role === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                <span className="capitalize">{user?.role || "Buyer"} Account</span>
              </p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                    Active
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">{new Date().getFullYear()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Info */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name || "Tanvir Hossain"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email || "user@example.com"} disabled className="bg-muted/50" />
                  <p className="text-[10px] text-muted-foreground mt-1">Email cannot be changed directly.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+880 1712345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="Dhaka, Bangladesh" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 px-6 py-4 flex justify-end border-t">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* Change Password */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-muted-foreground" />
                Change Password
              </CardTitle>
              <CardDescription>
                Ensure your account is using a long, random password to stay secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <Input
                  id="current_password"
                  type="password"
                  placeholder="Enter current password"
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <Input
                  id="new_password"
                  type="password"
                  placeholder="Enter new password"
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="Confirm new password"
                  className="max-w-md"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 px-6 py-4 flex justify-end border-t">
              <Button variant="secondary" className="gap-2">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}