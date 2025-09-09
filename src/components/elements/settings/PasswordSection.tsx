/* eslint-disable  */
// @ts-nocheck
import React, {useEffect, useState} from 'react';
import { Eye , EyeOff } from 'lucide-react';

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
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const applyTheme = (selectedTheme: string) => {
        const root = window.document.documentElement;

        if (selectedTheme === 'dark') {
            root.classList.add('dark');
        } else if (selectedTheme === 'light') {
            root.classList.remove('dark');
        } else {

            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        const savedLanguage = localStorage.getItem('language') || 'en';
        applyTheme(savedTheme);
    }, []);
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

            <div className="space-y-2 relative">
                <label className="block text-sm font-medium dark:text-white text-gray-100 ">
                    Password
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Enter your new password"
                    className="w-full px-3 py-2 border dark:text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-10"
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 bottom-2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};
