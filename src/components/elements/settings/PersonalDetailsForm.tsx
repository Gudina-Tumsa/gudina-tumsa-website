import React from 'react';
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
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => onChange('email', value)}
                maxLength={50}
            />

            <FormInput
                label="username"
                value={formData.username}
                onChange={(value) => onChange('username', value)}
                maxLength={30}
            />
        </div>
    );
};
