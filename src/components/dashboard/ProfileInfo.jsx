"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from 'sonner';
import { useState } from "react";

const ProfileInfo = ({ user }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const { data, error } = await authClient.updateUser({
                name: formData.get("name"),
                phone: formData.get("phone"),
                address: formData.get("address"),
            });

            if (data?.status === true) {
                toast.success(data?.message || "Profile updated successfully", {
                    position: "top-center",
                    style: {
                        background: "#F0FDF4",
                        border: "1px solid #22C55E",
                        color: "#166534",
                    },
                });
            } else {
                const message = error?.message || data?.message || "Failed to update profile";
                toast.error(message, {
                    position: "top-center",
                    style: {
                        background: "#FEF2F2",
                        border: "1px solid #EF4444",
                        color: "#991B1B",
                    },
                });
            }


        } catch (err) {
            console.error(err);
            const message = err?.message || "An unexpected error occurred";
            toast.error(message, {
                position: "top-center",
                style: {
                    background: "#FEF2F2",
                    border: "1px solid #EF4444",
                    color: "#991B1B",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-border/50 shadow-sm">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Update your personal details here.
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
                <CardContent className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={user?.name}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input
                                defaultValue={user?.email}
                                disabled
                                className="bg-muted/50"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                defaultValue={user?.phone}
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                defaultValue={user?.address}
                            />
                        </div>

                    </div>
                </CardContent>

                <CardFooter className="flex justify-end border-t px-6 py-4">
                    <Button type="submit" disabled={loading} className="rounded-full bg-[#3E5F47] hover:bg-[#304B38] text-white px-7 transition-all duration-200">
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ProfileInfo;