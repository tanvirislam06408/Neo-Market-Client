"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loginAnimation from "../../../../public/lottie/login.json";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SignInPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const router=useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    const data = await authClient.signIn.email({ email, password });
    console.log("Sign In Data:", data);
    if(data.data.user){
      router.push('/')
    }
  };

  const handleGoogleSignIn = async() => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-5xl overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-xl flex flex-col md:flex-row"
      >
        {/* Lottie Animation Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden md:flex flex-col items-center justify-center bg-muted/40 p-8 md:w-1/2 relative overflow-hidden"
        >
          <div className="w-full max-w-[400px] relative z-10">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
          <div className="relative z-10 mt-8 space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Welcome Back to NeoMarket</h2>
            <p className="text-muted-foreground">Securely sign in to access your dashboard and explore our latest collections.</p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent z-0 pointer-events-none" />
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full md:w-1/2 p-8 sm:p-12 space-y-6 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-center md:text-left space-y-1"
          >
            <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
            <p className="text-sm text-muted-foreground">Enter your email and password to access your account.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-1"
            >
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                placeholder="you@example.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-1"
            >
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                placeholder="••••••••"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button type="submit" className="w-full mt-2 font-medium">
                Sign In
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="relative my-4"
          >
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button variant="outline" className="w-full font-medium" onClick={handleGoogleSignIn}>
              <svg className="mr-2 size-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-center text-sm text-muted-foreground pt-4"
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline transition-all">
              Sign Up
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignInPage;
