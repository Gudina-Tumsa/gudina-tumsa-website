/* eslint-disable  */
// @ts-nocheck

"use client";
import React, { useEffect, useState } from "react";
import { PersonalDetailsForm } from "../../components/elements/settings/PersonalDetailsForm";
import { PasswordSection } from "../../components/elements/settings/PasswordSection";
import {
    User,
    Loader2,
    Shield,
    SlidersHorizontal,
    Monitor,
    Smartphone,
    Sun,
    Moon,
    Laptop,
    Globe,
    LogOut,
} from "lucide-react";
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

const isMobileDevice = (deviceId: string) =>
    /mobile|android|iphone|ipad/i.test(deviceId ?? "");

const Sessions = () => {
    const user = useSelector((state: RootState) => state.user);
    const [sessions, setSessions] = useState<SessionResponse[]>([]);
    const currentDeviceId = navigator.userAgent;

    useEffect(() => {
        const fetchSessions = async () => {
            if (!user?.user?._id || !user?.session?.token) return;
            try {
                const data = await getSessions(user.user._id, user.session.token);
                setSessions(data.data.sessions);
            } catch (error) {
                console.error("Failed to fetch sessions:", error);
                toast.error("Could not load active sessions.");
            }
        };

        fetchSessions();
    }, [user?.user?._id, user?.session?.token]);

    const handleLogoutSession = async (sessionId: string) => {
        const promise = logoutSession(sessionId, user.session?.token);
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
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                    Active sessions
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    These are the devices currently signed in to your account.
                </p>
            </div>

            {sessions.length === 0 ? (
                <div className="p-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    No active sessions found.
                </div>
            ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {sessions.map((session) => {
                        const isCurrent = session.deviceId === currentDeviceId;
                        const Icon = isMobileDevice(session.deviceId) ? Smartphone : Laptop;
                        return (
                            <div
                                key={session._id}
                                className="flex items-center justify-between gap-4 p-5"
                            >
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                        <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                            {session.deviceId}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Addis Ababa
                                        </p>
                                    </div>
                                </div>
                                {isCurrent ? (
                                    <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                                        This device
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleLogoutSession(session._id)}
                                        className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />
                                        Log out
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const THEME_OPTIONS = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
];

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

    const handleThemeChange = (selectedTheme: string) => {
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
        <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Theme</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Choose how the library looks on this device.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
                        const selected = theme === value;
                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() => handleThemeChange(value)}
                                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors ${
                                    selected
                                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                                        : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700"
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Language</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Set the language used across the library.
                </p>
                <div className="relative mt-5 max-w-xs">
                    <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-8 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="en">English</option>
                        <option value="am">Amharic</option>
                        <option value="om">Oromo</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

const TABS = [
    { key: "account", label: "Account", icon: User },
    { key: "preferences", label: "Preferences", icon: SlidersHorizontal },
    { key: "sessions", label: "Sessions", icon: Shield },
] as const;

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

            await updateUser(updates, user.user._id, user.session?.token);

            if (updates.password) {
                // Changing the password revokes every existing session
                // (including the one we just used) — the old token is dead,
                // so send the user to log in again instead of refreshing.
                setPassword("");
                toast.success("Password changed — please log in again.");
                router.push("/login");
                return;
            }

            try {
                const token = user?.session?.token;
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

    const initials =
        `${formData.firstName?.[0] ?? ""}${formData.lastName?.[0] ?? ""}`.toUpperCase() ||
        (formData.username?.[0] ?? "?").toUpperCase();

    const displayName =
        formData.firstName || formData.lastName
            ? `${formData.firstName} ${formData.lastName}`.trim()
            : formData.username;

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-semibold text-white">
                        {initials}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Settings
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {displayName ? `${displayName} · ` : ""}
                            Manage your account, preferences, and active sessions.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    <nav className="lg:w-52 shrink-0">
                        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
                            {TABS.map(({ key, label, icon: Icon }) => {
                                const selected = activeTab === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                                            selected
                                                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>

                    <div className="min-w-0 flex-1">
                        {activeTab === "account" && (
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                        Personal details
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Update your name, username, and password.
                                    </p>
                                </div>

                                <div className="space-y-8 p-6">
                                    <PersonalDetailsForm formData={formData} onChange={handleFormChange} />
                                    <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                                        <PasswordSection
                                            password={password}
                                            onPasswordChange={handlePasswordChange}
                                            email={user?.user?.email ?? ""}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end rounded-b-2xl border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 sm:w-auto"
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
