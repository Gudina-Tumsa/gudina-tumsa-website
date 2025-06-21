import React, { useState } from 'react';
import { FormInput } from './FormInput';

export const PersonalDetailsForm = () => {
    const [formData, setFormData] = useState({
        firstName: 'abenezer',
        lastName: 'seifh',
        email: 'webgoat12@gmail.com'
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="space-y-6">
            <FormInput
                label="First name"
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
                maxLength={30}
            />

            <FormInput
                label="Last name"
                value={formData.lastName}
                onChange={(value) => handleInputChange('lastName', value)}
                maxLength={30}
            />

            <FormInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                maxLength={50}
            />
        </div>
    );
};
