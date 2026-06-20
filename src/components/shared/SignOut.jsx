'use client'
import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export default function SignOut() {
    const router = useRouter();
    const handleSignOut = async () => {
        console.log('signout');

        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signIn"); // redirect to login page
                },
            },
        });
    }
    return (
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
    )
}

