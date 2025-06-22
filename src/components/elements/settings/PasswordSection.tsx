import React from 'react';
import { Info } from 'lucide-react';

export const PasswordSection = () => {
    return (
        <div className="space-y-6">
            {/* Info Message */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                    <p>
                        You dont have a password set because you signed up through a social login (Google or Apple).
                        If youd like to continue logging in using your email{' '}
                        <span className="font-medium">(webgoat12@gmail.com)</span>, please set your password.
                    </p>
                </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Enter your new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </div>
        </div>
    );
};