"use client";

import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { RootState } from "@/app/store/store";
import {
    getUserNotifications,
    markAllNotificationsRead,
    markNotificationsRead,
} from "@/lib/api/notification";
import { NotificationData } from "@/types/notification";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const POLL_INTERVAL_MS = 60_000;

function formatRelativeTime(dateString: string): string {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diffMs / 60_000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

const NotificationBell = () => {
    const userId = useSelector((state: RootState) => state.user?.user?._id);
    const token = useSelector((state: RootState) => state.user?.session?.token);

    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = useCallback(async () => {
        if (!token || !userId) return;
        try {
            const response = await getUserNotifications(token, userId, { limit: 10 });
            setNotifications(response.notifications ?? []);
            setUnreadCount(response.unreadCount ?? 0);
        } catch (err) {
            console.error("Failed to load notifications:", err);
        }
    }, [token, userId]);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, POLL_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    if (!token || !userId) return null;

    const handleOpenChange = (open: boolean) => {
        if (open) fetchNotifications();
    };

    const handleNotificationClick = async (notification: NotificationData) => {
        if (notification.isRead) return;
        setNotifications((prev) =>
            prev.map((n) => (n._id === notification._id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
        try {
            await markNotificationsRead(token, userId, [notification._id]);
        } catch (err) {
            console.error("Failed to mark notification as read:", err);
        }
    };

    const handleMarkAllRead = async () => {
        if (unreadCount === 0 || loading) return;
        setLoading(true);
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
        try {
            await markAllNotificationsRead(token, userId);
        } catch (err) {
            console.error("Failed to mark all notifications as read:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8E1D3] bg-white text-[#1C1B19] hover:bg-[#F5F1E8] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-80 p-0 bg-white dark:bg-gray-700 border border-[#E8E1D3] dark:border-gray-600 shadow-lg"
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E1D3] dark:border-gray-600">
                    <span className="text-sm font-semibold text-[#1C1B19] dark:text-white">Notifications</span>
                    {unreadCount > 0 && (
                        <button
                            type="button"
                            onClick={handleMarkAllRead}
                            className="text-xs font-medium text-[#9407F2] hover:underline disabled:opacity-50"
                            disabled={loading}
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <p className="px-4 py-6 text-center text-sm text-[#8A8374] dark:text-gray-400">
                            No notifications yet.
                        </p>
                    ) : (
                        notifications.map((notification) => (
                            <button
                                key={notification._id}
                                type="button"
                                onClick={() => handleNotificationClick(notification)}
                                className={`flex w-full flex-col items-start gap-1 border-b border-[#E8E1D3] px-4 py-3 text-left last:border-b-0 hover:bg-[#F5F1E8] dark:border-gray-600 dark:hover:bg-gray-600 ${
                                    notification.isRead ? "" : "bg-[#9407F2]/5 dark:bg-[#9407F2]/10"
                                }`}
                            >
                                <div className="flex w-full items-start gap-2">
                                    {!notification.isRead && (
                                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                                    )}
                                    <p className="text-sm text-[#1C1B19] dark:text-white">{notification.message}</p>
                                </div>
                                <span className="text-xs text-[#8A8374] dark:text-gray-400">
                                    {formatRelativeTime(notification.createdAt)}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationBell;
