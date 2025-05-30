"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
    const router = useRouter();
    const [tokenChecked, setTokenChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/teacher/teacher-login");
        } else {
            setTokenChecked(true);
        }
    }, [router]);

    const handleLogout = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({}),
                }
            );

            if (!res.ok) {
                toast.error("Logout failed");
                return;
            }

            localStorage.removeItem("token");
            toast.success("Logout successfully");
            router.push("/teacher/teacher-login");
        } catch (err) {
            toast.error("Logout Failed");
            console.log("Logout error", err);
        } finally {
            setLoading(false);
        }
    };

    if (!tokenChecked) return null;

    return (
        <div>
            <h1>Teacher dashboard (protected)</h1>
            <Button onClick={handleLogout} disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
            </Button>
        </div>
    );
};

export default Page;
