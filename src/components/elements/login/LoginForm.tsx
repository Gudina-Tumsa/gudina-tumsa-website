/* eslint-disable  */
// @ts-nocheck
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import {Eye, EyeOff, LogIn, RotateCw } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { loginSuccess } from "@/app/store/features/userSlice";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await loginUser({ email, password });

            localStorage.setItem("accessToken", response.data.session.token);
            localStorage.setItem("refreshToken", response.data.session.refreshToken);

            dispatch(loginSuccess(response));
            console.log(response);
            router.push("/home");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {

        alert("Google login clicked!");
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-purple-700 mb-2">Log in to GTL</h1>
            </div>

            {errorMsg && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{errorMsg}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 block w-full h-full px-3 py-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 bottom-0 transform -translate-y-1/2 text-gray-600 hover:text-purple-700 focus:outline-none"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            tabIndex={isLoading ? -1 : 0}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-1">
                    <div></div>
                    <Link
                        href="/reset"
                        className="text-sm text-purple-600 hover:underline"
                        tabIndex={isLoading ? -1 : 0}
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="flex items-center mb-6">
                    <input
                        id="keepLoggedIn"
                        type="checkbox"
                        checked={keepLoggedIn}
                        onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                        disabled={isLoading}
                    />
                    <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-700 cursor-pointer">
                        Keep me logged in
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center gap-2 ${
                        isLoading
                            ? "bg-purple-700 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                    } text-white font-semibold py-3 rounded-md transition-colors duration-200`}
                >
                    {isLoading ? (
                        <>
                            <RotateCw className="h-5 w-5 animate-spin" />
                            Logging in...
                        </>
                    ) : (
                        "Continue"
                    )}
                </button>
            </form>

            {/* OR separator */}
            <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 before:mr-3 after:flex-1 after:border-t after:border-gray-300 after:ml-3 text-gray-400 text-sm font-semibold">
              OR
            </div>

            {/*<button*/}
            {/*    onClick={handleGoogleLogin}*/}
            {/*    disabled={isLoading}*/}
            {/*    className={`w-full flex items-center justify-center gap-2 py-3 rounded-md border transition ${*/}
            {/*        isLoading*/}
            {/*            ? "bg-purple-600 border-purple-600 cursor-not-allowed text-white"*/}
            {/*            : "bg-white border-purple-600 hover:bg-purple-50 text-purple-700"*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">*/}
            {/*        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>*/}
            {/*    </svg>*/}
            {/*     Continue with Google*/}
            {/*</button>*/}

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-700">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-purple-600 hover:underline"
                        tabIndex={isLoading ? -1 : 0}
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
