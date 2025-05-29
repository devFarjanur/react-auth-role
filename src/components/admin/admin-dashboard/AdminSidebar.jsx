'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarProvider,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader
} from '@/components/ui/sidebar'
import { Users, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import Link from 'next/link'

const AdminSidebar = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)

        const token = localStorage.getItem('token')

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (!res.ok) {
                throw new Error("Logout failed")
            }

            localStorage.removeItem('token')
            router.push("/admin/admin-login")

            toast.success("Logged out successfully")
        } catch (err) {
            toast.error("Logout failed", {
                description: err.message
            })
            console.error("Logout error", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <Sidebar className="border-r bg-card">
                    <SidebarHeader className="p-4 border-b flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/admin-avatar.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Admin Panel</p>
                            <p className="text-xs text-muted-foreground">Administrator</p>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="p-2 flex flex-col h-[calc(100%-57px)]">
                        <SidebarGroup className="flex-1">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        icon={LayoutDashboard}
                                        href="/admin/dashboard"
                                        isActive={pathname === '/admin/dashboard'}
                                        size="lg"
                                        className="hover:bg-accent/50"
                                    >

                                        <Link href="/admin/dashboard">Dashboard</Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        icon={Users}
                                        href="/admin/users"
                                        isActive={pathname.startsWith('/admin/users')}
                                        size="lg"
                                        className="hover:bg-accent/50"
                                    >
                                        User Management
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        icon={Settings}
                                        href="/admin/settings"
                                        isActive={pathname.startsWith('/admin/settings')}
                                        size="lg"
                                        className="hover:bg-accent/50"
                                    >
                                        Settings
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        icon={LogOut}
                                        onClick={handleLogout}
                                        size="lg"
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        Logout
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>
                        </SidebarGroup>

                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden bg-muted/40">
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>

                    <footer className="border-t px-6 py-3 bg-background">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
                            </span>
                            <div className="flex items-center gap-4">
                                <Button variant="link" size="sm" className="text-muted-foreground">
                                    Privacy Policy
                                </Button>
                                <Button variant="link" size="sm" className="text-muted-foreground">
                                    Terms of Service
                                </Button>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </SidebarProvider>
    )
}

export default AdminSidebar