/* eslint-disable  */
// @ts-nocheck
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/app/store/features/userSlice";
import { AppDispatch } from "@/app/store/store";
import { UserResponse } from "@/types/auth";
import { useRouter } from "next/navigation";

interface CreateUserResponse {
    data: {
        user: UserResponse;
        session: {
            token: string;
            refreshToken: string;
            deviceId: string;
            createdAt: Date;
            expiresAt: Date;
        };
    };
}

const SignUpForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const role = "basic";
    const languagePreference = "en";
    const readingPreferences = "en";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!agreedToTerms){
            setError("You must agree to the Terms and Conditions");
            setIsLoading(false);
            return;
        }
        // Basic validation
        if (!firstName || !lastName || !email || !password || !username) {
            setError("Please fill in all required fields");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setIsLoading(false);
            return;
        }

        dispatch(loginStart());

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    username,
                    password,
                    role,
                    languagePreference,
                    readingPreferences,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Signup failed");
            }

            const data: CreateUserResponse = await response.json();

            dispatch(
                loginSuccess({
                    data: {
                        user: data.data.user,
                        session: data.data.session,
                    },
                })
            );

            router.push("/home");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Signup failed";
            setError(errorMessage);
            dispatch(loginFailure(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    // Dummy Google signup handler — replace with real logic
    const handleGoogleSignUp = () => {
        alert("Google signup clicked!");
        // Here you can redirect to your Google OAuth flow or popup
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center mb-8">
                <h1 className="font-poppins text-2xl font-semibold text-gray-900 mb-2">
                    Create your GTL account
                </h1>
            </div>

            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="text-sm font-medium text-gray-700 block mb-1">
                                First Name *
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="text-sm font-medium text-gray-700 block mb-1">
                                Last Name *
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                            Email *
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-1">
                            Username *
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 block mb-1">
                        Phone *
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                            +251
                        </span>

                        <input
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]{9}"
                            value={phone}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                setPhone(onlyNums);
                            }}
                            placeholder="912345678"
                            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                            Password *
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1">
                            Confirm Password *
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-1 h-4 w-4 text-[#9407F2] border-gray-300 rounded focus:ring-blue-500"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                            I agree to the{" "}
                            <Link href="/terms" target="_blank" className="text-[#9407F2] hover:underline">
                                Terms and Conditions
                            </Link>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full font-poppins bg-[#9407F2] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ${
                        isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-purple-800"
                    }`}
                >
                    {isLoading ? "Signing up..." : "Sign up"}
                </button>
            </form>

            {/* OR separator */}
            <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 before:mr-3 after:flex-1 after:border-t after:border-gray-300 after:ml-3 text-gray-400 text-sm font-semibold">
                OR
            </div>

            {/*<button*/}
            {/*    onClick={handleGoogleSignUp}*/}
            {/*    disabled={isLoading}*/}
            {/*    className={`w-full flex items-center justify-center gap-2 py-3 rounded-md border transition ${*/}
            {/*        isLoading*/}
            {/*            ? "bg-purple-600 border-purple-600 cursor-not-allowed text-white"*/}
            {/*            : "bg-white border-purple-600 hover:bg-purple-50 text-purple-700"*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">*/}
            {/*        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>*/}
            {/*        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>*/}
            {/*        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>*/}
            {/*        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>*/}
            {/*    </svg>*/}
            {/*    Continue with Google*/}
            {/*</button>*/}

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-700">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#9407F2] hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
