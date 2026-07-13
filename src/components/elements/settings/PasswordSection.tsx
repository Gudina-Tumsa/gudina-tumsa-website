/* eslint-disable  */
// @ts-nocheck
import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordSectionProps {
    password: string;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
}

export const PasswordSection: React.FC<PasswordSectionProps> = ({
                                                             password,
                                                             onPasswordChange,
                                                         }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New password
            </label>
            <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Leave blank to keep your current password"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2.5 pl-10 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-400 shadow-sm outline-none transition-colors focus:border-blue-500 dark:focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">
                Changing your password will sign you out of every other active session.
            </p>
        </div>
    );
};
