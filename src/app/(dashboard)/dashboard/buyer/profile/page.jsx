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
import ProfileInfo from "@/components/dashboard/ProfileInfo";
import ChangePassword from "@/components/dashboard/ChangePassword";

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
          <ProfileInfo user={user}/>

          {/* Change Password */}
          <ChangePassword/>
        </div>
      </div>
    </div>
  );
}