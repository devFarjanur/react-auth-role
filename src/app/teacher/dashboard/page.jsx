"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/teacher/teacher-login");
        }
    }, [router]);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
        return null;
    }

    return (
        <div>
            <h1>Teacher dashboard (protected)</h1>
        </div>
    );
};

export default Page;