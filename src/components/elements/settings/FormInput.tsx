/* eslint-disable  */
// @ts-nocheck

import React, { useState } from 'react';
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

    const handleClear = () => {
        onChange('');
    };

    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div
                className={`relative rounded-lg transition-shadow ${
                    isFocused ? 'ring-2 ring-blue-500/30' : ''
                }`}
            >
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    maxLength={maxLength}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2.5 pr-9 text-sm text-gray-900 dark:text-white placeholder-gray-400 shadow-sm outline-none transition-colors focus:border-blue-500 dark:focus:border-blue-500"
                />
                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            <div className="flex justify-end">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                    {value.length}/{maxLength}
                </span>
            </div>
        </div>
    );
};
