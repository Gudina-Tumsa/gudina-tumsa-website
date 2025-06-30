"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { loginUser } from "@/lib/api/auth";
import { useRouter } from 'next/navigation'; // Updated import
import {Eye, EyeOff, RotateCw} from 'lucide-react'; // For the spinner icon
import { useAppDispatch } from '@/lib/hooks';
import {loginSuccess} from "@/app/store/features/userSlice";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter(); // Using the correct router hook
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await loginUser({ email, password });

            localStorage.setItem('accessToken', response.data.session.token);
            localStorage.setItem('refreshToken', response.data.session.refreshToken);

            dispatch(loginSuccess(response))
            console.log(response)
            router.push('/home');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Log in to GTL</h1>
            </div>

            {errorMsg && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {errorMsg}
                </div>
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
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="relative ">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white block w-full h-full px-3 py-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            tabIndex={isLoading ? -1 : 0}
                            disabled={isLoading}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5 items-center" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
                <div className="flex justify-between items-center mb-1">
                    <div></div>
                    <Link
                        href="/reset"
                        className="text-sm text-blue-600 hover:underline"
                        tabIndex={isLoading ? -1 : 0} // Prevent tab navigation when loading
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="flex items-center">
                    <input
                        id="keepLoggedIn"
                        type="checkbox"
                        checked={keepLoggedIn}
                        onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
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
                        isLoading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'
                    } text-white font-medium py-2 px-4 rounded-md transition-colors duration-200`}
                >
                    {isLoading ? (
                        <>
                            <RotateCw className="h-4 w-4 animate-spin" />
                            Logging in...
                        </>
                    ) : (
                        'Continue'
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-700">
                    Don't have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-blue-600 hover:underline"
                        tabIndex={isLoading ? -1 : 0} // Prevent tab navigation when loading
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;