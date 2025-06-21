import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

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