"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Register = () => {

    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "teacher"
        }
    });

    const [error, setError] = useState();
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
                        "content-type": "application/json",
                        "accept": "appliaction/json"
                    },
                    body: JSON.stringify(values),
                }
            );

            if (!res.ok) {
                setError("Invaild data");
                toast.error("Invaild data")
                return;
            }

            const data = await res.json();

            localStorage.setItem("token", data.token);
            router.push(data.redirect_to);
            toast.success("Login successfully");

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
                                                name="name"
                                                type="name"
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
                                                name="email"
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
                                                name="password"
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
                                name="password"
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confrim Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                name="password_confirmation"
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
                                {loading ? "Registring..." : "Register"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;