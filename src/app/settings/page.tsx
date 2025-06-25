"use client"
import React, {useEffect, useState} from 'react';
import { PersonalDetailsForm } from '../../components/elements/settings/PersonalDetailsForm';
import { PasswordSection } from '../../components/elements/settings/PasswordSection';
import { User, Lock } from 'lucide-react';
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import {getSessions, logoutSession} from "@/lib/api/sessions";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {SessionResponse} from "@/types/sessions";

const Sessions = () => {
    const user = useSelector((state: RootState) => state.user);
    const [sessions, setSessions] = useState<SessionResponse[]>([]);
    const currentDeviceId = navigator.userAgent;

    useEffect(() => {
        const fetchSessions = async () => {
            const data = await getSessions(user?.user?._id ?? "");
            setSessions(data.data.sessions); // set all at once
        };

        fetchSessions();
    }, []);
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>

            <div className="border rounded-2xl shadow-sm divide-y">
                {sessions.map((session) =>

                { const isCurrent = session.deviceId === currentDeviceId;
                    return (

                    <div key={session._id} className="p-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">{session.deviceId}</p>
                            <p className="text-sm text-gray-500">Addis Ababa</p>

                        </div>
                        {isCurrent ? (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Current session</span>
                        ) : (
                            <button className="text-sm text-red-600 hover:underline"
                            onClick={()=>{
                                logoutSession(session._id).then((data)=>{console.log(data)}).catch((error)=>{console.log(error)})
                            }}
                            >Log out</button>
                        )}
                    </div>
                )})}
            </div>
        </div>

    )
}

const Preference = () => {
    return (
        <div className="space-y-8">
            {/* Theme Selection */}
            <div className="bg-white border rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Theme</h2>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="theme" value="light" className="form-radio" />
                        <span className="text-gray-700">Light</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="theme" value="dark" className="form-radio" />
                        <span className="text-gray-700">Dark</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="theme" value="system" className="form-radio" />
                        <span className="text-gray-700">System</span>
                    </label>
                </div>
            </div>

            {/* Language Selection */}
            <div className="bg-white border rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Language</h2>
                <select className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="en">English</option>
                    <option value="am">Amharic</option>
                    <option value="om">Oromo</option>

                </select>
            </div>
        </div>
    )
}

const Settings = () => {
    const [activeTab, setActiveTab] = useState<'account' | 'preferences' | 'sessions'>('account');

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
                                <button
                                    onClick={() => setActiveTab('sessions')}
                                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'sessions'
                                            ? 'text-blue-600 border-blue-600'
                                            : 'text-gray-500 border-transparent hover:text-gray-700'
                                    }`}
                                >
                                    sessions
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
                                <Preference/>
                            )}

                            {activeTab === 'sessions' && (

                                    <Sessions/>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>

    );
};

export default Settings;