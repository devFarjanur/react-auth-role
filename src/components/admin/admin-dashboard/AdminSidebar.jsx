'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarProvider,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
    SidebarFooter
} from '@/components/ui/sidebar'
import { Users } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const AdminSidebar = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        setError('')

        const token = localStorage.getItem('token');

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
                setError("Logout Failed")
                return;
            }

            localStorage.removeItem('token')
            router.push("/admin/admin-login")
        } catch (err) {
            setError("Something went wrong")
            console.error("Logout error", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="w-full flex min-h-screen">
                <Sidebar className="border-r">
                    <SidebarHeader className="p-4 border-b">
                        <span className="font-semibold text-lg text-center">Admin Panel</span>
                    </SidebarHeader>

                    <SidebarContent className="p-2">
                        <SidebarGroup>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        className="!font-bold"
                                        href="/admin/dashboard"
                                        isActive={pathname === '/admin/dashboard'}
                                        size="lg"
                                    >
                                        Dashboard
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        icon={Users}
                                        href="/admin/users"
                                        isActive={pathname.startsWith('/admin/users')}
                                        size="lg"
                                    >
                                        User Management
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={handleLogout}
                                        disabled={loading}
                                        size="lg"
                                    >
                                        Logout
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <main className="w-full bg-gray-200 min-h-screen flex flex-col relative">
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>

                    <footer className="sticky bottom-0 border-t px-4 py-3 text-xs text-muted-foreground bg-background text-center">
                        <span>&copy; {new Date().getFullYear()} YourCompany</span>
                    </footer>
                </main>

            </div>
        </SidebarProvider>
    )
}

export default AdminSidebar
