"use client";
import React, { useState, useRef } from "react";

const OtpInput = ({
                      length = 6,
                      value,
                      onChange,
                  }: {
    length?: number;
    value: string;
    onChange: (otp: string) => void;
}) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return; // Only digits

        let otpArr = value.split("");
        otpArr[idx] = val;

        const newOtp = otpArr.slice(0, length).join("");
        onChange(newOtp);

        if (val.length === 1 && idx < length - 1) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace" && !value[idx] && idx > 0) {
            inputsRef.current[idx - 1]?.focus();
        }
    };

    return (
        <div className="flex space-x-2 justify-center">
            {Array.from({ length }).map((_, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[idx] || ""}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    ref={(el) => (inputsRef.current[idx] = el)}
                    className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ))}
        </div>
    );
};

const ResetPasswordForm = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sending OTP to:", email);
        // TODO: call API to send OTP
        setStep(2);
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("Please enter the 6-digit OTP.");
            return;
        }
        console.log("Verifying OTP:", otp);
        // TODO: call API to verify OTP
        setStep(3);
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        console.log("Resetting password for:", email, newPassword);
        // TODO: call API to reset password
        alert("Password reset successfully!");
        // Optionally reset form or redirect to login page
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reset your password</h1>
            </div>

            {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Send OTP
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <div>
                        <label className="mb-[5%] text-center text-sm font-medium text-gray-700 block ">
                            Enter OTP sent to {email}
                        </label>
                        <OtpInput value={otp} onChange={setOtp} length={6} />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Verify OTP
                    </button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                        <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 block mb-1">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    );
};

export default ResetPasswordForm;
