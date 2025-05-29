"use client"

import AdminSidebar from '@/components/admin/admin-dashboard/AdminSidebar'
import Inbox from '@/components/admin/admin-inbox/Inbox'
import React from 'react'

const page = () => {
    return (
        <div>
            <AdminSidebar>
                <Inbox />
            </AdminSidebar>
        </div >
    )
}

export default page