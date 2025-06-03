"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "teacher",
        },
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onRegister = async (values) => {
        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            const data = await res.json();

            if (res.status === 201) {
                toast.success(data.message || "Registered successfully");
                router.push(`/teacher/verify-code`);
                return;
            }

            if (res.status === 422) {
                setError(data.message || "Email already taken");
                toast.error(data.message || "Email already taken");
                return;
            }

            setError("Something went wrong");
            toast.error("Something went wrong");
        } catch (err) {
            console.error("Register error:", err);
            setError("Unexpected error");
            toast.error("Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-sm shadow-lg border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
                        Teacher Register
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onRegister)}
                            className="space-y-6"
                            noValidate
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                rules={{ required: "Name is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                rules={{
                                    required: "Confirm Password is required",
                                    validate: (value) =>
                                        value === form.getValues("password") ||
                                        "Passwords do not match",
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm your password"
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
                                {loading ? "Registering..." : "Register"}
                            </Button>
                        </form>
                    </Form>

                    <div className="pt-5 text-center">
                        <p className="text-sm text-gray-600">
                            Already registered?{" "}
                            <Button
                                asChild
                                variant="link"
                                className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                            >
                                <Link href="/teacher/teacher-login">Login</Link>
                            </Button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
