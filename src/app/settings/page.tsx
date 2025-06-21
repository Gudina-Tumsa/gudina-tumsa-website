"use client"
import React, { useState } from 'react';
import { PersonalDetailsForm } from '../components/settings/PersonalDetailsForm';
import { PasswordSection } from '../components/settings/PasswordSection';
import { User, Lock } from 'lucide-react';
import SidebarLayout from "@/app/components/sidebar-layout";

const Settings = () => {
    const [activeTab, setActiveTab] = useState<'account' | 'preferences'>('account');

    return (
        <SidebarLayout>
            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="e">

                        <div className="px-8 py-6 border-b border-gray-200">
                            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>


                            <div className="mt-6 flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('account')}
                                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'account'
                                            ? 'text-blue-600 border-blue-600'
                                            : 'text-gray-500 border-transparent hover:text-gray-700'
                                    }`}
                                >
                                    Account
                                </button>
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'preferences'
                                            ? 'text-blue-600 border-blue-600'
                                            : 'text-gray-500 border-transparent hover:text-gray-700'
                                    }`}
                                >
                                    Preferences
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-8 py-6">
                            {activeTab === 'account' && (
                                <>

                                    <div className=" border rounded-2xl shadow-sm p-6 ">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-100">
                                                <User className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <h2 className="text-lg font-medium text-gray-900">Personal details</h2>
                                            <div className="flex-1" />
                                            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                                                Save changes
                                            </button>
                                        </div>
                                        <PersonalDetailsForm />
                                    </div>



                                    <div className="bg-white border rounded-2xl shadow-sm p-6 mt-[2%]">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded">
                                                <Lock className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <h2 className="text-lg font-medium text-gray-900">Password</h2>
                                            <div className="flex-1" />
                                            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                                                Save changes
                                            </button>
                                        </div>
                                        <PasswordSection />
                                    </div>

                                </>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Preferences settings coming soon...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>

    );
};

export default Settings;