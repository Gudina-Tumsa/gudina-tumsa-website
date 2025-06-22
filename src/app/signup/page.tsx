import React from 'react';
import Header from '../components/Header';
import SignUpForm from "@/app/components/SignupForm";

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