import React from 'react';

import SignUpForm from "@/components/elements/signup/SignupForm";
import Header from "@/components/layout/Header";

const Index = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
                <SignUpForm />
            </div>
        </div>
    );
};

export default Index;