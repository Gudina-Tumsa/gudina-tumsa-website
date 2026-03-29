/* eslint-disable  */
// @ts-nocheck

/* eslint-disable  */
// @ts-nocheck

'use client';

import { useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';

export default function DeleteAccountPage() {
    const [acknowledged, setAcknowledged] = useState(false);

    return (
        <div className="min-h-screen bg-[#1a1a2e] text-white px-6 py-12">
            <div className="max-w-xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Delete Account</h1>
                    <p className="text-gray-300">
                        Permanently delete your account and all associated data.
                    </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <p className="text-gray-300">
                        At <span className="font-semibold text-white">GTF Library</span>, we respect your privacy and give you control over your data.
                    </p>
                    <p className="text-gray-300">
                        You can permanently delete your account and all personal information including your name, email, phone number, username, authentication info, and preferences.
                    </p>
                    <p className="text-gray-300">
                        Some data may be retained for legal or compliance reasons, such as transaction logs, but it will be anonymized and stored for no longer than 90 days.
                    </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <h2 className="text-white font-semibold">How to Request Account Deletion</h2>
                    <ol className="list-decimal list-inside text-gray-300 space-y-1">
                        <li>Open the app and go to your Profile / Settings.</li>
                        <li>Tap "Delete Account" (if available).</li>
                        <li>
                            If unavailable, email <span className="text-[#C084FC]">privacy@gudinatumsa.com</span> with your username and registered email.
                        </li>
                        <li>You will receive a confirmation once your account is deleted.</li>
                    </ol>
                </div>

                <div className="flex items-center space-x-3">
                    <div
                        className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${
                            acknowledged ? 'bg-[#C084FC] border-[#C084FC]' : 'border-gray-500'
                        }`}
                        onClick={() => setAcknowledged(!acknowledged)}
                    >
                        {acknowledged && <IoCheckmark className="text-white text-lg" />}
                    </div>
                    <p className="text-gray-300 text-sm flex-1">
                        I understand that this action is permanent and cannot be undone.
                    </p>
                </div>

                <button
                    className={`w-full py-3 rounded-xl font-semibold ${
                        acknowledged ? 'bg-[#C084FC] text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!acknowledged}
                >
                    Delete My Account
                </button>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-300">
                        If you only want to remove some of your data but keep your account, please contact us at <span className="text-[#C084FC]">privacy@gudinatumsa.com</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
