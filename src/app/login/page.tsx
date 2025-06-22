import React from 'react';

import LoginForm from '../../components/elements/login/LoginForm';
import Header from "@/components/layout/Header";

const Index = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
                <LoginForm />
            </div>
        </div>
    );
};

export default Index;