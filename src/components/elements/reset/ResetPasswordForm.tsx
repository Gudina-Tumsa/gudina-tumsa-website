/* eslint-disable  */
// @ts-nocheck

"use client";
import React, {useState, useRef, useEffect} from "react";
import {resetUser, updateUser} from "@/lib/api/user";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const createOtpEmail = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: email,
                addressType: 'EMAIL',
            }),
        });

        if (response.status === 201) {
            return true;
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to create OTP');
        }
    } catch (error: any) {
        throw new Error(error.message || 'Network or server error');
    }
};
const changePasswordWithOtp = async (address : string, otpCode : string , newPassowrd : string ) =>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/reset/${address}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: address,
                password : newPassowrd,
                otpCode: otpCode,
            }),
        });

        if (response.status === 200) {
            return true;
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to verify OTP');
        }
    } catch (error: any) {
        throw new Error(error.message || 'Network or server error');
    }
}
const verifyOtp = async (address:string, otpCode :string) : Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/otp/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address,
                password : otpCode,
            }),
        });

        if (response.status === 200) {
            return true;
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to verify OTP');
        }
    } catch (error: any) {
        throw new Error(error.message || 'Network or server error');
    }
};

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
        if (!/^\d*$/.test(val)) return;

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
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(180);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (step !== 2) return;
        setTimer(180);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [step]);

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = async () => {
        setResending(true);
        try {
            await createOtpEmail(email);
            setTimer(180);
            toast.success('OTP resent successfully!');
        } catch (err: any) {
            toast.error(err.message || 'Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createOtpEmail(email);
            setStep(2);
            toast.success('OTP sent to your email!');
        } catch (err: any) {
            toast.error(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error('Please enter the 6-digit OTP.');
            return;
        }

        setLoading(true);
        // try {
        //     await verifyOtp(email, otp);
        //     setStep(3);
        //     toast.success('OTP verified successfully!');
        // } catch (err: any) {
        //     toast.error(err.message || 'Failed to verify OTP');
        // } finally {
        //     setLoading(false);
        // }
        setStep(3)
        setLoading(false)
    };

    const changePassword = async (e : React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Password doesnt match');
            return;
        }
        setLoading(true);
        try {
            await changePasswordWithOtp(email, otp , newPassword);
            setStep(3);
            toast.success('Password changed succesfully');

            router.push('/login');
        } catch (err: any) {
            toast.error(err.message || 'Failed to chagne password');
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await resetUser({password: newPassword}, email);
            toast.success('Password reset successfully!');
            // Reset form
            setStep(1);
            setEmail("");
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            toast.error(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Toaster position="top-center" />

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
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-300' : 'bg-gray-400 hover:bg-gray-500'} text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex justify-center items-center`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : 'Send OTP'}
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 text-center text-sm font-medium text-gray-700 block">
                            Enter OTP sent to {email}
                        </label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            length={6}
                        />
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        {timer > 0 ? (
                            <span>Resend available in {timer}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resending}
                                className="text-blue-600 hover:underline disabled:opacity-50"
                            >
                                {resending ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-blue-600 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : 'Resend OTP'}
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-300' : 'bg-gray-400 hover:bg-gray-500'} text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex justify-center items-center`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </>
                        ) : 'Verify OTP'}
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
                        disabled={loading}
                        onClick={changePassword}
                        className={`w-full ${loading ? 'bg-gray-300' : 'bg-gray-400 hover:bg-gray-500'} text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex justify-center items-center`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Resetting...
                            </>
                        ) : 'Reset Password'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ResetPasswordForm;