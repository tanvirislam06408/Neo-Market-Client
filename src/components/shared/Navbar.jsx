import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/core/session";
import { Home, Package, List, LayoutDashboard, User, Menu } from "lucide-react";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import SignOut from "./SignOut";
import ScrollHeader from "./ScrollHeader";

export default async function Navbar() {
  const user = await getUserSession();
  
  return (
    <ScrollHeader>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-8 mt-6">
                <SheetClose asChild>
                  <div className="w-fit">
                    <Logo />
                  </div>
                </SheetClose>
                <nav className="flex flex-col gap-6">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/products" className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      <Package className="h-5 w-5" />
                      <span>Products</span>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/categories" className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      <List className="h-5 w-5" />
                      <span>Categories</span>
                    </Link>
                  </SheetClose>

                  {user && (
                    <SheetClose asChild>
                      <Link href={`/dashboard/${user?.role}`} className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    </SheetClose>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Logo />
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link href="/products" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Package className="h-4 w-4" />
            <span>Products</span>
          </Link>

          <Link href="/categories" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <List className="h-4 w-4" />
            <span>Categories</span>
          </Link>

          {user && (
            <Link href={`/dashboard/${user?.role}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image} alt={user?.name || "User"} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email || ""}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${user?.role}/profile`} className="flex items-center cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${user?.role}`} className="flex items-center cursor-pointer w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <SignOut/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signIn">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </ScrollHeader>
  );
}