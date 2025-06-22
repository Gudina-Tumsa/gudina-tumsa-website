"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password, keepLoggedIn });
        // Handle login logic here
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Log in to GTL</h1>
            </div>

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
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
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
                </div>
                <div className="flex justify-between items-center mb-1">
                    <div></div>
                    <Link href="/reset" className="text-sm text-blue-600 hover:underline">
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
                    />
                    <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-700 cursor-pointer">
                        Keep me logged in
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                    Continue
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-700">
                    Don’t have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
