"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Lock, Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const ChangePassword = () => {

  const [showCurrent, setShowCurrent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const passData = Object.fromEntries(formData.entries());

    const { newPassword, confirmPassword ,currentPassword} = passData;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const { data, error } = await authClient.changePassword({
    newPassword: confirmPassword, // required
    currentPassword: currentPassword, // required
    revokeOtherSessions: true,
});
  if(data?.token){
    toast.success('password update successfully !')
    e.target.reset();
  }
  if(error?.message){
    toast.error(error.message)
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-border/50 shadow-sm">

        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Change Password
          </CardTitle>

          <CardDescription>
            Keep your account secure with a strong password.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

         
          <div className="space-y-2">
            <Label>Current Password</Label>

            <div className="relative max-w-md">
              <Input
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center justify-center"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD (NO TOGGLE) */}
          <div className="space-y-2">
            <Label>New Password</Label>

            <Input
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              className="max-w-md"
            />
          </div>

          {/* CONFIRM PASSWORD (NO TOGGLE) */}
          <div className="space-y-2">
            <Label>Confirm Password</Label>

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="max-w-md"
            />
          </div>

        </CardContent>

        <CardFooter className="flex justify-end border-t bg-muted/20 px-6 py-4">
          <Button type="submit" variant="secondary">
            Update Password
          </Button>
        </CardFooter>

      </Card>
    </form>
  );
};

export default ChangePassword;