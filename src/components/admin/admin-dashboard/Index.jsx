"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const Index = () => {
    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                <div className="flex gap-2">
                    <Link href="/admin/inbox">
                        <Button>
                            Inbox
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="space-y-4 flex gap-2">
                <Button onClick={() => toast.success("Success! Everything went well.")}>
                    Success Toast
                </Button>

                <Button onClick={() => toast.error("Oops! Something went wrong.")}>
                    Error Toast
                </Button>

                <Button onClick={() => toast.warning("Warning! Check your input.")}>
                    Warning Toast
                </Button>

                <Button onClick={() => toast.info("FYI: Just so you know.")}>
                    Info Toast
                </Button>

                <Button
                    onClick={() => {
                        const id = toast.loading("Processing...")
                        setTimeout(() => {
                            toast.success("Done!", { id })
                        }, 2000)
                    }}
                >
                    Loading Toast
                </Button>

                <Button
                    onClick={() =>
                        toast("Custom Toast", {
                            description: "This is a fully customizable toast.",
                            action: {
                                label: "Undo",
                                onClick: () => toast.info("Undo clicked"),
                            },
                        })
                    }
                >
                    Custom Toast
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">568</div>
                        <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$23,456</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">86</div>
                        <p className="text-xs text-muted-foreground">+3 new this month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="border-b pb-2">
                                <p>Order #12345 - $125.99</p>
                                <p className="text-sm text-muted-foreground">2 hours ago</p>
                            </div>
                            <div className="border-b pb-2">
                                <p>Order #12344 - $89.50</p>
                                <p className="text-sm text-muted-foreground">5 hours ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">User Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="border-b pb-2">
                                <p>New user registered</p>
                                <p className="text-sm text-muted-foreground">3 hours ago</p>
                            </div>
                            <div className="border-b pb-2">
                                <p>Password reset requested</p>
                                <p className="text-sm text-muted-foreground">7 hours ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Index