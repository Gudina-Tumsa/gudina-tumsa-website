import React from 'react';
import Header from '@/components/layout/Header';
import ResetPasswordForm from "@/components/elements/reset/ResetPasswordForm";

const Index = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
                <ResetPasswordForm />
            </div>
        </div>
    );
};

export default Index;