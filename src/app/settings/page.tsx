/* eslint-disable  */
// @ts-nocheck

"use client";
import React, { useEffect, useState } from "react";
import { PersonalDetailsForm } from "../../components/elements/settings/PersonalDetailsForm";
import { PasswordSection } from "../../components/elements/settings/PasswordSection";
import { User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { getSessions, logoutSession } from "@/lib/api/sessions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { SessionResponse } from "@/types/sessions";
import { getMe, updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { loginSuccess } from "@/app/store/features/userSlice";

const Sessions = () => {
    const user = useSelector((state: RootState) => state.user);
    const [sessions, setSessions] = useState<SessionResponse[]>([]);
    const currentDeviceId = navigator.userAgent;

    useEffect(() => {
        const fetchSessions = async () => {
            if (!user?.user?._id) return;
            try {
                const data = await getSessions(user.user._id);
                setSessions(data.data.sessions);
            } catch (error) {
                console.error("Failed to fetch sessions:", error);
                toast.error("Could not load active sessions.");
            }
        };

        fetchSessions();
    }, [user?.user?._id]);

    const handleLogoutSession = async (sessionId: string) => {
        const promise = logoutSession(sessionId);
        toast.promise(promise, {
            loading: "Logging out session...",
            success: () => {
                setSessions((prev) => prev.filter((s) => s._id !== sessionId));
                return "Session logged out successfully!";
            },
            error: "Failed to log out session.",
        });
    };

    return (
        <div className="space-y-6 h-full max-h-[70vh] overflow-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Sessions</h2>
            <div className="border rounded-2xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700 overflow-auto">
                {sessions.map((session) => {
                    const isCurrent = session.deviceId === currentDeviceId;
                    return (
                        <div
                            key={session._id}
                            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0"
                        >
                            <div>
                                <p className="font-medium text-gray-800 dark:text-white break-words">{session.deviceId}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Addis Ababa</p>
                            </div>
                            {isCurrent ? (
                                <span className="text-xs px-4 py-1 text-center bg-blue-100 text-blue-700 rounded-full self-start sm:self-auto">
                  Current session
                </span>
                            ) : (
                                <button
                                    className="text-sm text-red-600 hover:underline self-start sm:self-auto"
                                    onClick={() => handleLogoutSession(session._id)}
                                >
                                    Log out
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Preference = () => {
    const [theme, setTheme] = useState("system");
    const [language, setLanguage] = useState("en");

    const applyTheme = (selectedTheme: string) => {
        const root = window.document.documentElement;

        if (selectedTheme === "dark") {
            root.classList.add("dark");
        } else if (selectedTheme === "light") {
            root.classList.remove("dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        const savedLanguage = localStorage.getItem("language") || "en";

        setTheme(savedTheme);
        setLanguage(savedLanguage);
        applyTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => applyTheme("system");

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, [theme]);

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        localStorage.setItem("theme", selectedTheme);
        applyTheme(selectedTheme);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
    };

    return (
        <div className="space-y-8 h-full max-h-[70vh] overflow-auto">
            {/* Theme Selection */}
            <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    {["light", "dark", "system"].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="theme"
                                value={value}
                                checked={theme === value}
                                onChange={handleThemeChange}
                                className="form-radio"
                            />
                            <span className="text-gray-700 dark:text-gray-300 capitalize">{value}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Uncomment to enable Language selection */}
            {/* <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Language</h2>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="block w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="am">Amharic</option>
          <option value="om">Oromo</option>
        </select>
      </div> */}
        </div>
    );
};

const Settings = () => {
    const [activeTab, setActiveTab] = useState<"account" | "preferences" | "sessions">("account");
    const user = useSelector((state: RootState) => state.user);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        firstName: user?.user?.firstName || "",
        lastName: user?.user?.lastName || "",
        email: user?.user?.email || "",
        username: user?.user?.username || "",
    });

    useEffect(() => {
        setFormData({
            firstName: user?.user?.firstName || "",
            lastName: user?.user?.lastName || "",
            email: user?.user?.email || "",
            username: user?.user?.username || "",
        });
    }, [user]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSave = async () => {
        if (!user?.user?._id) {
            toast.error("User not found. Please log in again.");
            return;
        }

        setIsLoading(true);

        try {
            const updates: { [key: string]: string } = {};

            if (formData.firstName !== user.user.firstName) updates.firstName = formData.firstName;
            if (formData.lastName !== user.user.lastName) updates.lastName = formData.lastName;
            if (formData.email !== user.user.email) updates.email = formData.email;
            if (formData.username !== user.user.username) updates.username = formData.username;
            if (password) {
                updates.password = password;
            }

            await updateUser(updates, user.user._id);

            try {
                const token = user?.user?.token;
                let response = await getMe(token);
                localStorage.setItem("accessToken", response.data.session.token);
                localStorage.setItem("refreshToken", response.data.session.refreshToken);
                dispatch(loginSuccess(response));
            } catch (error) {
                console.log("Error refreshing user after update:", error);
            }

            setPassword("");
            toast.success("Settings updated successfully!");
        } catch (error) {
            console.error("Error updating settings:", error);
            toast.error("Failed to update settings. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <SidebarLayout>
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-full">
                <div className="max-w-4xl mx-auto">
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Settings</h1>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
                            <button
                                onClick={() => setActiveTab("account")}
                                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "account"
                                        ? "text-blue-600 border-blue-600"
                                        : "dark:text-white text-gray-500 border-transparent hover:text-gray-700"
                                }`}
                            >
                                Account
                            </button>
                            <button
                                onClick={() => setActiveTab("preferences")}
                                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "preferences"
                                        ? "text-blue-600 border-blue-600"
                                        : "dark:text-white text-gray-500 border-transparent hover:text-gray-700"
                                }`}
                            >
                                Preferences
                            </button>
                            <button
                                onClick={() => setActiveTab("sessions")}
                                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "sessions"
                                        ? "text-blue-600 border-blue-600"
                                        : "dark:text-white text-gray-500 border-transparent hover:text-gray-700"
                                }`}
                            >
                                Sessions
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-0 sm:px-6">
                        {activeTab === "account" && (
                            <div className="border rounded-2xl shadow-sm p-4 sm:p-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-100 dark:bg-gray-700">
                                        <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Personal details</h2>
                                </div>
                                <PersonalDetailsForm formData={formData} onChange={handleFormChange} />
                                <PasswordSection password={password} onPasswordChange={handlePasswordChange} email={user?.user?.email ?? ""} />
                                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                    <div /> {/* Placeholder for additional content */}
                                    <button
                                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                        onClick={handleSave}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save changes"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "preferences" && <Preference />}

                        {activeTab === "sessions" && <Sessions />}
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
};

export default Settings;
