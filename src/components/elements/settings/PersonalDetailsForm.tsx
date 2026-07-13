/* eslint-disable  */
// @ts-nocheck

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
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

            <div className="sm:col-span-2">
                <FormInput
                    label="Username"
                    value={formData.username}
                    onChange={(value) => onChange('username', value)}
                    maxLength={30}
                />
            </div>
        </div>
    );
};
