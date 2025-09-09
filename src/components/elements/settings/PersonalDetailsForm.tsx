import React, {useEffect} from 'react';
import { FormInput } from './FormInput';

interface PersonalDetailsFormProps {
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
    };
    onChange: (field: string, value: string) => void;
}

export const PersonalDetailsForm = ({ formData, onChange }: PersonalDetailsFormProps) => {

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
        <div className="space-y-6">
            <FormInput
                label="First name"
                value={formData.firstName}
                onChange={(value) => onChange('firstName', value)}
                maxLength={30}

            />

            <FormInput
                label="Last name"
                value={formData.lastName}
                onChange={(value) => onChange('lastName', value)}
                maxLength={30}

            />

            <FormInput
                label="Username"

                value={formData.username}
                onChange={(value) => onChange('username', value)}
                maxLength={30}

            />
        </div>
    );
};
