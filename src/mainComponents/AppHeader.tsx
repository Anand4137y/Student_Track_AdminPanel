"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"; // Corrected import
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

function AppHeader() {
    const [open, setOpen] = useState(false)
    const { setTheme } = useTheme()
    const router = useRouter();
    const [isLogouting, setIsLogouting] = useState<boolean>(false);

    const handleLogout = async() =>{
        try {
            localStorage.removeItem('token');
            router.push('/login');
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error("Logout failed")
        }
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 rounded-lg border shadow-sm">

            <SidebarTrigger />

            {/* Right Actions */}
            <div className="flex items-center gap-4">

                {/* Theme Toggle */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="/avatar.png" alt="Admin" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-6 space-y-6">
                        <nav className="flex flex-col gap-4 text-lg">
                            <Link href="/admin/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                            <Link href="/admin/schools" onClick={() => setOpen(false)}>Schools</Link>
                            <Link href="/admin/staff" onClick={() => setOpen(false)}>Staff</Link>
                            <Link href="/admin/reports" onClick={() => setOpen(false)}>Reports</Link>
                        </nav>
                        <Separator />
                        <Button variant="outline" disabled={isLogouting} className="w-full" onClick={handleLogout} >Logout</Button>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default AppHeader
