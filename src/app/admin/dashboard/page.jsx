"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-dashboard/AdminSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Index from "@/components/admin/admin-dashboard/Index";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/admin-login");
    }
  }, [router]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    return null;
  }

  return (
    <AdminSidebar>
      <Index></Index>
    </AdminSidebar>
  );
};

export default DashboardPage;