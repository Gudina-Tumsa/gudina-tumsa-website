/* eslint-disable  */
// @ts-nocheck
import React from 'react';
import { Info } from 'lucide-react';

interface PasswordSectionProps {
    password: string;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
}

export const PasswordSection: React.FC<PasswordSectionProps> = ({
                                                                    password,
                                                                    onPasswordChange,
                                                                    email
                                                                }) => {
    return (
        <div className="space-y-6">
            {/* Info Message */}
            <div
                className="flex items-start px-4 bg-blue-50 border border-blue-200 rounded-md opacity-0 h-0 overflow-hidden"
            >

                <div className="text-sm text-blue-800">
                    <p>
                        You don't have a password set because you signed up through a social login (Google or Apple).

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
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Enter your new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </div>
        </div>
    );
};
