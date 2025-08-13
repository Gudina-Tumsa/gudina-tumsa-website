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

    const role = "basic";
    const languagePreference = "en";
    const readingPreferences = "en";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreedToTerms){
            setError("Please fill in all required fields");
            return;
        }
        // Basic validation
        if (!firstName || !lastName || !email || !password || !username) {
            setError("Please fill in all required fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (!agreedToTerms) {
            setError("You must agree to the Terms and Conditions");
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
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
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
                        {/* Fixed country code box */}
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
    +251
  </span>

                        {/* Phone number input */}
                        <input
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]{9}" // Ethiopia numbers have 9 digits after +251
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
                            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                            I agree to the{" "}
                            <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">
                                Terms and Conditions
                            </Link>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                    Sign up
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-700">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
