import React, {useEffect, useState} from 'react';
import { X } from 'lucide-react';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    maxLength?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
                                                        label,
                                                        value,
                                                        onChange,
                                                        type = 'text',
                                                        maxLength = 50
                                                    }) => {
    const [isFocused, setIsFocused] = useState(false);
    console.log(isFocused)
    const handleClear = () => {
        onChange('');
    };

    const applyTheme = (selectedTheme: string) => {
        const root = window.document.documentElement;

        if (selectedTheme === 'dark') {
            root.classList.add('dark');
        } else if (selectedTheme === 'light') {
            root.classList.remove('dark');
        } else {
            // Apply system preference
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
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    maxLength={maxLength}
                    className="w-full px-3 py-2 border dark:text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 transition-colors"
                />
                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            <div className="flex justify-end">
        <span className="text-xs text-gray-500">
          {value.length}/{maxLength}
        </span>
            </div>
        </div>
    );
};
