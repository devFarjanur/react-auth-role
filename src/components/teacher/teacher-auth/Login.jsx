"use client";

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const Login = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values) => {
        setError("")
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(values),
                }
            )

            const data = await res.json();

            if (!res.ok) {
                setError("Invalid credentials");
                toast.error("Invalid credentials")
                return;
            }

            localStorage.setItem("token", data.token);
            router.push(data.redirect_to);
            toast.success("Login in successfully")
        } catch (err) {
            setError("Something went wrong");
            console.error("Login error:", err);
            toast.error("Login error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-sm shadow-lg border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
                        Teacher Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                            noValidate
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <p className="text-sm text-red-600 text-center">{error}</p>
                            )}

                            <Button
                                type="submit"
                                className="w-full text-base sm:text-lg"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>

                    <div className="pt-5 text-center">
                        <p className="text-sm text-gray-600">
                            New here?{" "}
                            <Button asChild variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto">
                                <Link href="/teacher/teacher-register">Create an account</Link>
                            </Button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
