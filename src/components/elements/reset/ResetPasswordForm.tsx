"use client";
import React, {useState, useRef, useEffect} from "react";
import {resetUser, updateUser} from "@/lib/api/user";
const createOtpEmail = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:3000/api/otp', {
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


const verifyOtp = async (address:string, otpCode :string) : Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:3000/api/otp/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address,
                password : otpCode,
            }),
        });

        if (response.status === 200) {
            // Assuming 200 means OTP verified successfully
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
    const [timer, setTimer] = useState(180); // 3 minutes = 180 seconds



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
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(180);


    useEffect(() => {
        if (step !== 2) return;

        setTimer(180); // Reset timer when entering step 2

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
            setTimer(180); // Restart countdown on successful resend
        } catch (err) {
            console.error(err);
        } finally {
            setResending(false);
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
      e.preventDefault()

        // Todo call
        createOtpEmail(email).then((data)=>{
            setStep(2);
        }).catch((err)=>{
            console.log(err)
        })


    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (otp.length !== 6) {
            alert("Please enter the 6-digit OTP.");
            return;
        }

        verifyOtp(email , otp).then((data) =>{
            setStep(3);
        }).catch((err)=>{
            alert("Error happened")
        })

    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        resetUser({password : newPassword } , email ).then((data)=>{

        })
        .catch((err : unknown)=>{
            alert("hello there")
        })



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
                        <label className="mb-2 text-center text-sm font-medium text-gray-700 block">
                            Enter OTP sent to {email}
                        </label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle="border border-gray-300 rounded-md w-10 h-10 text-center mx-1"
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
                                {resending ? "Sending..." : "Resend OTP"}
                            </button>
                        )}
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
